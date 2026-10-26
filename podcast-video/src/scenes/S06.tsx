import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { useEnterExit } from "../components/anim";
import { Headline } from "../components/Headline";
import { Highlight } from "../components/Highlight";
import { SceneFrame } from "../components/SceneFrame";
import { useBeat } from "../components/useBeat";

const COLS = 32;
const ROWS = 10;
const BASE = 173; // satu sel = "base reality"

// Insight 3: hipotesis simulasi — miliaran dunia, hanya satu yang asli.
export const S06: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = useBeat();
  const { exit } = useEnterExit();
  const visible = interpolate(frame, [beat(0.05), beat(0.4)], [0, COLS * ROWS], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const odds = Math.round(
    interpolate(frame, [beat(0.4), beat(0.6)], [1, 1_000_000_000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <SceneFrame label="INSIGHT 03 · THE SIMULATION">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 60 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 26px)`,
            gap: 12,
            opacity: exit,
          }}
        >
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const isBase = i === BASE;
            return (
              <div
                key={i}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  backgroundColor: isBase ? theme.cyan : "#1e3a8a",
                  boxShadow: isBase ? `0 0 30px ${theme.cyan}` : "none",
                  opacity: i < visible ? 1 : 0,
                }}
              />
            );
          })}
        </div>
        <Headline size={64} color={theme.text} delay={beat(0.4)}>
          Odds you live in base reality
        </Headline>
        <Headline size={130} delay={beat(0.4)}>
          <Highlight>1</Highlight> in {odds.toLocaleString("en-US")}
        </Headline>
        <Headline size={56} delay={beat(0.75)} color={theme.text}>
          Science and scripture describe <Highlight color={theme.blue}>the same code</Highlight>
        </Headline>
      </div>
    </SceneFrame>
  );
};
