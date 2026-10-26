import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const BulletPoints: React.FC<{ items: React.ReactNode[]; delays: number[] }> = ({ items, delays }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {items.map((item, i) => {
        const s = spring({ frame: frame - delays[i], fps, config: { damping: 12 } });
        const glow = interpolate(frame - delays[i], [0, 8, 30], [0, 1, 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 36,
              opacity: s,
              transform: `translateX(${interpolate(s, [0, 1], [-160, 0])}px)`,
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                border: `4px solid ${theme.cyan}`,
                color: theme.cyan,
                fontSize: 48,
                fontWeight: 800,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: `0 0 ${20 + glow * 40}px ${theme.cyan}`,
              }}
            >
              {i + 1}
            </div>
            <div style={{ fontSize: 76, fontWeight: 800, color: theme.white }}>{item}</div>
          </div>
        );
      })}
    </div>
  );
};
