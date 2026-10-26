import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { useEnterExit } from "./anim";

export const BulletPoints: React.FC<{
  items: React.ReactNode[];
  startDelay?: number;
  stagger?: number;
}> = ({ items, startDelay = 10, stagger = 30 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { exit } = useEnterExit();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48, opacity: exit }}>
      {items.map((item, i) => {
        const s = spring({ frame: frame - startDelay - i * stagger, fps, config: { damping: 13 } });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 36,
              opacity: s,
              transform: `translateX(${interpolate(s, [0, 1], [-120, 0])}px)`,
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
                boxShadow: `0 0 24px ${theme.cyan}55`,
              }}
            >
              {i + 1}
            </div>
            <div style={{ fontSize: 72, fontWeight: 700, color: theme.white }}>{item}</div>
          </div>
        );
      })}
    </div>
  );
};
