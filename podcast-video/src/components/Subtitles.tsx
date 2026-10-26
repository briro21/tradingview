import React, { useEffect, useState } from "react";
import { cancelRender, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

type Cue = { start: number; end: number; text: string };

const toSeconds = (t: string) => {
  const [h, m, rest] = t.split(":");
  const [s, ms] = rest.split(",");
  return Number(h) * 3600 + Number(m) * 60 + Number(s) + Number(ms) / 1000;
};

export const parseSrt = (srt: string): Cue[] =>
  srt
    .trim()
    .split(/\r?\n\r?\n/)
    .map((block) => {
      const lines = block.split(/\r?\n/);
      const [a, b] = lines[1].split(" --> ");
      return { start: toSeconds(a), end: toSeconds(b), text: lines.slice(2).join(" ") };
    });

// Menampilkan subtitle dari file SRT (relatif terhadap awal Sequence).
export const Subtitles: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [cues, setCues] = useState<Cue[] | null>(null);
  const [handle] = useState(() => delayRender(`Loading ${src}`));

  useEffect(() => {
    fetch(staticFile(src))
      .then((r) => r.text())
      .then((t) => {
        setCues(parseSrt(t));
        continueRender(handle);
      })
      .catch((e) => cancelRender(e));
  }, [src, handle]);

  const t = frame / fps;
  const cue = cues?.find((c) => t >= c.start && t <= c.end + 0.2);
  if (!cue) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 70,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1500,
          padding: "14px 32px",
          borderRadius: 14,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: theme.white,
          fontFamily: theme.font,
          fontSize: 46,
          fontWeight: 600,
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {cue.text}
      </div>
    </div>
  );
};
