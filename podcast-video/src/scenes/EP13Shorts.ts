import { Beat } from "../board/Board";
import { A, H, I, O, P, T } from "../board/dsl";
import { theme } from "../theme";

const { red } = theme;

// Short for Episode 13 (Damodaran's $77 Anthropic, Prof G Markets), vertical panel 1000x1300, centre x=500.
// Photo: Aswath Damodaran, ICAI Singapore Chapter, CC BY 3.0.

const DAM = "thumbs/photo_damodaran.png";

/** $77 vs $83 vs $79 in 20 seconds. */
export const SH29: Beat[] = [
  { at: "Aswath Damodaran said one", drawn: true, items: [P(DAM, 500, 380, 460, 600), T("WORTH $77", 500, 820, { size: 130, color: red }), H("per share of Anthropic", 500, 960, { size: 70 })] },
  { at: "The IPO priced at", items: [I("chart", 500, 330, 2.2), T("IPO: $83", 500, 620, { size: 130, at: "$83" }), T("NOW: ~$79", 500, 780, { size: 130, color: red, at: "$79" })] },
  { at: "His one number to", items: [I("magnifier", 500, 330, 2.2), T("WATCH: REVENUE", 500, 620, { size: 110 }), H("it must roughly double every year", 500, 780, { size: 64, at: "double every year" }), T("OR IT FALLS APART", 500, 930, { size: 96, color: red, at: "falls apart" })] },
  {
    at: "The full breakdown is",
    items: [T("1 HR", 500, 230, { size: 120 }), A(500, 320, 500, 420, red), T("8 MIN", 500, 520, { size: 140, color: red }), H("the $77 math, animated", 500, 660, { size: 70 }), I("bell", 500, 900, 1.6), O(500, 900, 210, 210, red)],
  },
];
