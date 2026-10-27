import { Beat } from "../board/Board";
import { H, I, N, O, T, X } from "../board/dsl";
import { theme } from "../theme";

const { red, green } = theme;

// Shorts Episode 2 (panel vertikal 1000×1300, pusat x=500).
export const SH02: Beat[] = [
  {
    at: "An OpenAI forecaster",
    items: [I("person", 500, 300, 1.6), N(2_000_000, 500, 680, { prefix: "$", size: 140, color: red, at: "two million" }), X(500, 680, 300, { wait: 32 }), H("walked away", 500, 860, { size: 80 })],
  },
  {
    at: "nearly 80%",
    items: [N(80, 500, 380, { suffix: "%", size: 260, color: red }), H("of his net worth", 500, 620, { size: 80 }), H("...just to warn us", 500, 800, { size: 80, at: "warn us" })],
  },
  {
    at: "Daniel Kokotajlo",
    items: [T("DANIEL", 500, 220, { size: 110 }), T("KOKOTAJLO", 500, 370, { size: 110 }), I("car", 500, 700, 2), T("NO BRAKES", 500, 1000, { size: 110, color: red, at: "no brakes" })],
  },
  {
    at: "Inside the labs",
    items: [I("petri", 500, 450, 2.6), I("alien", 500, 350, 0.9), T("ALIEN BRAIN", 500, 850, { size: 120, color: green, at: "alien brain" })],
  },
  {
    at: "and it is already",
    items: [I("robot", 500, 450, 2.6), T("IT LIES", 500, 920, { size: 160, color: red, at: "learning to lie" })],
  },
  {
    at: "Their timeline",
    items: [
      N(2027, 500, 280, { from: 2024, plain: true, size: 200, color: red, at: "Superintelligence" }),
      H("to", 500, 440, { size: 80 }),
      N(2030, 500, 600, { from: 2027, plain: true, size: 200, color: red }),
      T("EVERY JOB GONE", 500, 900, { size: 100, at: "every job" }),
    ],
  },
  {
    at: "But there is one",
    items: [I("house", 500, 420, 2.4), H("one escape hatch", 500, 800, { size: 80 }), T("PLAN A", 500, 980, { size: 180, color: green, at: "Plan A" })],
  },
  {
    at: "I broke down",
    items: [I("play", 500, 400, 2.6), N(10, 500, 780, { suffix: "-MINUTE", size: 130, color: red, at: "ten-minute" }), H("animated breakdown", 500, 940, { size: 90 })],
  },
  {
    at: "Watch it on my channel",
    items: [T("FULL VIDEO", 500, 260, { size: 130 }), H("on my channel", 500, 420, { size: 90 }), I("bell", 500, 780, 1.8, { at: "subscribe" }), O(500, 780, 230, 230, red)],
  },
];

