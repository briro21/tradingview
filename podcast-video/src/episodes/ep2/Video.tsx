import React from "react";
import { SceneTiming } from "../../timing";
import { Episode, episodeFrames } from "../Episode";
import timing from "./timing.json";
import { EP2_SCENES } from "./scenes";

// Episode 2: whistleblower OpenAI, "AI 2027", dan Plan A.
const TIMING = timing as unknown as Record<string, SceneTiming>;

export const EP2_FRAMES = episodeFrames(TIMING, EP2_SCENES);

export const Episode2: React.FC = () => <Episode ep="ep2" timing={TIMING} scenes={EP2_SCENES} />;
