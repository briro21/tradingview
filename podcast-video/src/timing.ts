import timing from "./timing.json";
import { SceneId } from "./timeline";

// Dibuat oleh scripts/generate_voiceover.py: timing tiap kata & baris subtitle.
export type Word = [text: string, start: number, end: number];
export type Cue = [start: number, end: number, text: string];
export type SceneTiming = { frames: number; words: Word[]; cues: Cue[] };

export const TIMING = timing as unknown as Record<SceneId, SceneTiming>;

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// Indeks kata pertama dari `phrase` di narasi, mulai dari `fromIdx`.
// Dibandingkan sebagai teks gabungan karena TTS kadang menyatukan kata ("By 2030,").
export const findPhrase = (words: Word[], phrase: string, fromIdx = 0): number => {
  const target = norm(phrase);
  for (let i = fromIdx; i < words.length; i++) {
    let joined = "";
    for (let j = i; j < words.length && joined.length < target.length; j++) joined += norm(words[j][0]);
    if (joined === target) return i;
  }
  return -1;
};
