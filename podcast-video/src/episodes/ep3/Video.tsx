import React from "react";
import { SceneTiming } from "../../timing";
import { Episode, episodeFrames } from "../Episode";
import timing from "./timing.json";
import { EP3_SCENES } from "./scenes";

// Episode 3: Robert Greene — sisi gelap, seduction, dan mastery.
const TIMING = timing as unknown as Record<string, SceneTiming>;

export const EP3_FRAMES = episodeFrames(TIMING, EP3_SCENES);

export const Episode3: React.FC = () => <Episode ep="ep3" timing={TIMING} scenes={EP3_SCENES} />;
