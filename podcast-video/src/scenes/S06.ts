import { Beat } from "../board/Board";
import { A, H, I, N, O, T, U, X } from "../board/dsl";
import { theme } from "../theme";

const { red, blue, green, purple } = theme;

// Insight 3: The Simulation
export const S06: Beat[] = [
  {
    at: "Think about the video games",
    items: [T("INSIGHT 03", 800, 220, { size: 70, color: blue }), T("THE SIMULATION", 800, 400, { size: 130 }), U(800, 490, 900, red), I("gamepad", 800, 680, 1)],
  },
  {
    at: "We can already generate",
    items: [I("gamepad", 350, 420, 1.6), A(550, 420, 850, 420), I("planet", 1100, 420, 2, { at: "three-dimensional worlds" }), H("whole 3D worlds from one prompt", 800, 760)],
  },
  { at: "Now, fast forward", items: [I("rocket", 400, 420, 2), T("FAST FORWARD", 1050, 340, { size: 100 }), H("a few decades...", 1050, 480)] },
  { at: "Imagine a superintelligent", items: [I("atom", 450, 420, 2.2), H("simulating reality", 1100, 330), T("DOWN TO THE ATOM", 1100, 480, { size: 70, color: purple })] },
  {
    at: "with perfect physics",
    items: [
      I("atom", 300, 380, 1.2),
      H("perfect physics", 300, 600),
      I("hand", 800, 380, 1.2, { at: "haptics" }),
      H("perfect haptics", 800, 600),
      I("brain", 1300, 380, 1.2, { at: "perfect memory" }),
      H("perfect memory", 1300, 600),
    ],
  },
  { at: "The exact moment", items: [I("money", 450, 420, 2), N(10, 1100, 320, { prefix: "$", size: 200, color: green }), H("per planetary simulation", 1100, 540)] },
  {
    at: "future civilizations",
    items: [
      I("monitor", 300, 300, 1),
      I("monitor", 650, 300, 1),
      I("monitor", 1000, 300, 1),
      I("monitor", 1350, 300, 1),
      I("monitor", 475, 560, 1),
      I("monitor", 825, 560, 1),
      I("monitor", 1175, 560, 1),
      T("BILLIONS OF SIMULATIONS", 800, 790, { size: 70, color: red, at: "billions of" }),
    ],
  },
  {
    at: "They will run them",
    items: [I("flask", 300, 380, 1.2), H("research", 300, 600), I("gamepad", 800, 380, 1.2, { at: "entertainment" }), H("fun", 800, 600), I("dice", 1300, 380, 1.2, { at: "algorithmic experiment" }), H("experiment", 1300, 600)],
  },
  {
    at: "Statistically speaking",
    items: [
      I("monitor", 300, 280, 0.8),
      I("monitor", 550, 280, 0.8),
      I("monitor", 800, 280, 0.8),
      I("monitor", 1050, 280, 0.8),
      I("globe", 1300, 280, 0.9, { at: "base reality" }),
      O(1300, 280, 120, 120, red),
      T("1 in", 560, 580, { size: 120, at: "roughly one in" }),
      N(1_000_000_000, 1050, 580, { from: 1, size: 110, color: red }),
    ],
  },
  { at: "We are almost certainly", items: [I("monitor", 800, 330, 2.6), I("person", 800, 300, 0.6), T("YOU ARE IN IT", 800, 720, { size: 110, color: red })] },
  { at: "And if you look closely", items: [I("scroll", 450, 420, 2), I("magnifier", 600, 520, 1), H("history knew all along", 1100, 420)] },
  {
    at: "If you strip away",
    items: [
      H("traditions", 800, 200, { size: 80 }),
      X(800, 200, 70, { at: "the specific dietary" }),
      H("dietary rules", 800, 380, { size: 80 }),
      X(800, 380, 70, { at: "the regional politics" }),
      H("politics", 800, 560, { size: 80 }),
      X(800, 560, 70, { at: "from every major" }),
      I("temple", 1350, 380, 1.2),
    ],
  },
  { at: "they all point", items: [I("arrowUp", 400, 420, 1.6), T("ONE TRUTH", 1050, 400, { size: 140, color: purple }), U(1050, 500, 600, red)] },
  {
    at: "A superintelligent creator",
    items: [
      I("god", 280, 300, 1.2),
      H("a creator", 280, 520),
      I("globe", 650, 300, 1.2, { at: "secondary world" }),
      H("a test world", 650, 520),
      I("eye", 1000, 300, 1.2, { at: "monitors our behavior" }),
      H("monitoring", 1000, 520),
      I("book", 1350, 300, 1.2, { at: "rules and consequences" }),
      H("rules", 1350, 520),
    ],
  },
  {
    at: "For the very first time",
    items: [
      I("atom", 350, 360, 1.5),
      H("science", 350, 600),
      I("scroll", 1250, 360, 1.5, { at: "ancient texts" }),
      H("scripture", 1250, 600),
      A(500, 380, 700, 470, red),
      A(1100, 380, 900, 470, red, { bend: -0.2 }),
      T("THE SAME CODE", 800, 520, { size: 90, color: purple, at: "exact same code" }),
    ],
  },
];
