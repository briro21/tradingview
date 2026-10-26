import { Beat } from "../board/Board";
import { A, H, I, N, O, T, X } from "../board/dsl";
import { theme } from "../theme";

const { red, blue, purple } = theme;

// Shorts (panel vertikal 1000×1300, pusat x=500): teaser untuk penonton The Diary Of A CEO.
export const SH01: Beat[] = [
  {
    at: "Steven Bartlett sat down",
    items: [
      I("person", 280, 380, 1.5),
      I("person", 720, 380, 1.5, { at: "AI safety expert" }),
      T("AI SAFETY EXPERT", 500, 760, { size: 85, color: blue }),
      H("Dr. Roman Yampolskiy", 500, 900, { size: 80, at: "Roman" }),
    ],
  },
  { at: "genuinely terrifying", items: [I("skull", 500, 500, 2.6), T("TERRIFYING", 500, 980, { size: 130, color: red })] },
  {
    at: "By 2027",
    items: [
      N(2027, 500, 300, { from: 2024, plain: true, size: 230, color: red }),
      I("brain", 260, 720, 1.3),
      A(420, 720, 580, 720),
      I("robot", 740, 720, 1.3),
      H("almost every cognitive task", 500, 1000, { size: 70 }),
    ],
  },
  { at: "By 2030", items: [N(2030, 500, 300, { from: 2027, plain: true, size: 230, color: red }), I("robot", 500, 760, 2.4), H("humanoid robots", 500, 1080, { size: 80 })] },
  {
    at: "Plumbers, builders, chefs",
    items: [I("wrench", 500, 220, 1.2), I("hammer", 500, 560, 1.2, { at: "builders" }), I("chef", 500, 900, 1.2, { at: "chefs" })],
  },
  {
    at: "Retraining",
    items: [T("\"RETRAINING\"", 500, 380, { size: 120 }), T("= A MYTH", 500, 600, { size: 140, color: red, at: "myth" }), I("book", 500, 950, 1.5)],
  },
  { at: "And it gets worse", items: [T("IT GETS", 500, 520, { size: 150 }), T("WORSE", 500, 720, { size: 190, color: red })] },
  {
    at: "You cannot just pull",
    items: [I("plug", 500, 450, 2.4), X(500, 470, 200, { at: "superintelligence" }), H("you can't pull the plug", 500, 950, { size: 80 })],
  },
  { at: "It will predict", items: [I("robot", 500, 480, 2.6), T("IT DISABLES", 500, 920, { size: 110, color: red, at: "disable" }), T("YOU FIRST", 500, 1060, { size: 110, color: red })] },
  {
    at: "Then he goes even further",
    items: [I("monitor", 500, 480, 3.2), I("person", 500, 440, 0.8), T("A SIMULATION", 500, 1000, { size: 120, color: purple, at: "simulation" })],
  },
  {
    at: "I turned this entire",
    items: [I("play", 500, 400, 2.6), T("7-MINUTE", 500, 800, { size: 130, color: red, at: "seven-minute" }), H("animated summary", 500, 960, { size: 90 })],
  },
  {
    at: "Watch the full breakdown",
    items: [
      T("FULL VIDEO", 500, 260, { size: 130 }),
      H("on my channel", 500, 420, { size: 90, at: "on my channel" }),
      I("bell", 500, 780, 1.8, { at: "subscribe" }),
      O(500, 780, 230, 230, red),
    ],
  },
];
