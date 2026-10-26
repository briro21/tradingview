import React from "react";
import { BulletPoints } from "../components/BulletPoints";
import { Highlight } from "../components/Highlight";
import { SceneFrame } from "../components/SceneFrame";

// Transition 1: tiga poin muncul satu per satu.
export const S03: React.FC = () => (
  <SceneFrame label="BEYOND THE PAYCHECK">
    <BulletPoints
      stagger={45}
      items={[
        <>
          AI = <Highlight>Co-Pilot</Highlight>
        </>,
        "Evolusi Pekerjaan",
        <>
          Cara <Highlight>Beradaptasi</Highlight>
        </>,
      ]}
    />
  </SceneFrame>
);
