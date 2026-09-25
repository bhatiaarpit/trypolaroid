export type Passion = "film" | "bikes" | "tech" | "music" | "fashion";

export type MomentPromptInput = {
  passion: Passion;
  preferences: string[];
  preferencesText: string | null;
  prompt: string;
};

export function buildImagePrompt(input: MomentPromptInput, hasPhoto: boolean): string {
  const details = [...input.preferences, input.preferencesText]
    .filter((value): value is string => Boolean(value))
    .join(", ");

  return [
    "Create one square, art-directed Polaroid photograph as a personal keepsake.",
    `PASSION\n${input.passion}`,
    `PREFERENCES\n${details || "Choose specific visual details that belong to this world."}`,
    `PERSONAL DESCRIPTION\n${input.prompt}`,
    [
      "VISUAL DIRECTION",
      "Analog 35mm photography, editorial composition, tactile natural film grain, warm direct flash, imperfect framing, honest human expression, rich but believable color, intimate documentary feeling.",
    ].join("\n"),
    hasPhoto
      ? [
          "IDENTITY PRESERVATION",
          "Treat the supplied photo as the source image and preserve the exact person, recognizable face, facial structure, skin tone, age, hair, and body proportions. Do not replace, recreate, or add another person. Edit the world, lighting, styling, and photographic treatment around the same person.",
        ].join("\n")
      : "Create an evocative scene for this world without depicting a specific real person.",
    "Do not add legible text, logos, frames, or watermarks inside the generated photograph.",
  ].join("\n\n");
}
