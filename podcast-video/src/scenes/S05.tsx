import React from "react";
import { theme } from "../theme";
import { Headline } from "../components/Headline";
import { Highlight } from "../components/Highlight";
import { SceneFrame } from "../components/SceneFrame";
import { useBeat } from "../components/useBeat";

// Transition 2: pertanyaan tentang realitas.
export const S05: React.FC = () => {
  const beat = useBeat();
  return (
    <SceneFrame>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <Headline size={72} color={theme.text}>
          If machines see us as pets…
        </Headline>
        <Headline size={130} delay={beat(0.45)}>
          What Is <Highlight>Real</Highlight>?
        </Headline>
      </div>
    </SceneFrame>
  );
};
