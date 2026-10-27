import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Beat, BoardTrack } from "../board/Board";
import { Paper } from "../board/Paper";
import { Captions } from "../components/Captions";
import { SceneTiming } from "../timing";

// Episode generik: audio di public/<ep>/S0X.mp3, timing dari generate_voiceover.py --episode <ep>.
export const episodeFrames = (timing: Record<string, SceneTiming>, scenes: Record<string, Beat[]>) =>
  Object.keys(scenes).reduce((a, id) => a + timing[id].frames, 0);

export const Episode: React.FC<{ ep: string; timing: Record<string, SceneTiming>; scenes: Record<string, Beat[]> }> = ({ ep, timing, scenes }) => {
  let from = 0;
  return (
    <AbsoluteFill>
      <Paper />
      {Object.keys(scenes).map((id) => {
        const start = from;
        from += timing[id].frames;
        return (
          <Sequence key={id} name={`${ep} ${id}`} from={start} durationInFrames={timing[id].frames}>
            <Audio src={staticFile(`${ep}/${id}.mp3`)} />
            <BoardTrack scene={`${ep}-${id}`} timing={timing[id]} beats={scenes[id]} />
            <Captions timing={timing[id]} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
