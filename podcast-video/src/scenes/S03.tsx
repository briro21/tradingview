import React from "react";
import { Beat, useAt } from "../components/Beats";
import { BulletPoints } from "../components/BulletPoints";
import { Highlight } from "../components/Highlight";

const Points: React.FC = () => {
  const at = useAt();
  return (
    <BulletPoints
      delays={[4, at("symptom"), at("physically incapable")]}
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
  );
};

// Transition 1
export const S03: Beat[] = [{ at: "But a world without work", v: <Points /> }];
