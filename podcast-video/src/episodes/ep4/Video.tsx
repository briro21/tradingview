import React from "react";
import { SceneTiming } from "../../timing";
import { Episode, episodeFrames } from "../Episode";
import timing from "./timing.json";
import { EP4_SCENES } from "./scenes";

// Episode 4: restorasi mansion terbengkalai dan sayap rahasianya.
const TIMING = timing as unknown as Record<string, SceneTiming>;

export const EP4_FRAMES = episodeFrames(TIMING, EP4_SCENES);

export const Episode4: React.FC = () => <Episode ep="ep4" timing={TIMING} scenes={EP4_SCENES} />;
