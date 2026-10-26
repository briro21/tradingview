import { Beat } from "../board/Board";
import { A, H, I, N, O, S, T, U, X } from "../board/dsl";
import { theme } from "../theme";

const { red, blue, green, orange, purple } = theme;

// Insight 1: The End of Work
export const S02: Beat[] = [
  {
    at: "We have always been",
    items: [T("INSIGHT 01", 800, 220, { size: 70, color: blue }), T("THE END OF WORK", 800, 400, { size: 130 }), U(800, 490, 900, red), I("briefcase", 800, 680, 1)],
  },
  {
    at: "new technology simply creates",
    items: [I("gear", 400, 400, 1.6), T("+", 800, 400, { size: 140 }), I("briefcase", 1200, 400, 1.6), H("new tech = new jobs?", 800, 720)],
  },
  {
    at: "When we invented the wheel",
    items: [
      I("wheel", 300, 360, 1.4),
      H("cart drivers", 300, 600),
      A(470, 360, 650, 360),
      I("factory", 800, 360, 1.4, { at: "Industrial Revolution" }),
      H("factory workers", 800, 600),
      A(970, 360, 1150, 360),
      I("question", 1300, 360, 1.4, { at: "But Artificial General" }),
      T("AGI", 1300, 600, { size: 90, color: red }),
    ],
  },
  {
    at: "shatters this historical",
    items: [I("shieldBroken", 450, 420, 2.2), T("SAFETY NET", 1100, 340, { size: 100 }), T("SHATTERED", 1100, 470, { size: 110, color: red })],
  },
  {
    at: "We are no longer",
    items: [
      T("A NEW TOOL?", 800, 260, { size: 130, color: blue }),
      S(800, 260, 900, { at: "a new inventor" }),
      T("A NEW INVENTOR", 800, 470, { size: 130 }),
      I("bulb", 800, 700, 0.9),
    ],
  },
  {
    at: "We are building a replacement",
    items: [I("brain", 450, 420, 2), A(700, 420, 950, 420, red), I("robot", 1200, 420, 2), H("a replacement for the human mind", 800, 780)],
  },
  {
    at: "By the year 2027",
    items: [N(2027, 800, 300, { from: 2024, plain: true, size: 200, color: red }), H("almost every cognitive task... replaced", 800, 520), I("brain", 500, 700, 0.8), I("chip", 1100, 700, 0.8)],
  },
  {
    at: "Just three years ago",
    items: [
      H("3 years ago", 400, 180),
      T("123 × 456 = ?", 400, 400, { size: 70 }),
      X(400, 400, 90, { wait: 4 }),
      H("today", 1200, 180, { at: "Today" }),
      I("crown", 1200, 380, 1.4),
      H("math olympiad winner", 1200, 600, { color: green }),
    ],
  },
  {
    at: "By 2030",
    items: [N(2030, 800, 200, { from: 2027, plain: true, size: 150, color: red }), I("robot", 500, 530, 1.7), I("lightning", 800, 520, 1), I("brain", 1100, 530, 1.5), H("humanoid robots + super-brains", 800, 790)],
  },
  {
    at: "Plumbers, builders, chefs",
    items: [
      I("wrench", 330, 380, 1.4),
      I("hammer", 800, 380, 1.4, { at: "builders" }),
      I("chef", 1270, 380, 1.4, { at: "chefs" }),
      T("ALL AUTOMATED", 800, 680, { size: 110, color: red, at: "all automated" }),
    ],
  },
  {
    at: "It genuinely does not matter",
    items: [
      I("car", 330, 360, 1.3, { at: "Uber driver" }),
      H("uber driver", 330, 560),
      I("gradcap", 800, 360, 1.3, { at: "professor" }),
      H("professor", 800, 560),
      I("monitor", 1270, 360, 1.3, { at: "digital creator" }),
      H("creator", 1270, 560),
      T("NO EXCEPTIONS", 800, 740, { size: 90, color: red }),
    ],
  },
  {
    at: "The idea of",
    items: [I("book", 450, 420, 2), T("\"RETRAINING\"", 1100, 340, { size: 100 }), T("= A MYTH", 1100, 480, { size: 110, color: red, at: "complete myth" })],
  },
  {
    at: "There is no",
    items: [T("PLAN B", 800, 400, { size: 220 }), X(800, 400, 260), H("nothing to fall back on", 800, 700)],
  },
  {
    at: "better, faster",
    items: [
      I("robot", 400, 420, 2),
      T("BETTER", 1100, 230, { size: 100 }),
      T("FASTER", 1100, 400, { size: 100, at: "faster" }),
      T("CHEAPER", 1100, 570, { size: 110, color: red, at: "cheaper" }),
    ],
  },
  {
    at: "Sure, maybe a billionaire",
    items: [I("money", 400, 350, 1.8), I("person", 400, 620, 0.9), H("a human accountant...", 1100, 300), T("NOSTALGIC NOVELTY", 1100, 460, { size: 70, color: purple, at: "nostalgic novelty" })],
  },
  {
    at: "like buying a handmade",
    items: [I("hand", 450, 400, 1.6), H("handmade", 450, 650), T("vs", 800, 400, { size: 100, color: red }), I("factory", 1150, 400, 1.6, { at: "mass-produced" }), H("mass-produced", 1150, 650)],
  },
  {
    at: "but for 99%",
    items: [I("crowd", 450, 420, 2.4), N(99, 1100, 330, { suffix: "%", size: 200, color: red }), H("of humanity: no job market", 1100, 560)],
  },
  {
    at: "We are hurtling toward",
    items: [I("server", 400, 400, 1.5), H("infinite digital labor", 400, 680, { at: "infinite digital" }), I("coin", 1150, 330, 1.3, { at: "extreme wealth" }), I("money", 1150, 520, 1.2), H("extreme abundance", 1150, 680)],
  },
  {
    at: "but it forces",
    items: [I("question", 800, 380, 2.4), T("THE EXISTENTIAL QUESTION", 800, 720, { size: 80, color: purple })],
  },
  {
    at: "What do you do",
    items: [I("sofa", 450, 440, 2), N(80, 1100, 320, { size: 200, color: orange }), H("extra hours every week", 1100, 520)],
  },
  {
    at: "absolutely no economic purpose",
    items: [I("person", 800, 380, 1.8), T("NO PURPOSE?", 800, 720, { size: 120, color: red }), O(800, 720, 420, 90, blue)],
  },
];
