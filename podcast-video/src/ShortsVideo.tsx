import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { theme } from "./theme";
import { Beat, BoardTrack, VERTICAL } from "./board/Board";
import { Paper } from "./board/Paper";
import { Captions } from "./components/Captions";
import { SH01 } from "./scenes/SH01";
import { SH02 } from "./scenes/SH02";
import { TIMING } from "./timing";

const SHORTS: Record<"SH01" | "SH02", { beats: Beat[]; label: string }> = {
  // Teaser ringkasan wawancara The Diary Of A CEO.
  SH01: { beats: SH01, label: "The Diary Of A CEO × Dr. Roman Yampolskiy" },
  // Teaser Episode 2.
  SH02: { beats: SH02, label: "Ex-OpenAI insider · AI 2027" },
};

// YouTube Shorts 1080×1920.
export const ShortsVideo: React.FC<{ id: "SH01" | "SH02" }> = ({ id }) => (
  <AbsoluteFill>
    <Paper />
    <Audio src={staticFile(`${id}.mp3`)} />
    <BoardTrack scene={id} timing={TIMING[id]} beats={SHORTS[id].beats} layout={VERTICAL} />
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
      <span style={{ backgroundColor: `${theme.yellow}cc`, padding: "4px 18px", borderRadius: 8 }}>{SHORTS[id].label}</span>
    </div>
    <Captions timing={TIMING[id]} bottom={420} fontSize={56} maxWidth={940} />
  </AbsoluteFill>
);
