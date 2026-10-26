import { FPS } from "./theme";

export type SceneId = "S01" | "S02" | "S03" | "S04" | "S05" | "S06" | "S07";

// Urutan scene = urutan narasi. `frames` = hasil scripts/generate_voiceover.py
// (ceil(durasi mp3 * 30)); calculateMetadata di Root.tsx tetap membaca ulang durasi asli.
export const SCENES: { id: SceneId; audio: string; frames: number }[] = [
  { id: "S01", audio: "S01.mp3", frames: 1587 }, // Hook
  { id: "S02", audio: "S02.mp3", frames: 3539 }, // Insight 1
  { id: "S03", audio: "S03.mp3", frames: 528 }, // Transition 1
  { id: "S04", audio: "S04.mp3", frames: 3232 }, // Insight 2
  { id: "S05", audio: "S05.mp3", frames: 569 }, // Transition 2
  { id: "S06", audio: "S06.mp3", frames: 2872 }, // Insight 3
  { id: "S07", audio: "S07.mp3", frames: 790 }, // Outro
];

export type MainVideoProps = { durations: number[] };

export const defaultDurations = SCENES.map((s) => s.frames);
