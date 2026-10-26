import React from "react";
import { Beat } from "../components/Beats";
import { Glitch, Kinetic } from "../components/visuals";

// Transition 2
export const S05: Beat[] = [
  { at: "So, if we are barreling", v: <Kinetic lines={["AN *UNCONTROLLABLE*", "FUTURE"]} /> },
  { at: "household pets", v: <Kinetic lines={["WE BECOME", "THE *PETS*"]} step={6} /> },
  { at: "how do we make sense", v: <Glitch text="WHAT IS REAL?" max={200} />, sfx: "impact" },
  { at: "What Dr. Yampolskiy", v: <Kinetic lines={["DR. YAMPOLSKIY'S", "*REVELATION*"]} /> },
  { at: "our reality", v: <Kinetic lines={["REALITY.", "RELIGION.", "*THE UNIVERSE.*"]} step={10} max={120} /> },
];
