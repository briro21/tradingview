import { Beat } from "../board/Board";
import { A, H, I, O, P, T } from "../board/dsl";
import { theme } from "../theme";

const { red } = theme;

// Short for Episode 12 (Bull vs Bear on the Anthropic IPO), vertical panel 1000x1300, centre x=500.
// Photos: Gary Marcus (Web Summit, CC BY 2.0), Aaron Levie (TechCrunch, CC BY 4.0).

const MARCUS = "thumbs/photo_marcus.png";
const LEVIE = "thumbs/photo_levie.png";

/** Marcus vs Levie in 30 seconds. */
export const SH27: Beat[] = [
  { at: "Gary Marcus says Anthropic", drawn: true, items: [P(MARCUS, 500, 380, 520, 576), T("BEAR:", 500, 800, { size: 120 }), T("EVER PROFITABLE?", 500, 950, { size: 104, color: red })] },
  { at: "Box CEO Aaron Levie says", items: [P(LEVIE, 500, 380, 460, 520), T("BULL:", 500, 800, { size: 120 }), T("WALLETS ARE VOTING", 500, 950, { size: 90, color: red, at: "voting with their wallets" })] },
  { at: "Marcus: growth fell from", items: [I("cliff", 500, 330, 2.2), T("147% → 47%", 500, 640, { size: 130, color: red, at: "47%" }), H("growth per quarter", 500, 800, { size: 66 })] },
  { at: "Levie: revenue went from", items: [I("rocket", 500, 330, 2.2), T("$1.4B → $17B", 500, 640, { size: 120, color: red, at: "$17 billion" }), H("revenue per quarter", 500, 800, { size: 66 })] },
  { at: "Both agree on one thing:", items: [I("scales", 500, 330, 2.2), T("IT ALL DEPENDS", 500, 620, { size: 110 }), T("ON GROWTH", 500, 770, { size: 130, color: red, at: "growth continues" })] },
  {
    at: "The full bull versus bear",
    items: [T("2 HRS", 500, 230, { size: 120 }), A(500, 320, 500, 420, red), T("8 MIN", 500, 520, { size: 140, color: red }), H("bull vs bear, animated", 500, 660, { size: 70 }), I("bell", 500, 900, 1.6), O(500, 900, 210, 210, red)],
  },
];
