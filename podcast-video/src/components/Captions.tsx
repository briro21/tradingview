import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { SceneId } from "../timeline";
import { TIMING } from "../timing";

// Caption gaya karaoke: kata yang sedang diucapkan menyala cyan.
export const Captions: React.FC<{ scene: SceneId }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const { cues, words } = TIMING[scene];
  const cue = cues.find(([a, b]) => t >= a && t <= b + 0.25);
  if (!cue) return null;

  const [a, b] = cue;
  const cueWords = words.filter((w) => w[1] >= a - 0.01 && w[1] < b);
  const pop = spring({ frame: frame - Math.round(a * fps), fps, config: { damping: 14, mass: 0.5 } });

  return (
    <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          maxWidth: 1500,
          padding: "14px 34px",
          borderRadius: 16,
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          border: `1px solid ${theme.blue}55`,
          fontFamily: theme.font,
          fontSize: 48,
          fontWeight: 700,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: 16,
          lineHeight: 1.3,
          transform: `translateY(${(1 - pop) * 20}px) scale(${0.95 + pop * 0.05})`,
          opacity: pop,
        }}
      >
        {cueWords.map(([text, s, e], i) => {
          const active = t >= s && t < e;
          const done = t >= e;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                color: active ? theme.cyan : done ? theme.white : `${theme.text}88`,
                textShadow: active ? `0 0 20px ${theme.cyan}` : "none",
              }}
            >
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
