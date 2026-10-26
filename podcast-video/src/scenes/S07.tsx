import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { useEnterExit } from "../components/anim";
import { Headline } from "../components/Headline";
import { Highlight } from "../components/Highlight";
import { SceneFrame } from "../components/SceneFrame";
import { useBeat } from "../components/useBeat";

// Outro: dua kemungkinan masa depan + CTA subscribe.
export const S07: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const beat = useBeat();
  const { exit } = useEnterExit();
  const btn = spring({ frame: frame - beat(0.55), fps, config: { damping: 9 } });
  const pulse = 1 + Math.sin(frame / 6) * 0.03 * btn;

  return (
    <SceneFrame>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 70 }}>
        <Headline size={110}>
          <Highlight>Liberation</Highlight> or <span style={{ color: theme.text }}>Erasure</span>?
        </Headline>
        <div
          style={{
            padding: "28px 72px",
            borderRadius: 20,
            backgroundColor: theme.blue,
            color: theme.white,
            fontSize: 60,
            fontWeight: 800,
            letterSpacing: 4,
            boxShadow: `0 0 50px ${theme.blue}aa`,
            opacity: Math.min(btn, exit),
            transform: `scale(${interpolate(btn, [0, 1], [0.4, 1]) * pulse})`,
          }}
        >
          SUBSCRIBE
        </div>
      </div>
    </SceneFrame>
  );
};
