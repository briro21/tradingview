import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { theme } from "./theme";
import { Beat, BoardTrack, VERTICAL } from "./board/Board";
import { Paper } from "./board/Paper";
import { Captions } from "./components/Captions";
import { SH01 } from "./scenes/SH01";
import { SH02 } from "./scenes/SH02";
import { SH03, SH04, SH05, SH06 } from "./scenes/EP3Shorts";
import { SH07, SH08, SH09, SH10 } from "./scenes/EP6Shorts";
import { SH11, SH12, SH13, SH14 } from "./scenes/EP7Shorts";
import { TIMING } from "./timing";
import { ShortId } from "./timeline";

const SHORTS: Record<ShortId, { beats: Beat[]; label: string }> = {
  // Teaser ringkasan wawancara The Diary Of A CEO.
  SH01: { beats: SH01, label: "The Diary Of A CEO × Dr. Roman Yampolskiy" },
  // Teaser Episode 2.
  SH02: { beats: SH02, label: "Ex-OpenAI insider · AI 2027" },
  // Episode 3: Robert Greene.
  SH03: { beats: SH03, label: "Robert Greene · the dark side" },
  SH04: { beats: SH04, label: "Robert Greene · seduction" },
  SH05: { beats: SH05, label: "Robert Greene · mastery" },
  SH06: { beats: SH06, label: "Robert Greene · the stroke" },
  // AI & krisis matematika (Lex Fridman Podcast #503).
  SH07: { beats: SH07, label: "Lex Fridman Podcast · AI & math" },
  SH08: { beats: SH08, label: "Lex Fridman Podcast · AI & math" },
  SH09: { beats: SH09, label: "Lex Fridman Podcast · AI & students" },
  SH10: { beats: SH10, label: "Lex Fridman Podcast · AI & your job" },
  // Robert Pape × The Diary of a CEO.
  SH11: { beats: SH11, label: "Diary of a CEO · Robert Pape" },
  SH12: { beats: SH12, label: "Diary of a CEO · Robert Pape" },
  SH13: { beats: SH13, label: "Diary of a CEO · Robert Pape" },
  SH14: { beats: SH14, label: "Diary of a CEO · Robert Pape" },
};

// YouTube Shorts 1080×1920.
export const ShortsVideo: React.FC<{ id: ShortId }> = ({ id }) => (
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
