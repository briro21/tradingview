import React from "react";
import { Composition, Still } from "remotion";
import { MainVideo } from "./MainVideo";
import { FPS } from "./theme";
import { TOTAL_FRAMES } from "./timeline";
import { ShortsVideo } from "./ShortsVideo";
import { ThumbA, ThumbB, ThumbC } from "./Thumbnails";
import { EP2_FRAMES, Episode2 } from "./episodes/ep2/Video";
import { ThumbD, ThumbE, ThumbF } from "./episodes/ep2/Thumbnails";
import { EP3_FRAMES, Episode3 } from "./episodes/ep3/Video";
import { TIMING } from "./timing";

export const Root: React.FC = () => (
  <>
    <Composition
      id="MainVideo"
      component={MainVideo}
      fps={FPS}
      width={1920}
      height={1080}
      durationInFrames={TOTAL_FRAMES}
    />
    <Composition
      id="Shorts"
      component={ShortsVideo}
      defaultProps={{ id: "SH01" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH01.frames}
    />
    <Composition
      id="Shorts2"
      component={ShortsVideo}
      defaultProps={{ id: "SH02" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH02.frames}
    />
    <Composition id="Episode2" component={Episode2} fps={FPS} width={1920} height={1080} durationInFrames={EP2_FRAMES} />
    <Composition id="Episode3" component={Episode3} fps={FPS} width={1920} height={1080} durationInFrames={EP3_FRAMES} />
    <Still id="ThumbA" component={ThumbA} width={1280} height={720} />
    <Still id="ThumbB" component={ThumbB} width={1280} height={720} />
    <Still id="ThumbC" component={ThumbC} width={1280} height={720} />
    <Still id="Ep2ThumbA" component={ThumbD} width={1280} height={720} />
    <Still id="Ep2ThumbB" component={ThumbE} width={1280} height={720} />
    <Still id="Ep2ThumbC" component={ThumbF} width={1280} height={720} />
  </>
);
