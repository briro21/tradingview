import { Beat } from "../board/Board";
import { A, H, I, N, O, P, T, X } from "../board/dsl";
import { theme } from "../theme";

const { red, green, blue } = theme;

// Shorts Ed Zitron × The Diary of a CEO, panel vertikal 1000×1300, pusat x=500.
// Panel pertama `drawn` dengan potret Ed; CTA mengarah ke ringkasan 10 menit di channel.

const CTA = (at: string): Beat => ({
  at,
  items: [T("2.5 HRS", 500, 230, { size: 120 }), A(500, 320, 500, 420, red), T("10 MIN", 500, 520, { size: 140, color: red }), H("full animated summary", 500, 660, { size: 70 }), I("bell", 500, 900, 1.6), O(500, 900, 210, 210, red)],
});

/** Langganan $200 membakar $14.000. */
export const SH15: Beat[] = [
  {
    at: "Your two hundred dollar",
    drawn: true,
    items: [P("thumbs/photo_zitron.png", 500, 380, 520, 576), T("YOU PAY $200", 500, 800, { size: 100 }), T("IT COSTS $14,000", 500, 950, { size: 100, color: red })],
  },
  {
    at: "Tech critic Ed Zitron",
    items: [H("Ed Zitron cites SemiAnalysis:", 500, 240, { size: 64 }), T("$200 PLAN", 500, 420, { size: 110, at: "two hundred dollar ChatGPT" }), A(500, 500, 500, 600, red), T("$14,000", 500, 700, { size: 150, color: red, at: "fourteen thousand" }), H("$20 plan → ~$400", 500, 900, { size: 76, at: "twenty dollar plan" })],
  },
  {
    at: "That's why, he says",
    items: [I("fire", 500, 340, 2.2), T("-$20.9B", 500, 660, { size: 160, color: red }), H("OpenAI, last year", 500, 820, { size: 76 })],
  },
  {
    at: "And when companies",
    items: [I("car", 500, 320, 2), T("UBER", 500, 600, { size: 140, at: "Uber" }), H("a whole year's budget", 500, 770, { size: 76 }), T("IN 3 MONTHS", 500, 910, { size: 110, color: red, at: "three months" })],
  },
  CTA("Full animated breakdown"),
];

/** Uang AI yang berputar. */
export const SH16: Beat[] = [
  {
    at: "Here's how AI money",
    drawn: true,
    items: [P("thumbs/photo_zitron.png", 500, 380, 520, 576), T("AI MONEY", 500, 800, { size: 120 }), T("GOES IN A CIRCLE", 500, 950, { size: 96, color: red })],
  },
  {
    at: "Amazon invests",
    items: [T("AMAZON", 500, 220, { size: 100 }), A(500, 290, 500, 400, green), H("$50B", 650, 345, { size: 70, color: green, at: "fifty billion" }), T("OPENAI", 500, 470, { size: 100 }), T("GOOGLE → ANTHROPIC", 500, 700, { size: 76, at: "Google invests" }), H("$10B", 500, 820, { size: 70, color: green, at: "ten billion" })],
  },
  {
    at: "Then those AI companies",
    items: [I("server", 500, 330, 2), H("they rent servers from...", 500, 620, { size: 70 }), T("AMAZON · GOOGLE", 500, 780, { size: 90, color: red, at: "you guessed it" }), T("MICROSOFT", 500, 900, { size: 90, color: red, at: "Microsoft" })],
  },
  {
    at: "That spending shows up",
    items: [H("= \"cloud revenue\"", 500, 260, { size: 84, at: "cloud revenue" }), N(70, 500, 520, { suffix: "%", size: 260, color: red, at: "seventy percent" }), H("of big tech's AI revenue", 500, 750, { size: 70 }), H("from just two customers", 500, 870, { size: 70, color: blue, at: "two customers" })],
  },
  CTA("Full animated breakdown"),
];

/** Setiap penipuan dimulai dengan membuatmu terburu-buru. */
export const SH17: Beat[] = [
  {
    at: "A tech critic's best advice",
    drawn: true,
    items: [P("thumbs/photo_zitron.png", 500, 380, 520, 576), T("EVERY CON", 500, 800, { size: 130 }), T("STARTS THE SAME", 500, 950, { size: 100, color: red })],
  },
  {
    at: "Ed Zitron says every con",
    items: [I("hourglass", 500, 330, 2), T("IT RUSHES YOU", 500, 640, { size: 110, color: red, at: "rushing you" }), H("\"act now or be left behind\"", 500, 820, { size: 66, at: "left behind" })],
  },
  {
    at: "His rule",
    items: [I("fire", 500, 330, 1.8), X(500, 330, 160, { at: "literally on fire" }), T("SLOW DOWN", 500, 680, { size: 140, color: green, at: "slow down" })],
  },
  {
    at: "And when a company",
    items: [H("\"annualized run rate\"", 500, 360, { size: 90, at: "annualized run rate" }), T("= ?", 500, 560, { size: 200, color: red }), H("ask what it actually means", 500, 820, { size: 70, at: "actually means" })],
  },
  CTA("Full animated breakdown"),
];

/** Prediksi 2027: empat domino. */
export const SH18: Beat[] = [
  {
    at: "Ed Zitron's twenty twenty seven",
    drawn: true,
    items: [P("thumbs/photo_zitron.png", 500, 380, 520, 576), T("2027:", 500, 790, { size: 130, color: red }), T("4 DOMINOES", 500, 950, { size: 120 })],
  },
  {
    at: "One",
    items: [I("domino", 250, 300, 1.3), H("1. OpenAI out of cash", 640, 300, { size: 58 }), I("domino", 250, 620, 1.3, { at: "Two" }), H("2. SoftBank shrinks", 640, 620, { size: 58, at: "Two" })],
  },
  {
    at: "Three",
    items: [I("domino", 250, 300, 1.3), H("3. Oracle at risk", 640, 300, { size: 58 }), I("domino", 250, 620, 1.3, { at: "Four" }), H("4. Nvidia -50–70%", 640, 620, { size: 58, color: red, at: "Four" })],
  },
  {
    at: "His forecast",
    items: [H("his forecast, not a certainty", 500, 300, { size: 66, color: blue }), T("\"TECH", 500, 560, { size: 150, color: red, at: "tech depression" }), T("DEPRESSION\"", 500, 720, { size: 130, color: red, at: "tech depression" })],
  },
  CTA("Full animated breakdown"),
];
