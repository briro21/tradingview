import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { theme } from "./theme";
import { BoardTrack, VERTICAL } from "./board/Board";
import { Paper } from "./board/Paper";
import { Captions } from "./components/Captions";
import { SH01 } from "./scenes/SH01";
import { TIMING } from "./timing";

// YouTube Shorts 1080×1920: teaser ringkasan wawancara The Diary Of A CEO.
export const ShortsVideo: React.FC = () => (
  <AbsoluteFill>
    <Paper />
    <Audio src={staticFile("SH01.mp3")} />
    <BoardTrack scene="SH01" timing={TIMING.SH01} beats={SH01} layout={VERTICAL} />
    <div
      style={{
        position: "absolute",
        top: 70,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: theme.hand,
        fontSize: 46,
        color: theme.ink,
      }}
    >
      <span style={{ backgroundColor: `${theme.yellow}cc`, padding: "4px 18px", borderRadius: 8 }}>
        The Diary Of A CEO × Dr. Roman Yampolskiy
      </span>
    </div>
    <Captions timing={TIMING.SH01} bottom={420} fontSize={56} maxWidth={940} />
  </AbsoluteFill>
);
