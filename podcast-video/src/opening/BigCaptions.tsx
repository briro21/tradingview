import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Word } from "./config";
import { C, INTER } from "./Stage";

// Large word-by-word captions for the opening: 2-4 words at a time, the spoken word on a red chip.
const chunks = (words: Word[]) => {
  const out: Word[][] = [];
  let cur: Word[] = [];
  words.forEach((w, i) => {
    cur.push(w);
    const next = words[i + 1];
    if (!next || cur.length >= 4 || /[.,:?!]$/.test(w[0]) || next[1] - w[2] > 0.3) {
      out.push(cur);
      cur = [];
    }
  });
  return out;
};

export const BigCaptions: React.FC<{ words: Word[]; offset?: number; x?: number }> = ({ words, offset = 0, x = 1180 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps + offset;
  const groups = chunks(words);
  const g = groups.find((c) => t >= c[0][1] - 0.05 && t <= c[c.length - 1][2] + 0.25);
  if (!g) return null;
  const pop = Math.min(1, (t - g[0][1] + 0.05) / 0.12);
  return (
    <div style={{ position: "absolute", left: x - 900, width: 1800, bottom: 64, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          gap: 18,
          padding: "10px 26px",
          borderRadius: 18,
          background: "rgba(11,11,13,0.82)",
          transform: `translateY(${(1 - pop) * 24}px) scale(${0.94 + 0.06 * pop})`,
        }}
      >
        {g.map((w, i) => {
          const on = t >= w[1] - 0.03;
          const cur = on && (i === g.length - 1 || t < g[i + 1][1] - 0.03);
          return (
            <span
              key={i}
              style={{
                fontFamily: INTER,
                fontWeight: 800,
                fontSize: 68,
                lineHeight: 1.15,
                color: on ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                background: cur ? C.accent : "transparent",
                borderRadius: 10,
                padding: "0 10px",
                transform: cur ? "scale(1.06)" : "none",
              }}
            >
              {w[0]}
            </span>
          );
        })}
      </div>
    </div>
  );
};
