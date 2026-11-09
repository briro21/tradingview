import React from "react";
import { SceneTiming } from "../../timing";
import { Episode, episodeFrames } from "../Episode";
import timing from "./timing.json";
import { EP7_SCENES } from "./scenes";

// Episode 7 (diupload sebagai episode ke-6): Prof. Robert Pape di The Diary of a CEO.
const TIMING = timing as unknown as Record<string, SceneTiming>;

export const EP7_FRAMES = episodeFrames(TIMING, EP7_SCENES);

export const Episode7: React.FC = () => <Episode ep="ep7" timing={TIMING} scenes={EP7_SCENES} />;
