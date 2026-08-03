import { Vibrant } from "node-vibrant/node";

const FALLBACK_COLOR = "#8B8B8B";

export async function extractDominantColor(imagePath: string): Promise<string> {
  try {
    const imageUrl = `https://image.tmdb.org/t/p/w500${imagePath}`;
    if (!imagePath) {
      return FALLBACK_COLOR;
    }
    const palette = await Vibrant.from(imageUrl).getPalette();

    const color =
      palette.DarkMuted?.hex ||
      palette.Muted?.hex ||
      palette.DarkVibrant?.hex ||
      palette.Vibrant?.hex ||
      FALLBACK_COLOR;

    return color;
  } catch (error) {
    console.error("Error extracting color:", error);
    return FALLBACK_COLOR;
  }
}
