import { loadFont as loadHand } from "@remotion/google-fonts/PatrickHand";
import { loadFont as loadMarker } from "@remotion/google-fonts/PermanentMarker";

const hand = loadHand().fontFamily;
const marker = loadMarker().fontFamily;

export const FPS = 30;

// Gaya whiteboard ala After Skool: kertas putih + spidol warna-warni.
export const theme = {
  paper: "#FBFAF6",
  ink: "#1C1C1C",
  red: "#E53935",
  blue: "#1E88E5",
  green: "#43A047",
  orange: "#FB8C00",
  yellow: "#FDD835",
  purple: "#8E24AA",
  pink: "#EC407A",
  teal: "#00ACC1",
  gray: "#9E9E9E",
  skin: "#F6C9A0",
  hand,
  marker,
} as const;
