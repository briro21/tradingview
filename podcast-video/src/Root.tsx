import React from "react";
import { CalculateMetadataFunction, Composition, staticFile } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { MainVideo } from "./MainVideo";
import { FPS } from "./theme";
import { defaultDurations, MainVideoProps, SCENES } from "./timeline";

// Membaca durasi setiap mp3 di public/ supaya durationInFrames tiap
// <Sequence> presisi tanpa perlu mengisi angka frame secara manual.
const calculateMetadata: CalculateMetadataFunction<MainVideoProps> = async () => {
  const durations = await Promise.all(
    SCENES.map(async (s) =>
      Math.ceil((await getAudioDurationInSeconds(staticFile(s.audio))) * FPS)
    )
  );
  return {
    durationInFrames: durations.reduce((a, b) => a + b, 0),
    props: { durations },
  };
};

export const Root: React.FC = () => (
  <Composition
    id="MainVideo"
    component={MainVideo}
    fps={FPS}
    width={1920}
    height={1080}
    durationInFrames={defaultDurations.reduce((a, b) => a + b, 0)}
    defaultProps={{ durations: defaultDurations }}
    calculateMetadata={calculateMetadata}
  />
);
