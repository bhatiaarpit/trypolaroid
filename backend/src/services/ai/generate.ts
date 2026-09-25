import type { MomentPromptInput, Passion } from "./promptBuilder";
import { buildImagePrompt } from "./promptBuilder";

const titleOptions: Record<Passion, string[]> = {
  film: ["THE MIDNIGHT DIRECTOR", "THE LAST FRAME", "GOLDEN HOUR ONLY"],
  bikes: ["THE LONG WAY HOME", "ASPHALT DREAMER", "THE OPEN ROAD"],
  tech: ["THE MIDNIGHT BUILDER", "SHIP IT ANYWAY", "THE OBSESSIVE ONE"],
  music: ["THE NEXT TRACK", "ON REPEAT", "THE ONE WHO KNOWS"],
  fashion: ["THE STORYTELLER", "DRESSED ON PURPOSE", "QUIET STATEMENT"],
};

const palettes: Record<Passion, [string, string, string]> = {
  film: ["#bd744c", "#f3e2d2", "#382922"],
  bikes: ["#cf6d4e", "#f6dfd0", "#302522"],
  tech: ["#528d83", "#dcece6", "#18332f"],
  music: ["#8069a6", "#e9e2f0", "#292338"],
  fashion: ["#c4778d", "#f2e0e4", "#38242b"],
};

type GenerationInput = MomentPromptInput & { photoUrl: string | null };
type GeneratedPolaroid = {
  title: string;
  buffer: Buffer;
  contentType: string;
  provider: "mock" | "replicate";
};
type ReplicatePrediction = {
  id?: string;
  status: string;
  error?: string | null;
  output?: unknown;
  urls?: { get?: string };
};

const maximumOutputBytes = 25 * 1024 * 1024;

function selectTitle(passion: Passion, prompt: string): string {
  const hash = [...`${passion}:${prompt}`].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return titleOptions[passion][hash % titleOptions[passion].length];
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    };
    return entities[character];
  });
}

function createMockSvg(input: GenerationInput, title: string): string {
  const [accent, paper, ink] = palettes[input.passion];
  const reference = input.preferences[0] ?? input.preferencesText ?? input.passion;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900"><defs><linearGradient id="paper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${paper}"/><stop offset="1" stop-color="${accent}"/></linearGradient><radialGradient id="light"><stop stop-color="#fff" stop-opacity=".72"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .11"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter></defs><rect width="900" height="900" fill="url(#paper)"/><circle cx="190" cy="150" r="330" fill="url(#light)"/><path d="M0 650 Q220 480 400 625 T900 500 V900 H0Z" fill="${ink}" opacity=".34"/><path d="M0 730 Q230 570 460 700 T900 590 V900 H0Z" fill="${ink}" opacity=".42"/><circle cx="680" cy="260" r="112" fill="#fbf1e3" opacity=".48"/><g fill="${ink}" opacity=".72"><circle cx="185" cy="290" r="8"/><circle cx="245" cy="245" r="4"/><circle cx="710" cy="410" r="7"/><circle cx="628" cy="493" r="4"/></g><rect width="900" height="900" filter="url(#grain)" opacity=".8"/><rect x="30" y="30" width="840" height="840" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2"/><text x="64" y="744" fill="#fffdf8" font-family="Georgia,serif" font-size="36" letter-spacing="5">${escapeXml(title)}</text><text x="66" y="798" fill="#fffdf8" font-family="Arial,sans-serif" font-size="19" letter-spacing="6" opacity=".82">${escapeXml(reference.toUpperCase())} · POLAROID</text></svg>`;
}

async function generateMockPolaroid(input: GenerationInput): Promise<GeneratedPolaroid> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return {
    title: selectTitle(input.passion, input.prompt),
    buffer: Buffer.from(createMockSvg(input, selectTitle(input.passion, input.prompt)), "utf8"),
    contentType: "image/svg+xml",
    provider: "mock",
  };
}

function validateReplicateModel(value: string): string {
  if (!/^[a-z0-9-]+\/[a-z0-9-]+$/i.test(value)) {
    throw new Error("Replicate model must be written as owner/model.");
  }
  return value;
}

