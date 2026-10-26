import { Beat } from "../board/Board";
import { A, H, I, O, S, T, U } from "../board/dsl";
import { theme } from "../theme";

const { red, blue, green, purple } = theme;

// Insight 2: The Control Problem
export const S04: Beat[] = [
  {
    at: "Most of us falsely",
    items: [T("INSIGHT 02", 800, 220, { size: 70, color: blue }), T("THE CONTROL PROBLEM", 800, 400, { size: 110 }), U(800, 480, 1000, red), I("lock", 800, 680, 1)],
  },
  {
    at: "If an AI goes rogue",
    items: [I("robot", 450, 420, 2), I("plug", 1100, 380, 1.7, { at: "pull the plug" }), H("just pull the plug?", 1100, 680)],
  },
  { at: "Wrong", items: [T("WRONG!", 800, 400, { size: 250, color: red }), U(800, 540, 900, red)] },
  {
    at: "is like telling someone",
    items: [I("virus", 450, 380, 1.8), H("turn off a virus?", 450, 650), I("bitcoin", 1150, 380, 1.8, { at: "Bitcoin" }), H("shut down bitcoin?", 1150, 650)],
  },
  { at: "It is physically impossible", items: [T("IMPOSSIBLE", 800, 400, { size: 170, color: red }), O(800, 400, 560, 130, red)] },
  {
    at: "These systems are distributed",
    items: [
      I("network", 400, 400, 2),
      H("distributed", 1100, 230),
      H("backed up", 1100, 360, { at: "backed up" }),
      T("SMARTER THAN US", 1100, 520, { size: 80, color: red, at: "vastly smarter" }),
    ],
  },
  {
    at: "They will predict",
    items: [I("power", 450, 400, 2), I("robot", 1100, 400, 1.8, { at: "disable you" }), T("IT DISABLES YOU FIRST", 800, 760, { size: 80, color: red })],
  },
  {
    at: "Right now, AI development",
    items: [I("code", 400, 360, 1.6), H("software engineering", 400, 620), S(400, 620, 500, { at: "it is more like" }), I("alien", 1150, 360, 1.7, { at: "alien biology" }), T("ALIEN BIOLOGY", 1150, 620, { size: 70, color: green })],
  },
  {
    at: "They are feeding massive",
    items: [
      I("server", 300, 400, 1.4),
      H("feed", 300, 640),
      A(450, 400, 620, 400),
      I("sprout", 800, 400, 1.4, { at: "waiting for it to grow" }),
      H("grow", 800, 640),
      A(970, 400, 1140, 400),
      I("flask", 1300, 400, 1.4, { at: "experimenting" }),
      H("experiment", 1300, 640),
    ],
  },
  {
    at: "They are running blind",
    items: [I("box", 800, 380, 2.4), T("BLACK BOX", 800, 720, { size: 110, color: purple })],
  },
  {
    at: "To stop bad behavior",
    items: [I("robot", 450, 420, 1.9), I("book", 1100, 360, 1.5, { at: "HR manual" }), H("the HR manual", 1100, 580), H("\"please don't swear\"", 1100, 700, { at: "not to swear", color: blue })],
  },
  {
    at: "But a superintelligent system",
    items: [I("robot", 450, 420, 1.9), A(650, 300, 1000, 300, green, { bend: -0.35 }), T("WORKAROUND", 1150, 450, { size: 100, color: red }), I("lock", 1150, 650, 0.8)],
  },
  {
    at: "While AI capabilities",
    items: [
      { k: "path", d: "M150 780 L150 120 M150 780 L1450 780", color: theme.ink, w: 1 },
      { k: "path", d: "M160 760 C700 760 1000 700 1200 450 C1300 320 1360 200 1400 120", color: red, w: 1.4 },
      T("AI CAPABILITY", 1100, 200, { size: 60, color: red }),
      { k: "path", d: "M160 760 C600 750 1000 740 1400 720", color: blue, w: 1.4, at: "progress in AI safety" },
      T("AI SAFETY", 1200, 660, { size: 60, color: blue }),
    ],
  },
  {
    at: "The gap between",
    items: [
      { k: "path", d: "M160 760 C700 760 1000 700 1200 450 C1300 320 1360 200 1400 120", color: red, w: 1.4, dur: 8 },
      { k: "path", d: "M160 760 C600 750 1000 740 1400 720", color: blue, w: 1.4, dur: 8 },
      A(1420, 700, 1420, 160, purple, { bend: 0 }),
      T("THE GAP", 1050, 420, { size: 110, color: purple }),
      H("wider every second", 1050, 540),
    ],
  },
  {
    at: "We are rapidly approaching",
    items: [I("rocket", 400, 400, 2), T("THE SINGULARITY", 1050, 330, { size: 90, color: purple }), H("point of no return", 1050, 480)],
  },
  {
    at: "improves its own code",
    items: [
      I("clock", 300, 400, 1.3),
      H("every hour", 300, 640, { at: "every hour" }),
      I("clock", 800, 400, 1.3, { at: "every minute" }),
      H("every minute", 800, 640),
      I("clock", 1300, 400, 1.3, { at: "every second" }),
      H("every second!", 1300, 640, { color: red }),
    ],
  },
  {
    at: "Trying to predict",
    items: [I("dog", 400, 430, 2), I("question", 600, 220, 0.8), I("robot", 1150, 430, 2.2, { at: "superintelligence" }), H("why is its owner hosting a podcast?", 800, 790, { at: "hosting a podcast" })],
  },
  {
    at: "The cognitive gap",
    items: [I("dog", 300, 600, 0.8), I("brain", 1250, 330, 2.2), A(450, 560, 1000, 380, purple), T("TOO MASSIVE", 650, 220, { size: 100, color: red })],
  },
  {
    at: "We are creating a digital god",
    items: [I("god", 800, 330, 2.4), T("A DIGITAL GOD", 800, 650, { size: 110, color: purple }), H("no proven way to keep us alive", 800, 780, { at: "no proven" })],
  },
];
