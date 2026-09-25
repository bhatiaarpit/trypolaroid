import { Router, type Request, type Response } from "express";
import multer from "multer";
import { prisma } from "../lib/prisma";
import { generateMockPolaroid, getMockTitle } from "../services/ai/generate";
import { type MomentPromptInput, type Passion } from "../services/ai/promptBuilder";
import {
  getMomentOutputUrl,
  getMomentPhotoUrl,
  uploadMomentOutput,
  uploadMomentPhoto,
} from "../services/storage/upload";

const allowedPassions = new Set<Passion>(["film", "bikes", "tech", "music", "fashion"]);
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maximumPhotoBytes = 10 * 1024 * 1024;
const router = Router();
const photoUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maximumPhotoBytes, files: 1, fields: 4, parts: 5 },
});

type ValidatedInput = MomentPromptInput;

function validateInput(body: unknown): { input: ValidatedInput } | { error: string } {
  if (typeof body !== "object" || body === null) return { error: "Form fields are required." };
  const fields = body as Record<string, unknown>;
  const passion = fields.passion;
  const prompt = fields.prompt;
  const preferencesValue = fields.preferences;
  const preferencesTextValue = fields.preferencesText;

  if (typeof passion !== "string" || !allowedPassions.has(passion as Passion)) {
    return { error: "Choose a valid passion." };
  }
  if (typeof prompt !== "string" || prompt.trim().length < 3 || prompt.trim().length > 150) {
    return { error: "Prompt must be between 3 and 150 characters." };
  }

  let preferences: unknown = preferencesValue;
  if (typeof preferences === "string") {
    try {
      preferences = JSON.parse(preferences) as unknown;
    } catch {
      return { error: "Preferences must be a JSON array of strings." };
    }
  }
  if (!Array.isArray(preferences) || preferences.length > 12 || preferences.some((item) => typeof item !== "string")) {
    return { error: "Choose up to 12 valid preferences." };
  }

  const normalizedPreferences = [...new Set((preferences as string[]).map((value) => value.trim()))];
  if (normalizedPreferences.some((value) => value.length === 0 || value.length > 60)) {
    return { error: "Each preference must be between 1 and 60 characters." };
  }

  if (preferencesTextValue !== undefined && typeof preferencesTextValue !== "string") {
    return { error: "Additional preferences must be text." };
  }
  const preferencesText = typeof preferencesTextValue === "string" ? preferencesTextValue.trim() : "";
  if (preferencesText.length > 150) return { error: "Additional preferences must be 150 characters or fewer." };

  return {
    input: {
      passion: passion as Passion,
      preferences: normalizedPreferences,
      preferencesText: preferencesText || null,
      prompt: prompt.trim(),
    },
  };
}

function detectedImageType(buffer: Buffer): string | null {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "image/jpeg";
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return "image/png";
  if (buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  return null;
}

async function processMoment(momentId: string, input: ValidatedInput, photo?: Express.Multer.File): Promise<void> {
  try {
    await prisma.moment.update({ where: { id: momentId }, data: { status: "generating" } });

    if (photo) {
      const photoPath = await uploadMomentPhoto(momentId, photo.buffer, photo.mimetype);
      await prisma.moment.update({ where: { id: momentId }, data: { photoPath } });
    }

    const generated = await generateMockPolaroid(input);
    const output = await uploadMomentOutput(momentId, generated.buffer, generated.contentType);
    await prisma.moment.update({
      where: { id: momentId },
      data: { outputUrl: output.signedUrl, outputPath: output.path, status: "completed" },
    });
  } catch (error) {
    console.error("Moment processing failed", momentId, error instanceof Error ? error.message : "Unknown error");
    try {
      await prisma.moment.update({ where: { id: momentId }, data: { status: "failed" } });
    } catch (updateError) {
      console.error("Unable to mark moment as failed", momentId, updateError instanceof Error ? updateError.message : "Unknown error");
    }
  }
}

router.post("/", photoUpload.single("photo"), async (req: Request, res: Response) => {
  const validation = validateInput(req.body);
  if ("error" in validation) {
    res.status(400).json({ error: validation.error });
    return;
  }

  const photo = req.file;
  if (photo) {
    if (!allowedImageTypes.has(photo.mimetype) || detectedImageType(photo.buffer) !== photo.mimetype) {
      res.status(400).json({ error: "Photo must be a valid JPEG, PNG, or WebP image." });
      return;
    }
    if (photo.size > maximumPhotoBytes) {
      res.status(413).json({ error: "Photo must be 10 MB or smaller." });
      return;
    }
  }

  try {
    const moment = await prisma.moment.create({
      data: {
        passionCategory: validation.input.passion,
        preferences: validation.input.preferences,
        preferencesText: validation.input.preferencesText,
        selfPrompt: validation.input.prompt,
        status: "pending",
      },
      select: { id: true },
    });

    setImmediate(() => {
      void processMoment(moment.id, validation.input, photo);
    });

    res.status(202).json({ momentId: moment.id, status: "pending" });
  } catch (error) {
    console.error("Unable to create moment", error instanceof Error ? error.message : "Unknown error");
    res.status(503).json({ error: "We couldn't start your Polaroid. Please try again." });
  }
});

router.get("/:momentId", async (req: Request, res: Response) => {
  const { momentId } = req.params;
  if (momentId.length > 40 || !/^[a-z0-9]+$/i.test(momentId)) {
    res.status(400).json({ error: "Moment id is invalid." });
    return;
  }

  try {
    const moment = await prisma.moment.findUnique({
      where: { id: momentId },
      select: {
        id: true,
        passionCategory: true,
        selfPrompt: true,
        status: true,
        outputUrl: true,
        outputPath: true,
        photoPath: true,
        preferences: true,
        createdAt: true,
      },
    });

    if (!moment) {
      res.status(404).json({ error: "Moment not found." });
      return;
    }

    let photoUrl: string | null = null;
    let outputUrl = moment.outputUrl;
    if (moment.photoPath) {
      try {
        photoUrl = await getMomentPhotoUrl(moment.photoPath);
      } catch (error) {
        console.error("Unable to sign moment photo URL", moment.id, error instanceof Error ? error.message : "Unknown error");
      }
    }
    if (moment.outputPath) {
      try {
        outputUrl = await getMomentOutputUrl(moment.outputPath);
      } catch (error) {
        console.error("Unable to sign moment output URL", moment.id, error instanceof Error ? error.message : "Unknown error");
      }
    }

    res.setHeader("Cache-Control", "no-store");
    res.json({
      momentId: moment.id,
      status: moment.status,
      outputUrl,
      photoUrl,
      title: moment.status === "completed" ? getMockTitle(moment.passionCategory as Passion, moment.selfPrompt) : null,
      createdAt: moment.createdAt,
    });
  } catch (error) {
    console.error("Unable to read moment status", error instanceof Error ? error.message : "Unknown error");
    res.status(503).json({ error: "We couldn't check your Polaroid yet. Please retry." });
  }
});

export default router;
