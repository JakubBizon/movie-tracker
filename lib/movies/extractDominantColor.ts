import { Vibrant } from "node-vibrant/node";

export async function extractDominantColor(imagePath: string): Promise<string> {
  try {
    const imageUrl = `https://image.tmdb.org/t/p/w500${imagePath}`;
    const palette = await Vibrant.from(imageUrl).getPalette();

    const color =
      palette.DarkMuted?.hex ||
      palette.Muted?.hex ||
      palette.DarkVibrant?.hex ||
      palette.Vibrant?.hex ||
      "#000000";

    return color;
  } catch (error) {
    console.error("Error extracting color:", error);
    return "#000000";
  }
}
