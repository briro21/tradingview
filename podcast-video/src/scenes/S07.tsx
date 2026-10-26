import React from "react";
import { Beat } from "../components/Beats";
import { Kinetic, Subscribe, Versus } from "../components/visuals";

// Outro
export const S07: Beat[] = [
  { at: "Ultimately", v: <Kinetic lines={["BILLIONS OF DOLLARS", "INTO *ALIEN INTELLIGENCE*"]} step={5} /> },
  { at: "either liberate us", v: <Versus leftLabel="FUTURE A" left="LIBERATION" rightLabel="FUTURE B" right="ERASURE" rightAt={70} /> },
  { at: "and we have a rapidly", v: <Kinetic lines={["WHICH FUTURE", "DO WE *WANT*?"]} /> },
  { at: "If you want to stay", v: <Subscribe clickAt="subscribe button" />, sfx: "impact" },
];
