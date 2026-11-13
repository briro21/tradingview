import React from "react";
import { SceneTiming } from "../../timing";
import { Episode, episodeFrames } from "../Episode";
import timing from "./timing.json";
import { EP8_SCENES } from "./scenes";

// Episode 8: Ed Zitron di The Diary of a CEO (AI bubble).
const TIMING = timing as unknown as Record<string, SceneTiming>;

export const EP8_FRAMES = episodeFrames(TIMING, EP8_SCENES);

export const Episode8: React.FC = () => <Episode ep="ep8" timing={TIMING} scenes={EP8_SCENES} />;
