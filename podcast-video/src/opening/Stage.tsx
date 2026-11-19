import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { ICONS } from "../board/icons";
import { theme } from "../theme";

// Shared look of the opening: same visual language as the motion body (ep9-reel/film.js):
// dark stage, warm white type, one red accent, faint drifting keyword + chart line behind.
export const ANTON = loadAnton().fontFamily;
export const INTER = loadInter("normal", { weights: ["600", "800"] }).fontFamily;
export const C = { bg: "#0D0D10", ink: "#F4F1EA", dim: "#B9B5AC", paper: "#F4F1EA", paperInk: "#141414", accent: "#FF3B30" };

const rnd = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

/** Background: dark (or paper) with a moving grid, a chart line drawing itself and a huge keyword. */
export const Stage: React.FC<{ keyword?: string; light?: boolean; seed?: number; durationInFrames: number; children?: React.ReactNode }> = ({
  keyword,
  light,
  seed = 1,
  durationInFrames,
  children,
}) => {
  const f = useCurrentFrame();
  const ink = light ? "0,0,0" : "255,255,255";
  const r = rnd(seed * 7919 + 13);
  const pts: [number, number][] = [];
  let v = 0.55 + r() * 0.2;
  for (let k = 0; k <= 24; k++) {
    v = Math.min(0.85, Math.max(0.15, v + (r() - 0.5) * 0.16));
    pts.push([(k / 24) * 1920, 1080 * v]);
  }
  const p = Math.min(1, f / Math.max(1, durationInFrames * 0.9));
  const n = Math.max(1, Math.floor(p * 24));
  const d = pts.slice(0, n + 1).map((q, i) => `${i ? "L" : "M"}${q[0].toFixed(0)} ${q[1].toFixed(0)}`).join(" ");
  const off = (f * 0.4) % 120;
  return (
    <AbsoluteFill style={{ background: light ? C.paper : C.bg, overflow: "hidden" }}>
      {!light && <AbsoluteFill style={{ background: "radial-gradient(circle at 30% 35%, #24242B 0%, rgba(13,13,16,0) 60%)" }} />}
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {Array.from({ length: 18 }, (_, i) => (
          <line key={`v${i}`} x1={i * 120 - off} y1={0} x2={i * 120 - off} y2={1080} stroke={`rgba(${ink},0.035)`} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={60 + i * 120} x2={1920} y2={60 + i * 120} stroke={`rgba(${ink},0.035)`} />
        ))}
        <path d={d} fill="none" stroke={light ? "rgba(230,57,70,0.16)" : "rgba(255,59,48,0.22)"} strokeWidth={4} strokeLinejoin="round" />
      </svg>
      {keyword && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 330,
            textAlign: "center",
            fontFamily: ANTON,
            fontSize: 560,
            lineHeight: 1,
            whiteSpace: "nowrap",
            color: `rgba(${ink},${light ? 0.032 : 0.045})`,
            transform: `translateX(${(seed % 2 ? 1 : -1) * (f * 0.9 - 120)}px)`,
          }}
        >
          {keyword}
        </div>
      )}
      {children}
    </AbsoluteFill>
  );
};

/** A board icon (src/board/icons.ts) as line art for the dark stage; draws itself, then pops. */
export const Icon: React.FC<{ name: string; size: number; x: number; y: number; light?: boolean }> = ({ name, size, x, y, light }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const strokes = ICONS[name] ?? [];
  const pop = spring({ frame: f, fps, config: { damping: 11, stiffness: 160 } });
  const draw = Math.min(1, f / 14);
  const ink = light ? C.paperInk : C.ink;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ position: "absolute", left: x - size / 2, top: y - size / 2, transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])}) rotate(${interpolate(pop, [0, 1], [-8, 0])}deg)`, overflow: "visible" }}
    >
      {strokes.map((s, i) => (
        <path
          key={i}
          d={s.d}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - Math.min(1, Math.max(0, draw * strokes.length - i * 0.8))}
          fill={s.fill ? (s.fill === theme.red ? C.accent : light ? "#E2DCCF" : "#2A2A31") : "none"}
          stroke={s.color === theme.red ? C.accent : ink}
          strokeWidth={3.4 * (s.w ?? 1)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
};

/** Licensed photo sticker (background removed, white outline) standing on the bottom edge. */
export const Photo: React.FC<{ src: string; height: number; left: number; delay?: number }> = ({ src, height, left, delay = 0 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame: f - delay, fps, config: { damping: 12, stiffness: 120 } });
  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        left,
        bottom: -20,
        height,
        transformOrigin: "bottom center",
        transform: `translateY(${(1 - a) * 260}px) rotate(${interpolate(a, [0, 1], [-6, 0]) + Math.sin(f / 40) * 0.6}deg) scale(${1 + Math.sin(f / 50) * 0.01})`,
      }}
    />
  );
};

/** Display lines that slam in one after another; red line gets an overshoot. */
export const Slam: React.FC<{ lines: string[]; at: number[]; x: number; y: number; size: number; color: string[]; align?: "left" | "center" | "right" }> = ({
  lines,
  at,
  x,
  y,
  size,
  color,
  align = "center",
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: x - 900, width: 1800, top: y, textAlign: align }}>
      {lines.map((l, i) => {
        const a = spring({ frame: f - at[i], fps, config: { damping: 9, stiffness: 180 } });
        if (f < at[i]) return null;
        const big = i === 0 ? size : size * 0.78;
        return (
          <div
            key={i}
            style={{
              fontFamily: ANTON,
              fontSize: big,
              lineHeight: 1.02,
              color: color[i] ?? color[0],
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              transform: `scale(${interpolate(a, [0, 1], [1.8, 1])}) translateY(${Math.sin((f + i * 20) / 30) * 3}px)`,
              opacity: Math.min(1, (f - at[i]) / 3),
            }}
          >
            {l}
          </div>
        );
      })}
    </div>
  );
};