function extractOutputUrl(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = extractOutputUrl(item);
      if (found) return found;
    }
  } else if (typeof value === "object" && value !== null) {
    for (const nested of Object.values(value)) {
      const found = extractOutputUrl(nested);
      if (found) return found;
    }
  }
  return null;
}

async function fetchReplicateJson(url: string, token: string, init?: RequestInit): Promise<ReplicatePrediction> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
    signal: AbortSignal.timeout(60_000),
  });
  const body = await response.json().catch(() => ({})) as ReplicatePrediction & { detail?: string };
  if (!response.ok) {
    throw new Error(`Replicate request failed (${response.status}): ${body.detail ?? "provider error"}`);
  }
  return body;
}

async function generateWithReplicate(input: GenerationInput): Promise<GeneratedPolaroid> {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) throw new Error("REPLICATE_API_TOKEN is required when IMAGE_GENERATION_PROVIDER=replicate.");

  const model = validateReplicateModel(
    input.photoUrl
      ? process.env.REPLICATE_EDIT_MODEL ?? "black-forest-labs/flux-kontext-pro"
      : process.env.REPLICATE_TEXT_MODEL ?? "black-forest-labs/flux-schnell",
  );
  const prompt = buildImagePrompt(input, Boolean(input.photoUrl));
  const modelInput: Record<string, string> = { prompt };
  if (input.photoUrl) modelInput.input_image = input.photoUrl;
  else modelInput.aspect_ratio = "1:1";

  let prediction = await fetchReplicateJson(`https://api.replicate.com/v1/models/${model}/predictions`, token, {
    method: "POST",
    headers: { "Content-Type": "application/json", Prefer: "wait=5", "Cancel-After": "5m" },
    body: JSON.stringify({ input: modelInput }),
  });

  for (let attempt = 0; attempt < 180; attempt += 1) {
    if (prediction.status === "succeeded") break;
    if (prediction.status === "failed" || prediction.status === "canceled") {
      throw new Error(`Replicate generation ${prediction.status}: ${prediction.error ?? "no provider detail"}`);
    }

    const predictionId = prediction.id;
    if (!predictionId) throw new Error("Replicate did not return a prediction ID.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    prediction = await fetchReplicateJson(`https://api.replicate.com/v1/predictions/${encodeURIComponent(predictionId)}`, token);
  }

  if (prediction.status !== "succeeded") throw new Error("Replicate generation timed out.");
  const outputUrl = extractOutputUrl(prediction.output);
  if (!outputUrl) throw new Error("Replicate completed without an image URL.");

  const parsedOutputUrl = new URL(outputUrl);
  if (parsedOutputUrl.protocol !== "https:" || !parsedOutputUrl.hostname.endsWith("replicate.delivery")) {
    throw new Error("Replicate returned an unexpected output URL.");
  }

  const imageResponse = await fetch(parsedOutputUrl, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(60_000),
  });
  if (!imageResponse.ok) throw new Error(`Unable to download Replicate output (${imageResponse.status}).`);

  const contentType = imageResponse.headers.get("content-type")?.split(";")[0] ?? "";
  if (!["image/png", "image/jpeg", "image/webp"].includes(contentType)) {
    throw new Error(`Replicate returned an unsupported image type (${contentType || "unknown"}).`);
  }
  const buffer = Buffer.from(await imageResponse.arrayBuffer());
  if (buffer.length === 0 || buffer.length > maximumOutputBytes) {
    throw new Error("Replicate output must be between 1 byte and 25 MB.");
  }

  return {
    title: selectTitle(input.passion, input.prompt),
    buffer,
    contentType,
    provider: "replicate",
  };
}

export async function generatePolaroid(input: GenerationInput): Promise<GeneratedPolaroid> {
  const provider = process.env.IMAGE_GENERATION_PROVIDER ?? "mock";
  if (provider === "mock") return generateMockPolaroid(input);
  if (provider === "replicate") return generateWithReplicate(input);
  throw new Error(`Unsupported image generation provider: ${provider}`);
}

export function getMockTitle(passion: Passion, prompt: string): string {
  return selectTitle(passion, prompt);
}
