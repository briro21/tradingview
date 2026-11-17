import { Beat } from "../board/Board";
import { A, H, I, O, P, T, X } from "../board/dsl";
import { theme } from "../theme";

const { red } = theme;

// Shorts Mark Cuban × The Diary of a CEO, panel vertikal 1000×1300, pusat x=500.
// Panel pertama `drawn` dengan foto Cuban (Gage Skidmore, CC BY-SA 2.0); CTA ke video 10 menit.

const CUBAN = "thumbs/photo_cuban.png";

const CTA = (at: string): Beat => ({
  at,
  items: [T("90 MIN", 500, 230, { size: 120 }), A(500, 320, 500, 420, red), T("10 MIN", 500, 520, { size: 140, color: red }), H("full animated breakdown", 500, 660, { size: 70 }), I("bell", 500, 900, 1.6), O(500, 900, 210, 210, red)],
});

/** AI tidak pintar: anjing pemandu vs AI. */
export const SH19: Beat[] = [
  {
    at: "Billionaire Mark Cuban says AI",
    drawn: true,
    items: [P(CUBAN, 500, 380, 520, 576), T("\"AI IS", 500, 800, { size: 110 }), T("NOT SMART\"", 500, 950, { size: 120, color: red })],
  },
  {
    at: "Put him at a busy",
    items: [I("dog", 500, 340, 2.4), T("THE DOG", 500, 640, { size: 130, color: red, at: "seeing-eye dog" }), H("goes first, not the AI", 500, 800, { size: 76, at: "He'd trust the dog" })],
  },
  {
    at: "He says AI just predicts",
    items: [I("robot", 500, 330, 2.2), T("4 AIs", 500, 620, { size: 130, at: "Ask four AIs" }), T("= 4 ANSWERS", 500, 770, { size: 110, color: red, at: "four different answers" }), H("can't react in real time", 500, 920, { size: 70, at: "real time" })],
  },
  CTA("The full breakdown is on"),
];

/** Saham seperti kartu bisbol. */
export const SH20: Beat[] = [
  {
    at: "Mark Cuban says we're trading",
    drawn: true,
    items: [P(CUBAN, 500, 380, 520, 576), T("STOCKS =", 500, 800, { size: 110 }), T("BASEBALL CARDS", 500, 950, { size: 110, color: red })],
  },
  {
    at: "A company can miss its",
    items: [I("coin", 500, 320, 2), T("1-PENNY MISS", 500, 600, { size: 110 }), T("-18%", 500, 790, { size: 190, color: red, at: "eighteen percent" })],
  },
  {
    at: "The business didn't lose eighteen",
    items: [I("cards", 500, 330, 2.4), H("value didn't change", 500, 610, { size: 76 }), T("EVERYTHING = MEME", 500, 760, { size: 100, color: red, at: "meme stock" }), H("Google, Apple too", 500, 900, { size: 70, at: "Google and Apple" })],
  },
  {
    at: "What pops the bubble?",
    items: [I("bubble", 500, 360, 2.4), I("pin", 680, 230, 1.3), T("\"NO IDEA\"", 500, 720, { size: 140, color: red, at: "no idea" })],
  },
  CTA("The full breakdown is on"),
];

/** Aturan untuk video cepat kaya. */
export const SH21: Beat[] = [
  {
    at: "Mark Cuban has one rule",
    drawn: true,
    items: [P(CUBAN, 500, 380, 520, 576), T("ONE RULE FOR", 500, 800, { size: 100 }), T("GET-RICH-QUICK", 500, 950, { size: 110, color: red })],
  },
  {
    at: "Nobody who has an edge",
    items: [I("secretMap", 500, 330, 2.2), T("NOBODY SELLS", 500, 610, { size: 120 }), T("THEIR EDGE", 500, 760, { size: 130, color: red }), H("they're using it", 500, 900, { size: 76, at: "They're using it" })],
  },
  {
    at: "His teenage son kept showing",
    items: [I("phone", 500, 330, 2.2), X(500, 330, 130, { at: "if those were good" }), H("drop-shipping, cleaning hustles", 500, 620, { size: 66 }), T("THEY'D JUST DO IT", 500, 780, { size: 100, color: red, at: "just be doing them" })],
  },
  {
    at: "His real advice? Get really",
    items: [I("medal", 500, 340, 2.2), T("GET GOOD AT", 500, 640, { size: 120 }), T("ONE THING", 500, 790, { size: 140, color: red, at: "one thing" })],
  },
  CTA("The full breakdown is on"),
];

/** Kenapa Cuban menyimpan uang tunai. */
export const SH22: Beat[] = [
  {
    at: "With AI stocks soaring on",
    drawn: true,
    items: [P(CUBAN, 500, 380, 520, 576), T("WHY HE'S", 500, 800, { size: 110 }), T("KEEPING CASH", 500, 950, { size: 120, color: red })],
  },
  {
    at: "He follows Warren Buffett and",
    items: [I("hourglass", 500, 330, 2.2), T("PATIENCE", 500, 620, { size: 140 }), H("Buffett, Munger: years without investing", 500, 780, { size: 60, at: "years without investing" })],
  },
  {
    at: "When the market crashed during",
    items: [I("cart", 500, 330, 2.4), T("COVID CRASH:", 500, 620, { size: 110 }), T("HE BOUGHT", 500, 770, { size: 130, color: red, at: "bought up everything" })],
  },
  {
    at: "His view: at some point",
    items: [I("lockbox", 500, 330, 2.2), T("THE REAL MONEY", 500, 620, { size: 110, color: red, at: "real money is made" }), H("his opinion, not financial advice", 500, 790, { size: 66, at: "not financial advice" })],
  },
  CTA("The full breakdown is on"),
];
