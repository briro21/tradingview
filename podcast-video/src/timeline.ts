import timing from "./timing.json";

export type MainId = "S01" | "S02" | "S03" | "S04" | "S05" | "S06" | "S07";
export type ShortId = "SH01" | "SH02" | "SH03" | "SH04" | "SH05" | "SH06" | "SH07" | "SH08" | "SH09" | "SH10" | "SH11" | "SH12" | "SH13" | "SH14" | "SH15" | "SH16" | "SH17" | "SH18";
export type SceneId = MainId | ShortId;

const IDS: MainId[] = ["S01", "S02", "S03", "S04", "S05", "S06", "S07"];

// Urutan scene = urutan narasi. Durasi = ceil(durasi mp3 * 30), dari timing.json.
export const SCENES = IDS.map((id) => ({
  id,
  audio: `${id}.mp3`,
  frames: (timing as Record<string, { frames: number }>)[id].frames,
}));

export const TOTAL_FRAMES = SCENES.reduce((a, s) => a + s.frames, 0);
