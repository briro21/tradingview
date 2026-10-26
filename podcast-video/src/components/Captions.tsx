import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { SceneId } from "../timeline";
import { TIMING } from "../timing";

// Caption tulisan tangan; kata yang sedang diucapkan diberi stabilo kuning.
export const Captions: React.FC<{ scene: SceneId; bottom?: number; fontSize?: number; maxWidth?: number }> = ({
  scene,
  bottom = 40,
  fontSize = 50,
  maxWidth = 1500,
}) => {
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
    <div style={{ position: "absolute", bottom, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          maxWidth,
          padding: "8px 28px",
          borderRadius: 14,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          border: `3px solid ${theme.ink}`,
          boxShadow: "4px 5px 0 rgba(0,0,0,0.15)",
          fontFamily: theme.hand,
          fontSize,
          color: theme.ink,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: 14,
          lineHeight: 1.25,
          transform: `translateY(${(1 - pop) * 16}px)`,
          opacity: pop,
        }}
      >
        {cueWords.map(([text, s, e], i) => {
          const active = t >= s && t < e;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                padding: "0 4px",
                borderRadius: 6,
                backgroundColor: active ? `${theme.yellow}cc` : "transparent",
                opacity: t >= s ? 1 : 0.45,
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
