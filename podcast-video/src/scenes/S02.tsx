import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { useEnterExit } from "../components/anim";
import { MorphText } from "../components/MorphText";
import { SceneFrame } from "../components/SceneFrame";
import { useBeat } from "../components/useBeat";

const MILESTONES = [
  { year: "2027", text: "Cognitive tasks automated" },
  { year: "2030", text: "Humanoid robots replace physical labor" },
];

// Insight 1: dari "alat baru" menjadi "penemu baru" — AGI menggantikan pikiran manusia.
export const S02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const beat = useBeat();
  const { exit } = useEnterExit();
  return (
    <SceneFrame label="INSIGHT 01 · THE END OF WORK">
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 100 }}>
        <MorphText
          from="A NEW TOOL?"
          to="A NEW INVENTOR"
          fromColor={theme.cyan}
          toColor={theme.white}
          switchAt={beat(0.5)}
        />
        <div style={{ display: "flex", gap: 80, opacity: exit }}>
          {MILESTONES.map((m, i) => {
            const s = spring({ frame: frame - beat(0.25) - i * 20, fps, config: { damping: 14 } });
            return (
              <div
                key={m.year}
                style={{
                  borderLeft: `6px solid ${theme.blue}`,
                  paddingLeft: 28,
                  opacity: s,
                  transform: `translateY(${interpolate(s, [0, 1], [50, 0])}px)`,
                }}
              >
                <div style={{ fontSize: 80, fontWeight: 800, color: theme.blue }}>{m.year}</div>
                <div style={{ fontSize: 34, color: theme.text }}>{m.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneFrame>
  );
};
