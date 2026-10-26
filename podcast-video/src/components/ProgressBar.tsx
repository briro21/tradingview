import React from "react";
import { useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { SCENES, TOTAL_FRAMES } from "../timeline";

// Bar progres per bab di atas layar.
export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  let from = 0;
  return (
    <div style={{ position: "absolute", top: 24, left: 70, right: 340, display: "flex", gap: 8 }}>
      {SCENES.map((s) => {
        const p = Math.min(1, Math.max(0, (frame - from) / s.frames));
        from += s.frames;
        return (
          <div
            key={s.id}
            style={{ flex: s.frames / TOTAL_FRAMES, height: 6, borderRadius: 3, backgroundColor: "#ffffff1f", overflow: "hidden" }}
          >
            <div style={{ width: `${p * 100}%`, height: "100%", backgroundColor: theme.cyan, boxShadow: `0 0 12px ${theme.cyan}` }} />
          </div>
        );
      })}
    </div>
  );
};
