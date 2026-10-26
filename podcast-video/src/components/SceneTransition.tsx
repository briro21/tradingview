import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

// Kilatan + garis scan di awal setiap scene.
export const SceneTransition: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame > 16) return null;
  const flash = interpolate(frame, [0, 12], [0.85, 0], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 16], [0, 100]);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ backgroundColor: theme.white, opacity: flash }} />
      <div style={{ position: "absolute", top: `${y}%`, left: 0, right: 0, height: 8, backgroundColor: theme.cyan, boxShadow: `0 0 60px 20px ${theme.cyan}` }} />
    </AbsoluteFill>
  );
};
