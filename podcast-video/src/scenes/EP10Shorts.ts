import { Beat } from "../board/Board";
import { A, H, I, O, P, T, X } from "../board/dsl";
import { theme } from "../theme";

const { red } = theme;

// Shorts Ed Zitron's week (Better Offline + Tech Won't Save Us), panel vertikal 1000x1300, pusat x=500.
// No scandal allegations in Shorts: numbers and arguments only. Photo: Web Summit, CC BY 2.0.

const ZITRON = "thumbs/photo_zitron.png";

const CTA = (at: string): Beat => ({
  at,
  items: [T("2 HRS", 500, 230, { size: 120 }), A(500, 320, 500, 420, red), T("10 MIN", 500, 520, { size: 140, color: red }), H("full animated breakdown", 500, 660, { size: 70 }), I("bell", 500, 900, 1.6), O(500, 900, 210, 210, red)],
});

/** The AI bubble was one man. */
export const SH23: Beat[] = [
  { at: "Ed Zitron says the AI", drawn: true, items: [P(ZITRON, 500, 380, 520, 576), T("THE AI BUBBLE", 500, 800, { size: 110 }), T("WAS ONE MAN", 500, 950, { size: 120, color: red })] },
  { at: "When CoreWeave needed a customer,", items: [I("chip", 500, 330, 2.2), T("RENTED BACK", 500, 620, { size: 120 }), T("ITS OWN CHIPS", 500, 770, { size: 110, color: red, at: "its own chips" })] },
  { at: "When startups ran low, Nvidia", items: [I("money", 500, 330, 2.2), T("BILLIONS IN", 500, 620, { size: 120, at: "put in billions" }), H("OpenAI · Anthropic promises", 500, 790, { size: 66, at: "investment promises" })] },
  { at: "Now Jensen has stepped down.", items: [I("crown", 500, 330, 2.2), X(500, 330, 130, { at: "stepped down" }), T("WHO KEEPS", 500, 640, { size: 120 }), T("IT GOING?", 500, 790, { size: 130, color: red, at: "keeps it going" })] },
  CTA("The full breakdown is on"),
];

/** Stocks = excitement, bonds = fear. */
export const SH24: Beat[] = [
  { at: "Ed Zitron has a one-line", drawn: true, items: [P(ZITRON, 500, 380, 520, 576), T("STOCKS = EXCITEMENT", 500, 800, { size: 86 }), T("BONDS = FEAR", 500, 950, { size: 120, color: red })] },
  { at: "Right now, stocks still love", items: [I("chart", 500, 330, 2.2), T("STOCKS:", 500, 620, { size: 120 }), T("STILL EXCITED", 500, 770, { size: 110, color: red })] },
  { at: "But bond yields at CoreWeave", items: [I("thermometer", 500, 330, 2.2), T("BONDS:", 500, 620, { size: 120 }), T("GETTING SCARED", 500, 770, { size: 110, color: red, at: "junk rating" }), H("his view, not financial advice", 500, 920, { size: 60, at: "not financial advice" })] },
  CTA("The full breakdown is on"),
];

/** OpenAI asked for $30B, got $11B. */
export const SH25: Beat[] = [
  { at: "According to Ed Zitron, OpenAI", drawn: true, items: [P(ZITRON, 500, 380, 520, 576), T("ASKED: $30B", 500, 800, { size: 120 }), T("GOT: $11B", 500, 950, { size: 130, color: red })] },
  { at: "Eleven billion is roughly one", items: [I("fire", 500, 330, 2.2), T("= ONE QUARTER'S", 500, 620, { size: 100 }), T("LOSS", 500, 770, { size: 140, color: red })] },
  { at: "That's why Zitron thinks OpenAI", items: [I("question", 500, 330, 2.2), T("NEVER", 500, 620, { size: 140 }), T("GOING PUBLIC?", 500, 770, { size: 110, color: red })] },
  { at: "His guest, Ed Elson, puts", items: [I("skull", 500, 330, 2.2), T("\"THEY WILL", 500, 620, { size: 120 }), T("LET YOU DIE\"", 500, 770, { size: 120, color: red, at: "let you die" })] },
  CTA("The full breakdown is on"),
];

/** Anthropic's IPO shrank. */
export const SH26: Beat[] = [
  { at: "Anthropic hoped to go public", drawn: true, items: [P(ZITRON, 500, 380, 520, 576), T("HOPED: $2T", 500, 800, { size: 120 }), T("NOW: ~$1T", 500, 950, { size: 130, color: red })] },
  { at: "Its filing shows eight hundred", items: [I("scroll", 500, 330, 2.2), T("$895 BILLION", 500, 620, { size: 120, color: red }), H("of commitments, mostly compute", 500, 780, { size: 66 })] },
  { at: "And growth has slowed from", items: [I("cliff", 500, 330, 2.2), T("150% → 47%", 500, 640, { size: 130, color: red, at: "forty-seven" }), H("growth per quarter", 500, 800, { size: 66 })] },
  { at: "Even so, Ed Elson gives", items: [I("scales", 500, 330, 2.2), T("CREDIT:", 500, 620, { size: 120 }), T("NO HIDDEN LOSSES", 500, 770, { size: 96, color: red, at: "hide the losses" })] },
  CTA("The full breakdown is on"),
];
