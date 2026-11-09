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
import { EP4_FRAMES, Episode4 } from "./episodes/ep4/Video";
import { ThumbJ, ThumbK, ThumbL } from "./episodes/ep4/Thumbnails";
import { EP5_FRAMES, Episode5 } from "./episodes/ep5/Video";
import { ThumbM, ThumbN, ThumbO } from "./episodes/ep5/Thumbnails";
import { EP6_FRAMES, Episode6 } from "./episodes/ep6/Video";
import { ThumbP, ThumbQ, ThumbR } from "./episodes/ep6/Thumbnails";
import { EP7_FRAMES, Episode7 } from "./episodes/ep7/Video";
import { ThumbS, ThumbT, ThumbU } from "./episodes/ep7/Thumbnails";
import { ThumbG, ThumbH, ThumbI } from "./episodes/ep3/Thumbnails";

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
    <Composition id="Episode4" component={Episode4} fps={FPS} width={1920} height={1080} durationInFrames={EP4_FRAMES} />
    <Composition id="Episode5" component={Episode5} fps={FPS} width={1920} height={1080} durationInFrames={EP5_FRAMES} />
    <Composition id="Episode6" component={Episode6} fps={FPS} width={1920} height={1080} durationInFrames={EP6_FRAMES} />
    <Composition id="Episode7" component={Episode7} fps={FPS} width={1920} height={1080} durationInFrames={EP7_FRAMES} />
    <Still id="ThumbA" component={ThumbA} width={1280} height={720} />
    <Still id="ThumbB" component={ThumbB} width={1280} height={720} />
    <Still id="ThumbC" component={ThumbC} width={1280} height={720} />
    <Still id="Ep2ThumbA" component={ThumbD} width={1280} height={720} />
    <Still id="Ep2ThumbB" component={ThumbE} width={1280} height={720} />
    <Still id="Ep2ThumbC" component={ThumbF} width={1280} height={720} />
    <Composition
      id="Ep3Short1"
      component={ShortsVideo}
      defaultProps={{ id: "SH03" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH03.frames}
    />
    <Composition
      id="Ep3Short2"
      component={ShortsVideo}
      defaultProps={{ id: "SH04" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH04.frames}
    />
    <Composition
      id="Ep3Short3"
      component={ShortsVideo}
      defaultProps={{ id: "SH05" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH05.frames}
    />
    <Composition
      id="Ep3Short4"
      component={ShortsVideo}
      defaultProps={{ id: "SH06" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH06.frames}
    />
    <Still id="Ep3ThumbA" component={ThumbG} width={1280} height={720} />
    <Still id="Ep3ThumbB" component={ThumbH} width={1280} height={720} />
    <Still id="Ep3ThumbC" component={ThumbI} width={1280} height={720} />
    <Still id="Ep4ThumbA" component={ThumbJ} width={1280} height={720} />
    <Still id="Ep4ThumbB" component={ThumbK} width={1280} height={720} />
    <Still id="Ep4ThumbC" component={ThumbL} width={1280} height={720} />
    <Still id="Ep5ThumbA" component={ThumbM} width={1280} height={720} />
    <Still id="Ep5ThumbB" component={ThumbN} width={1280} height={720} />
    <Still id="Ep5ThumbC" component={ThumbO} width={1280} height={720} />
    <Composition
      id="Ep6Short1"
      component={ShortsVideo}
      defaultProps={{ id: "SH07" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH07.frames}
    />
    <Composition
      id="Ep6Short2"
      component={ShortsVideo}
      defaultProps={{ id: "SH08" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH08.frames}
    />
    <Composition
      id="Ep6Short3"
      component={ShortsVideo}
      defaultProps={{ id: "SH09" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH09.frames}
    />
    <Composition
      id="Ep6Short4"
      component={ShortsVideo}
      defaultProps={{ id: "SH10" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH10.frames}
    />
    <Still id="Ep6ThumbA" component={ThumbP} width={1280} height={720} />
    <Still id="Ep6ThumbB" component={ThumbQ} width={1280} height={720} />
    <Still id="Ep6ThumbC" component={ThumbR} width={1280} height={720} />
    <Composition
      id="Ep7Short1"
      component={ShortsVideo}
      defaultProps={{ id: "SH11" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH11.frames}
    />
    <Composition
      id="Ep7Short2"
      component={ShortsVideo}
      defaultProps={{ id: "SH12" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH12.frames}
    />
    <Composition
      id="Ep7Short3"
      component={ShortsVideo}
      defaultProps={{ id: "SH13" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH13.frames}
    />
    <Composition
      id="Ep7Short4"
      component={ShortsVideo}
      defaultProps={{ id: "SH14" as const }}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={TIMING.SH14.frames}
    />
    <Still id="Ep7ThumbA" component={ThumbS} width={1280} height={720} />
    <Still id="Ep7ThumbB" component={ThumbT} width={1280} height={720} />
    <Still id="Ep7ThumbC" component={ThumbU} width={1280} height={720} />
  </>
);
