import timing from "./timing.json";

export type MainId = "S01" | "S02" | "S03" | "S04" | "S05" | "S06" | "S07";
export type SceneId = MainId | "SH01" | "SH02";

const IDS: MainId[] = ["S01", "S02", "S03", "S04", "S05", "S06", "S07"];

// Urutan scene = urutan narasi. Durasi = ceil(durasi mp3 * 30), dari timing.json.
export const SCENES = IDS.map((id) => ({
  id,
  audio: `${id}.mp3`,
  frames: (timing as Record<string, { frames: number }>)[id].frames,
}));

export const TOTAL_FRAMES = SCENES.reduce((a, s) => a + s.frames, 0);
