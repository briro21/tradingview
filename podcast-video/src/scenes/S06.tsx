import React from "react";
import { Beat } from "../components/Beats";
import { Accelerate, Chapter, Converge, Counter, Glitch, Kinetic, SimGrid, StrikeList } from "../components/visuals";

// Insight 3: The Simulation
export const S06: Beat[] = [
  { at: "Think about the video games", v: <Chapter num="03" title="THE *SIMULATION*" />, sfx: "impact" },
  { at: "We can already generate", v: <Kinetic lines={["ENTIRE *3D WORLDS*", "FROM ONE PROMPT"]} /> },
  { at: "Now, fast forward", v: <Accelerate items={["+10 YEARS", "+20 YEARS", "+30 YEARS"]} /> },
  { at: "Imagine a superintelligent", v: <Kinetic lines={["SIMULATING REALITY", "DOWN TO THE *ATOM*"]} step={6} /> },
  { at: "with perfect physics", v: <Kinetic lines={["PERFECT *PHYSICS*", "PERFECT *HAPTICS*", "PERFECT *MEMORY*"]} step={14} max={120} /> },
  { at: "The exact moment", v: <Counter to={10} prefix="$" label="TO RUN A PLANETARY SIMULATION" duration={25} /> },
  { at: "future civilizations", v: <SimGrid label="BILLIONS OF SIMULATIONS" /> },
  { at: "They will run them", v: <Kinetic lines={["RESEARCH.", "ENTERTAINMENT.", "*EXPERIMENT.*"]} step={10} max={120} /> },
  { at: "Statistically speaking", v: <SimGrid odds label="ODDS YOU LIVE IN BASE REALITY" /> },
  { at: "We are almost certainly", v: <Glitch text="YOU ARE IN A SIMULATION" />, sfx: "impact" },
  { at: "And if you look closely", v: <Kinetic lines={["HISTORY KNEW", "*ALL ALONG*"]} /> },
  { at: "If you strip away", v: <StrikeList items={["TRADITIONS", "DIETARY RULES", "POLITICS"]} stamp="STRIPPED" gap={25} /> },
  { at: "they all point", v: <Kinetic lines={["ONE *UNSHAKEABLE*", "TRUTH"]} /> },
  { at: "A superintelligent creator", v: <Kinetic lines={["A *CREATOR*.", "A TEST WORLD.", "RULES & *CONSEQUENCES*."]} step={30} max={110} /> },
  { at: "For the very first time", v: <Converge left="SCIENCE" right="SCRIPTURE" result="THE SAME CODE" />, sfx: "impact" },
];
