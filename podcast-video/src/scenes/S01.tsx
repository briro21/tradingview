import React from "react";
import { Beat } from "../components/Beats";
import { CodeRain, Counter, Glitch, Hero, Kinetic } from "../components/visuals";

// Hook
export const S01: Beat[] = [
  { at: "Right now", v: <Hero title={["THE *SMARTEST* ENGINEERS", "ARE GAMBLING"]} /> },
  { at: "eight billion people", v: <Counter to={8_000_000_000} label="LIVES AT STAKE" />, sfx: "impact" },
  { at: "to win a race", v: <Kinetic lines={["A *RACE*", "THEY DON'T UNDERSTAND"]} /> },
  { at: "We are constantly told", v: <Kinetic lines={["\"IT'S JUST", "A *TOOL*\""]} /> },
  { at: "cure diseases", v: <Kinetic lines={["CURE DISEASES", "WRITE EMAILS", "BOOST THE *MARKET*"]} step={8} max={110} /> },
  { at: "But behind closed doors", v: <Glitch text="BEHIND CLOSED DOORS" />, sfx: "impact" },
  { at: "In less than three years", v: <Counter to={3} suffix=" YEARS" label="UNTIL HUMAN LABOR IS OBSOLETE" duration={20} /> },
  { at: "make the very concept", v: <Kinetic lines={["HUMAN LABOR", "*OBSOLETE*"]} /> },
  { at: "And the creators", v: <Kinetic lines={["RUSHING TO THE EDGE", "*COMPLETELY BLIND*"]} /> },
  { at: "Mass unemployment", v: <Kinetic lines={["MASS UNEMPLOYMENT", "= TIP OF THE *ICEBERG*"]} /> },
  { at: "What is truly terrifying", v: <CodeRain text="IT WRITES ITS OWN CODE" label="AND OUTGROWS ITS MASTERS" /> },
  { at: "escapes our control forever", v: <Glitch text="OUT OF CONTROL" label="FOREVER" />, sfx: "impact" },
];
