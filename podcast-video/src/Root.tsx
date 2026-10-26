import React from "react";
import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { FPS } from "./theme";
import { TOTAL_FRAMES } from "./timeline";

export const Root: React.FC = () => (
  <Composition
    id="MainVideo"
    component={MainVideo}
    fps={FPS}
    width={1920}
    height={1080}
    durationInFrames={TOTAL_FRAMES}
  />
);
