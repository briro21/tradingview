import { Beat } from "../board/Board";
import { H, I, T } from "../board/dsl";
import { theme } from "../theme";

// Transition 2
export const S05: Beat[] = [
  { at: "So, if we are barreling", items: [I("robot", 500, 400, 2.2), I("dog", 1150, 500, 1.4, { at: "household pets" }), H("...and we are the pets", 1150, 760)] },
  { at: "how do we make sense", items: [T("WHAT IS REAL?", 800, 380, { size: 170, color: theme.red }), I("question", 800, 700, 0.9)] },
  { at: "What Dr. Yampolskiy", items: [I("person", 450, 420, 1.8), I("bulb", 450, 150, 0.7), H("Dr. Yampolskiy revealed...", 1100, 380)] },
  {
    at: "our reality",
    items: [
      I("eye", 300, 380, 1.2),
      H("reality", 300, 600),
      I("temple", 800, 380, 1.3, { at: "our religions" }),
      H("religion", 800, 600),
      I("planet", 1300, 380, 1.3, { at: "fabric of the universe" }),
      H("the universe", 1300, 600),
    ],
  },
];
