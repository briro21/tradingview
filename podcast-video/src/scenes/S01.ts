import { Beat } from "../board/Board";
import { A, H, I, N, O, T, U, X } from "../board/dsl";
import { theme } from "../theme";

const { red, blue, green, orange, purple } = theme;

// Hook
export const S01: Beat[] = [
  {
    at: "Right now",
    items: [
      I("person", 330, 420, 1.3),
      I("brain", 330, 160, 0.8),
      T("THE SMARTEST", 1050, 200, { size: 96 }),
      T("ENGINEERS", 1050, 320, { size: 110, color: blue }),
      I("dice", 1050, 560, 1.1, { at: "gambling" }),
      H("...are gambling", 1050, 760, { size: 70 }),
    ],
  },
  {
    at: "eight billion people",
    items: [
      I("globe", 800, 330, 1.7),
      N(8_000_000_000, 800, 680, { size: 120, color: red }),
      H("lives at stake", 800, 800),
    ],
  },
  {
    at: "to win a race",
    items: [
      I("car", 350, 380, 1.6),
      A(600, 400, 1000, 400, theme.ink, { bend: 0 }),
      I("question", 1250, 380, 1.4),
      T("A RACE", 800, 160, { size: 110, color: orange }),
      H("they don't even understand", 800, 720, { at: "do not even" }),
    ],
  },
  {
    at: "We are constantly told",
    items: [
      I("hand", 380, 420, 1.6),
      T("\"JUST A TOOL\"", 1050, 300, { size: 110 }),
      H("a helpful, benign assistant", 1050, 460, { at: "helpful" }),
      U(1050, 380, 620, green),
    ],
  },
  {
    at: "cure diseases",
    items: [
      I("flask", 300, 360, 1.3),
      H("cure diseases", 300, 620),
      I("book", 800, 360, 1.3, { at: "write our emails" }),
      H("write emails", 800, 620),
      I("chart", 1300, 360, 1.3, { at: "boost the stock" }),
      H("boost the market", 1300, 620),
    ],
  },
  {
    at: "But behind closed doors",
    items: [
      I("house", 450, 420, 2),
      I("eye", 450, 470, 0.5),
      T("BEHIND CLOSED", 1100, 330, { size: 90 }),
      T("DOORS", 1100, 450, { size: 120, color: red }),
      H("deeply unsettling...", 1100, 620, { at: "deeply unsettling" }),
    ],
  },
  {
    at: "In less than three years",
    items: [
      I("hourglass", 400, 420, 2),
      N(3, 1050, 300, { size: 220, color: red, dur: 12 }),
      T("YEARS", 1050, 470, { size: 100 }),
      H("to make human labor obsolete", 800, 760, { at: "make the very concept" }),
    ],
  },
  {
    at: "And the creators",
    items: [
      I("cliff", 1100, 480, 2.6),
      I("crowd", 450, 440, 1.6),
      A(620, 560, 950, 360, red),
      T("COMPLETELY BLIND", 800, 140, { size: 96, color: red, at: "completely blind" }),
    ],
  },
  {
    at: "Mass unemployment",
    items: [
      I("iceberg", 800, 430, 2.8),
      T("MASS UNEMPLOYMENT", 800, 120, { size: 90 }),
      H("...just the tip", 1250, 300, { at: "tip of the" }),
      A(1200, 330, 900, 360, blue),
    ],
  },
  {
    at: "What is truly terrifying",
    items: [
      I("robot", 380, 420, 2),
      I("code", 1050, 300, 1.4, { at: "write its own code" }),
      T("WRITES ITS OWN CODE", 1050, 520, { size: 70, color: purple }),
      I("crown", 380, 140, 0.8, { at: "outgrows" }),
    ],
  },
  {
    at: "escapes our control forever",
    items: [
      I("lock", 500, 420, 2),
      X(500, 440, 120),
      T("OUT OF", 1100, 330, { size: 110 }),
      T("CONTROL", 1100, 460, { size: 130, color: red }),
      O(1100, 460, 300, 90, red),
    ],
  },
];
