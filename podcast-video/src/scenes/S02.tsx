import React from "react";
import { Beat, useAt } from "../components/Beats";
import { MorphText } from "../components/MorphText";
import { Chapter, Counter, Glitch, Kinetic, Orbit, StrikeList, Timeline, Versus } from "../components/visuals";
import { theme } from "../theme";

const ToolToInventor: React.FC = () => {
  const at = useAt();
  return (
    <MorphText from="A NEW TOOL?" to="A NEW INVENTOR" fromColor={theme.cyan} toColor={theme.white} switchAt={at("a new inventor")} />
  );
};

// Insight 1: The End of Work
export const S02: Beat[] = [
  { at: "We have always been", v: <Chapter num="01" title="THE END OF *WORK*" />, sfx: "impact" },
  { at: "new technology simply creates", v: <Kinetic lines={["NEW TECH", "= NEW *JOBS*?"]} /> },
  {
    at: "When we invented the wheel",
    v: (
      <Timeline
        items={[
          { at: "wheel", top: "WHEEL", bottom: "Cart drivers" },
          { at: "Industrial Revolution", top: "INDUSTRY", bottom: "Factory workers" },
          { at: "But Artificial General", top: "AGI", bottom: "???" },
        ]}
      />
    ),
  },
  { at: "shatters this historical", v: <Glitch text="SAFETY NET: SHATTERED" />, sfx: "impact" },
  { at: "We are no longer", v: <ToolToInventor /> },
  { at: "We are building a replacement", v: <Orbit core="THE HUMAN MIND" label="BEING REPLACED" /> },
  { at: "By the year 2027", v: <Counter from={2024} to={2027} plain label="EVERY COGNITIVE TASK — REPLACEABLE" duration={30} /> },
  {
    at: "Just three years ago",
    v: <Versus leftLabel="3 YEARS AGO" left="3-digit math? FAIL" rightLabel="TODAY" right="Math Olympiad WINNER" rightAt={60} />,
  },
  { at: "By 2030", v: <Counter from={2027} to={2030} plain label="HUMANOID ROBOTS TAKE PHYSICAL LABOR" duration={30} /> },
  { at: "Plumbers, builders, chefs", v: <StrikeList items={["PLUMBERS", "BUILDERS", "CHEFS"]} stamp="AUTOMATED" gap={8} />, sfx: "impact" },
  { at: "It genuinely does not matter", v: <StrikeList items={["UBER DRIVER", "PROFESSOR", "DIGITAL CREATOR"]} stamp="NO EXCEPTIONS" gap={40} /> },
  { at: "The idea of", v: <Glitch text={"\"RETRAINING\""} label="IS A COMPLETE MYTH" /> },
  { at: "There is no", v: <Kinetic lines={["THERE IS", "NO *PLAN B*"]} step={6} /> },
  { at: "better, faster", v: <Kinetic lines={["BETTER.", "FASTER.", "*CHEAPER.*"]} step={10} max={140} /> },
  { at: "Sure, maybe a billionaire", v: <Kinetic lines={["HUMAN WORK =", "A *NOSTALGIC NOVELTY*"]} /> },
  { at: "like buying a handmade", v: <Versus left="Handmade Craft" right="Mass-Produced" rightAt={45} /> },
  { at: "but for 99%", v: <Counter to={99} suffix="%" label="OF HUMANITY — NO JOB MARKET" duration={35} />, sfx: "impact" },
  { at: "We are hurtling toward", v: <Kinetic lines={["INFINITE *DIGITAL* LABOR", "EXTREME *ABUNDANCE*"]} step={6} /> },
  { at: "but it forces", v: <Glitch text="THE EXISTENTIAL QUESTION" /> },
  { at: "What do you do", v: <Counter to={80} label="EXTRA HOURS EVERY WEEK" duration={40} /> },
  { at: "absolutely no economic purpose", v: <Kinetic lines={["AND NO", "*PURPOSE*?"]} step={8} max={170} /> },
];
