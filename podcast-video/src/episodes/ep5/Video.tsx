import React from "react";
import { SceneTiming } from "../../timing";
import { Episode, episodeFrames } from "../Episode";
import timing from "./timing.json";
import { EP5_SCENES } from "./scenes";

// Episode 5: Joscha Bach (Lex Fridman Podcast #101) tentang realitas, AI, roh dan kebahagiaan.
const TIMING = timing as unknown as Record<string, SceneTiming>;

export const EP5_FRAMES = episodeFrames(TIMING, EP5_SCENES);

export const Episode5: React.FC = () => <Episode ep="ep5" timing={TIMING} scenes={EP5_SCENES} />;
