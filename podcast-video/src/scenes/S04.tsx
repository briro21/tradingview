import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { useEnterExit } from "../components/anim";
import { Headline } from "../components/Headline";
import { Highlight } from "../components/Highlight";
import { SceneFrame } from "../components/SceneFrame";
import { useBeat } from "../components/useBeat";

const W = 1400;
const H = 520;
// Kapabilitas: hiper-eksponensial. Safety: hampir datar.
const capability = (x: number) => H - (Math.pow(x, 3.2) * (H - 40) + 20);
const safety = (x: number) => H - (20 + x * 70);

const path = (fn: (x: number) => number, progress: number) => {
  const pts: string[] = [];
  const steps = 80;
  for (let i = 0; i <= steps * progress; i++) {
    const x = i / steps;
    pts.push(`${i === 0 ? "M" : "L"}${(x * W).toFixed(1)},${fn(x).toFixed(1)}`);
  }
  return pts.join(" ");
};

// Insight 2: jurang antara kekuatan AI dan kemampuan kita mengontrolnya.
export const S04: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = useBeat();
  const { exit } = useEnterExit();
  const progress = interpolate(frame, [beat(0.1), beat(0.75)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelOpacity = interpolate(progress, [0.85, 1], [0, 1], { extrapolateLeft: "clamp" });

  return (
    <SceneFrame label="INSIGHT 02 · THE CONTROL PROBLEM">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 50 }}>
        <Headline size={80}>
          There Is <Highlight>No Off Switch</Highlight>
        </Headline>
        <svg width={W} height={H} style={{ overflow: "visible", opacity: exit }}>
          <line x1={0} y1={H} x2={W} y2={H} stroke="#334155" strokeWidth={3} />
          <path d={path(capability, progress)} fill="none" stroke={theme.cyan} strokeWidth={8} />
          <path d={path(safety, progress)} fill="none" stroke={theme.text} strokeWidth={6} strokeDasharray="16 12" />
          <g style={{ opacity: labelOpacity }} fontFamily={theme.font} fontWeight={700} fontSize={36}>
            <text x={W - 20} y={capability(1) + 10} fill={theme.cyan} textAnchor="end">
              AI Capability
            </text>
            <text x={W - 20} y={safety(1) - 24} fill={theme.text} textAnchor="end">
              AI Safety
            </text>
            <line x1={W} y1={capability(1)} x2={W} y2={safety(1)} stroke={theme.blue} strokeWidth={4} />
            <text x={W + 24} y={(capability(1) + safety(1)) / 2} fill={theme.blue}>
              GAP
            </text>
          </g>
        </svg>
      </div>
    </SceneFrame>
  );
};
