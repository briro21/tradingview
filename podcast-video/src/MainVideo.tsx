import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { MainId, SCENES } from "./timeline";
import { Beat, BoardTrack } from "./board/Board";
import { Paper } from "./board/Paper";
import { Captions } from "./components/Captions";
import { S01 } from "./scenes/S01";
import { S02 } from "./scenes/S02";
import { S03 } from "./scenes/S03";
import { S04 } from "./scenes/S04";
import { S05 } from "./scenes/S05";
import { S06 } from "./scenes/S06";
import { S07 } from "./scenes/S07";

const BEATS: Record<MainId, Beat[]> = { S01, S02, S03, S04, S05, S06, S07 };

export const MainVideo: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill>
      <Paper />
      {SCENES.map((scene) => {
        const start = from;
        from += scene.frames;
        return (
          <Sequence key={scene.id} name={scene.id} from={start} durationInFrames={scene.frames}>
            <Audio src={staticFile(scene.audio)} />
            <BoardTrack scene={scene.id} beats={BEATS[scene.id]} />
            <Captions scene={scene.id} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
