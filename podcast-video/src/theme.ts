import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export const FPS = 30;

export const theme = {
  bg: "#121212",
  white: "#FFFFFF",
  text: "#E2E8F0",
  blue: "#3B82F6",
  cyan: "#00FFFF",
  font: fontFamily,
} as const;
