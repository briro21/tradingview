import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { useEnterExit } from "./anim";

// Kata `from` memudar + blur keluar, kata `to` muncul di posisi yang sama.
export const MorphText: React.FC<{
  from: string;
  to: string;
  fromColor: string;
  toColor: string;
  switchAt: number;
  size?: number;
}> = ({ from, to, fromColor, toColor, switchAt, size = 150 }) => {
  const frame = useCurrentFrame();
  const { enter, exit } = useEnterExit();
  const t = interpolate(frame, [switchAt, switchAt + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const base: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontSize: size,
    fontWeight: 900,
    letterSpacing: -4,
    whiteSpace: "nowrap",
  };
  return (
    <div style={{ position: "relative", width: "100%", height: size * 1.3, opacity: exit }}>
      <div
        style={{
          ...base,
          color: fromColor,
          textShadow: `0 0 40px ${fromColor}88`,
          opacity: Math.min(enter, 1 - t),
          filter: `blur(${t * 20}px)`,
          transform: `scale(${interpolate(enter, [0, 1], [0.6, 1]) + t * 0.2})`,
        }}
      >
        {from}
      </div>
      <div
        style={{
          ...base,
          color: toColor,
          opacity: t,
          filter: `blur(${(1 - t) * 20}px)`,
          transform: `scale(${1.2 - t * 0.2})`,
        }}
      >
        {to}
      </div>
    </div>
  );
};
