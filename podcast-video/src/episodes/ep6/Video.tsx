import React from "react";
import { SceneTiming } from "../../timing";
import { Episode, episodeFrames } from "../Episode";
import timing from "./timing.json";
import { EP6_SCENES } from "./scenes";

// Episode 6 (diupload sebagai episode ke-5): AI & krisis matematika (Lex Fridman Podcast #503).
const TIMING = timing as unknown as Record<string, SceneTiming>;

export const EP6_FRAMES = episodeFrames(TIMING, EP6_SCENES);

export const Episode6: React.FC = () => <Episode ep="ep6" timing={TIMING} scenes={EP6_SCENES} />;
