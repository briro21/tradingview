import React from "react";
import { BulletPoints } from "../components/BulletPoints";
import { Highlight } from "../components/Highlight";
import { SceneFrame } from "../components/SceneFrame";

// Transition 1: dari hilangnya pekerjaan menuju masalah kontrol.
export const S03: React.FC = () => (
  <SceneFrame label="BEYOND THE PAYCHECK">
    <BulletPoints
      stagger={45}
      items={[
        "A World Without Work",
        <>
          Just a <Highlight>Symptom</Highlight>
        </>,
        <>
          The Real Threat: <Highlight>No Control</Highlight>
        </>,
      ]}
    />
  </SceneFrame>
);
