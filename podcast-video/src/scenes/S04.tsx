import React from "react";
import { Beat } from "../components/Beats";
import {
  Accelerate,
  BlackBox,
  Chapter,
  CodeRain,
  GapChart,
  Glitch,
  Kinetic,
  Orbit,
  PowerButton,
  Versus,
} from "../components/visuals";

// Insight 2: The Control Problem
export const S04: Beat[] = [
  { at: "Most of us falsely", v: <Chapter num="02" title="THE *CONTROL* PROBLEM" />, sfx: "impact" },
  { at: "If an AI goes rogue", v: <PowerButton label="JUST PULL THE PLUG?" /> },
  { at: "Wrong", v: <Glitch text="WRONG." max={260} />, sfx: "impact" },
  { at: "is like telling someone", v: <Kinetic lines={["TURN OFF A *VIRUS*?", "SHUT DOWN *BITCOIN*?"]} step={6} /> },
  { at: "It is physically impossible", v: <Glitch text="IMPOSSIBLE" max={240} /> },
  { at: "These systems are distributed", v: <Kinetic lines={["DISTRIBUTED.", "BACKED UP.", "*SMARTER THAN US.*"]} step={9} max={120} /> },
  { at: "They will predict", v: <Glitch text="ACCESS DENIED" label="IT DISABLES YOU FIRST" />, sfx: "impact" },
  {
    at: "Right now, AI development",
    v: <Versus leftLabel="NOT" left="Software Engineering" rightLabel="MORE LIKE" right="Growing Alien Biology" rightAt={75} />,
  },
  { at: "They are feeding massive", v: <CodeRain text="FEED. GROW. TEST." label="FIGURE OUT WHAT IT CAN DO" /> },
  { at: "They are running blind", v: <BlackBox label="BLIND EXPERIMENTS ON A BLACK BOX" /> },
  { at: "To stop bad behavior", v: <Kinetic lines={["THE FIX?", "AN *HR MANUAL*"]} step={7} /> },
  { at: "But a superintelligent system", v: <Glitch text="WORKAROUND FOUND" />, sfx: "impact" },
  { at: "While AI capabilities", v: <GapChart /> },
  { at: "The gap between", v: <Kinetic lines={["THE GAP WIDENS", "*EVERY SECOND*"]} step={6} /> },
  { at: "We are rapidly approaching", v: <Orbit core="SINGULARITY" label="THE POINT OF NO RETURN" /> },
  {
    at: "improves its own code",
    v: <Accelerate items={["EVERY HOUR", "EVERY MINUTE", "EVERY SECOND"]} ats={["improves", "every minute", "every second"]} />,
  },
  { at: "Trying to predict", v: <Versus leftLabel="US" left="French Bulldog" rightLabel="IT" right="Superintelligence" rightAt={60} /> },
  { at: "The cognitive gap", v: <Kinetic lines={["THE GAP IS", "*TOO MASSIVE*"]} /> },
  { at: "We are creating a digital god", v: <Orbit core="DIGITAL GOD" label="NO PROVEN WAY TO KEEP US ALIVE" />, sfx: "impact" },
];
