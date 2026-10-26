import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { theme } from "../theme";

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  x: random(`x${i}`) * 100,
  y: random(`y${i}`) * 100,
  size: 2 + random(`s${i}`) * 4,
  speed: 0.02 + random(`v${i}`) * 0.06,
  phase: random(`p${i}`) * Math.PI * 2,
}));

// Latar yang selalu bergerak: orb gradien, grid perspektif berjalan, partikel.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          left: 200 + Math.sin(t * 0.25) * 300,
          top: -300 + Math.cos(t * 0.2) * 150,
          background: `radial-gradient(circle, ${theme.blue}33 0%, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          right: 100 + Math.cos(t * 0.3) * 250,
          bottom: -250 + Math.sin(t * 0.22) * 120,
          background: `radial-gradient(circle, ${theme.cyan}22 0%, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "-50%",
          width: "200%",
          bottom: -200,
          height: 700,
          backgroundImage: `linear-gradient(${theme.blue}40 2px, transparent 2px), linear-gradient(90deg, ${theme.blue}40 2px, transparent 2px)`,
          backgroundSize: "90px 90px",
          backgroundPosition: `0 ${(frame * 2) % 90}px`,
          transform: "perspective(600px) rotateX(62deg)",
          maskImage: "linear-gradient(transparent, black 70%)",
          WebkitMaskImage: "linear-gradient(transparent, black 70%)",
          opacity: 0.55,
        }}
      />
      {PARTICLES.map((p, i) => {
        const y = (p.y - frame * p.speed + 1000) % 100;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: i % 3 === 0 ? theme.cyan : theme.text,
              opacity: 0.15 + 0.35 * (0.5 + 0.5 * Math.sin(t * 2 + p.phase)),
            }}
          />
        );
      })}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.75) 100%)" }} />
    </AbsoluteFill>
  );
};
