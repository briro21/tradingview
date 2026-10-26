import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { theme } from "./theme";
import { SceneId, SCENES } from "./timeline";
import { Background } from "./components/Background";
import { Beat, BeatTrack } from "./components/Beats";
import { Captions } from "./components/Captions";
import { ProgressBar } from "./components/ProgressBar";
import { SceneTransition } from "./components/SceneTransition";
import { AudioWaveform } from "./components/AudioWaveform";
import { S01 } from "./scenes/S01";
import { S02 } from "./scenes/S02";
import { S03 } from "./scenes/S03";
import { S04 } from "./scenes/S04";
import { S05 } from "./scenes/S05";
import { S06 } from "./scenes/S06";
import { S07 } from "./scenes/S07";

const BEATS: Record<SceneId, Beat[]> = { S01, S02, S03, S04, S05, S06, S07 };

export const MainVideo: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg, fontFamily: theme.font }}>
      <Background />
      {SCENES.map((scene) => {
        const start = from;
        from += scene.frames;
        return (
          <Sequence key={scene.id} name={scene.id} from={start} durationInFrames={scene.frames}>
            <Audio src={staticFile(scene.audio)} />
            <BeatTrack scene={scene.id} beats={BEATS[scene.id]} />
            <div style={{ position: "absolute", top: 46, right: 70 }}>
              <AudioWaveform src={scene.audio} bars={24} height={50} barWidth={5} gap={4} />
            </div>
            <Captions scene={scene.id} />
            <SceneTransition />
          </Sequence>
        );
      })}
      <ProgressBar />
    </AbsoluteFill>
  );
};
