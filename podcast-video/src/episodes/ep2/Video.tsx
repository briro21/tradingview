import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { BoardTrack } from "../../board/Board";
import { Paper } from "../../board/Paper";
import { Captions } from "../../components/Captions";
import { SceneTiming } from "../../timing";
import timing from "./timing.json";
import { EP2_SCENES } from "./scenes";

// Episode 2: whistleblower OpenAI, "AI 2027", dan Plan A.
const TIMING = timing as unknown as Record<string, SceneTiming>;
const IDS = Object.keys(EP2_SCENES);

export const EP2_FRAMES = IDS.reduce((a, id) => a + TIMING[id].frames, 0);

export const Episode2: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill>
      <Paper />
      {IDS.map((id) => {
        const start = from;
        from += TIMING[id].frames;
        return (
          <Sequence key={id} name={`EP2 ${id}`} from={start} durationInFrames={TIMING[id].frames}>
            <Audio src={staticFile(`ep2/${id}.mp3`)} />
            <BoardTrack scene={`ep2-${id}`} timing={TIMING[id]} beats={EP2_SCENES[id]} />
            <Captions timing={TIMING[id]} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
