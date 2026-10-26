import { useVideoConfig } from "remotion";

// Mengubah posisi relatif (0..1) dalam scene menjadi frame, supaya
// ketukan animasi tetap proporsional berapa pun panjang file audionya.
export const useBeat = () => {
  const { durationInFrames } = useVideoConfig();
  return (fraction: number) => Math.round(durationInFrames * fraction);
};
