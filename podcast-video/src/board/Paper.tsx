import React from "react";
import { AbsoluteFill } from "remotion";
import { theme } from "../theme";

// Kertas whiteboard dengan tekstur halus dan vignette tipis.
export const Paper: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: theme.paper }}>
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
      <filter id="paper-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={3} />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-noise)" />
    </svg>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.10) 100%)" }} />
  </AbsoluteFill>
);
