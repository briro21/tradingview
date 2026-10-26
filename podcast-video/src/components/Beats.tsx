import React, { createContext, useContext } from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";
import { SceneId } from "../timeline";
import { findPhrase, TIMING } from "../timing";

// Satu "beat" = satu visual yang muncul saat narator mengucapkan `at`.
export type Beat = { at: string; v: React.ReactNode; sfx?: "whoosh" | "impact" | "none" };

const LEAD = 6; // visual muncul sedikit sebelum kata diucapkan

const BeatContext = createContext<{ scene: SceneId; from: number }>({ scene: "S01", from: 0 });

// Frame (relatif ke awal beat) ketika `phrase` diucapkan, untuk sinkronisasi di dalam visual.
export const useAt = () => {
  const { scene, from } = useContext(BeatContext);
  const { fps } = useVideoConfig();
  const words = TIMING[scene].words;
  return (phrase: string) => {
    const startIdx = Math.max(0, words.findIndex((w) => w[1] * fps >= from - LEAD));
    const i = findPhrase(words, phrase, startIdx);
    if (i < 0) throw new Error(`[${scene}] phrase not found: "${phrase}"`);
    return Math.round(words[i][1] * fps) - from;
  };
};

const BeatShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames: d } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 13, mass: 0.6 } });
  const exit = interpolate(frame, [d - 8, d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const push = interpolate(frame, [0, d], [0, 0.05]); // kamera pelan maju
  const sweep = interpolate(frame, [0, 10], [-30, 130], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "140px 120px 230px",
          opacity: Math.min(enter, 1 - exit),
          filter: `blur(${(1 - enter) * 10 + exit * 14}px)`,
          transform: `scale(${interpolate(enter, [0, 1], [0.86, 1]) + push + exit * 0.12})`,
        }}
      >
        {children}
      </AbsoluteFill>
      {/* garis cahaya yang menyapu layar setiap pergantian beat */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: `${sweep}%`,
          width: 6,
          height: "140%",
          background: `linear-gradient(${theme.cyan}00, ${theme.cyan}, ${theme.cyan}00)`,
          transform: "rotate(18deg)",
          boxShadow: `0 0 40px ${theme.cyan}`,
          opacity: frame < 12 ? 0.8 : 0,
        }}
      />
    </AbsoluteFill>
  );
};

export const BeatTrack: React.FC<{ scene: SceneId; beats: Beat[] }> = ({ scene, beats }) => {
  const { fps } = useVideoConfig();
  const { words, frames } = TIMING[scene];

  let idx = 0;
  const starts = beats.map((b, i) => {
    const found = findPhrase(words, b.at, idx);
    if (found < 0) throw new Error(`[${scene}] beat phrase not found: "${b.at}"`);
    idx = found + 1;
    return i === 0 ? 0 : Math.max(0, Math.round(words[found][1] * fps) - LEAD);
  });

  return (
    <>
      {beats.map((b, i) => {
        const from = starts[i];
        const dur = (i + 1 < beats.length ? starts[i + 1] : frames) - from;
        const sfx = b.sfx ?? (i === 0 ? "none" : "whoosh");
        return (
          <Sequence key={i} from={from} durationInFrames={dur} name={`${scene} · ${b.at}`}>
            <BeatContext.Provider value={{ scene, from }}>
              {sfx !== "none" ? (
                <Audio src={staticFile(`sfx/${sfx}.mp3`)} volume={sfx === "impact" ? 0.5 : 0.18} />
              ) : null}
              <BeatShell>{b.v}</BeatShell>
            </BeatContext.Provider>
          </Sequence>
        );
      })}
    </>
  );
};
