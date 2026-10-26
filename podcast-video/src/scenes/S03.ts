import { Beat } from "../board/Board";
import { H, I, O, T } from "../board/dsl";
import { theme } from "../theme";

// Transition 1
export const S03: Beat[] = [
  {
    at: "But a world without work",
    items: [
      T("1. A World Without Work", 800, 200, { size: 80 }),
      T("2. Just a Symptom", 800, 380, { size: 80, color: theme.blue, at: "symptom" }),
      T("3. No Control", 800, 560, { size: 90, color: theme.red, at: "physically incapable" }),
      O(800, 560, 380, 85, theme.red),
      I("warning", 1380, 560, 0.8),
      H("they can't control it", 800, 760),
    ],
  },
];
