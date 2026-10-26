import { Beat } from "../board/Board";
import { A, H, I, O, T } from "../board/dsl";
import { theme } from "../theme";

// Outro
export const S07: Beat[] = [
  { at: "Ultimately", items: [I("money", 400, 380, 1.6), I("coin", 400, 600, 0.9), A(600, 420, 900, 420), I("alien", 1150, 420, 2, { at: "alien intelligence" })] },
  {
    at: "either liberate us",
    items: [I("heart", 400, 360, 1.5), T("LIBERATION", 400, 620, { size: 80, color: theme.green }), T("or", 800, 420, { size: 80 }), I("skull", 1200, 360, 1.5, { at: "erase our reality" }), T("ERASURE", 1200, 620, { size: 80, color: theme.red })],
  },
  { at: "and we have a rapidly", items: [I("hourglass", 450, 420, 2), H("which future", 1100, 330), T("DO WE WANT?", 1100, 480, { size: 100, color: theme.purple })] },
  {
    at: "If you want to stay",
    items: [
      H("stay ahead of the curve", 800, 150, { size: 80 }),
      I("play", 600, 430, 1.8, { at: "subscribe button" }),
      T("SUBSCRIBE", 1100, 430, { size: 100, color: theme.red }),
      I("bell", 1100, 680, 0.9),
      O(1100, 430, 330, 100, theme.blue, { at: "right now" }),
    ],
  },
];
