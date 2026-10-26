import { FPS } from "./theme";

export type SceneId = "S01" | "S02" | "S03" | "S04" | "S05" | "S06" | "S07";

// Urutan scene = urutan narasi. `frames` adalah fallback; saat render,
// calculateMetadata di Root.tsx mengganti nilainya dengan durasi asli mp3.
export const SCENES: { id: SceneId; audio: string; frames: number }[] = [
  { id: "S01", audio: "S01.mp3", frames: 60 * FPS }, // Hook
  { id: "S02", audio: "S02.mp3", frames: 150 * FPS }, // Insight 1
  { id: "S03", audio: "S03.mp3", frames: 20 * FPS }, // Transition 1
  { id: "S04", audio: "S04.mp3", frames: 120 * FPS }, // Insight 2
  { id: "S05", audio: "S05.mp3", frames: 20 * FPS }, // Transition 2
  { id: "S06", audio: "S06.mp3", frames: 110 * FPS }, // Insight 3
  { id: "S07", audio: "S07.mp3", frames: 30 * FPS }, // Outro
];

export type MainVideoProps = { durations: number[] };

export const defaultDurations = SCENES.map((s) => s.frames);
