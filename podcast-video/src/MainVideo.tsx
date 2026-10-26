import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { theme } from "./theme";
import { MainVideoProps, SceneId, SCENES } from "./timeline";
import { S01 } from "./scenes/S01";
import { S02 } from "./scenes/S02";
import { S03 } from "./scenes/S03";
import { S04 } from "./scenes/S04";
import { S05 } from "./scenes/S05";
import { S06 } from "./scenes/S06";
import { S07 } from "./scenes/S07";

const VISUALS: Record<SceneId, React.FC> = { S01, S02, S03, S04, S05, S06, S07 };

export const MainVideo: React.FC<MainVideoProps> = ({ durations }) => {
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg, fontFamily: theme.font }}>
      {SCENES.map((scene, i) => {
        const Visual = VISUALS[scene.id];
        const durationInFrames = durations[i];
        const start = from;
        from += durationInFrames;
        return (
          <Sequence key={scene.id} name={scene.id} from={start} durationInFrames={durationInFrames}>
            <Audio src={staticFile(scene.audio)} />
            <Visual />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
