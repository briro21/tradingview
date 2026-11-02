import { Beat } from "../board/Board";
import { A, H, I, N, O, S, T, U, X } from "../board/dsl";
import { theme } from "../theme";

const { red, green, blue, purple } = theme;

// Shorts Episode 3 (Robert Greene), panel vertikal 1000×1300, pusat x=500.
// Panel pertama `drawn` agar frame pertama tidak kosong (pelajaran retensi Episode 1).

const CTA = (at: string, sub: string): Beat => ({
  at,
  items: [T("FULL VIDEO", 500, 260, { size: 130 }), H(sub, 500, 420, { size: 80 }), I("bell", 500, 780, 1.8, { at: "subscribe" }), O(500, 780, 230, 230, red)],
});

/** Martin Luther King sebagai ahli strategi. */
export const SH03: Beat[] = [
  {
    at: "Martin Luther King",
    drawn: true,
    items: [I("chess", 500, 380, 2.4), T("NOT A", 500, 760, { size: 110 }), T("NAIVE SAINT", 500, 900, { size: 120, color: red }), U(500, 990, 640, red)],
  },
  {
    at: "According to Robert Greene",
    items: [I("book", 500, 380, 2), H("Robert Greene:", 500, 700, { size: 80 }), T("A STRATEGIST", 500, 880, { size: 120, color: red, at: "calculated strategist" }), U(500, 960, 650, red)],
  },
  {
    at: "He planned protests",
    items: [I("crowd", 500, 400, 2.4), H("protests with", 500, 760, { size: 80 }), T("SCHOOLCHILDREN", 500, 900, { size: 100, color: blue, at: "schoolchildren" })],
  },
  {
    at: "knowing the images",
    items: [I("dog", 300, 330, 1.6, { at: "police dogs" }), A(470, 330, 600, 330, red), I("tv", 750, 330, 1.6, { at: "broadcast" }), H("on every American TV", 500, 700, { size: 76, at: "every American" })],
  },
  {
    at: "It broke the nation's heart",
    items: [I("heart", 500, 330, 2), I("scales", 500, 720, 1.8, { at: "forced the law" }), T("LAW CHANGED", 500, 1020, { size: 110, color: green, at: "to change" })],
  },
  {
    at: "Tactical media manipulation",
    items: [T("MEDIA", 500, 300, { size: 140, color: purple }), T("MANIPULATION", 500, 460, { size: 110, color: purple }), H("...for a noble cause", 500, 680, { size: 80, at: "noble cause" }), I("crown", 500, 920, 1.3)],
  },
  {
    at: "So if our greatest heroes",
    items: [I("mask", 500, 380, 2.4, { at: "wear a mask" }), H("\"just be yourself\"?", 500, 760, { size: 90, at: "just being" }), X(500, 760, 300, { at: "enough" })],
  },
  CTA("I animated Robert Greene's", "Robert Greene on power"),
];

/** Seduksi: arah fokus, anti-seducer vs master seducer. */
export const SH04: Beat[] = [
  {
    at: "Why do some people",
    drawn: true,
    items: [I("person", 300, 380, 1.6), A(420, 300, 600, 300, green), I("person", 720, 380, 1.6), H("pull in", 500, 680, { size: 80, color: green }), H("or push away?", 500, 820, { size: 80, color: red })],
  },
  {
    at: "Robert Greene says",
    items: [I("book", 500, 380, 2), T("ONE THING:", 500, 720, { size: 110 }), T("YOUR FOCUS", 500, 880, { size: 130, color: red, at: "focus points" })],
  },
  {
    at: "The anti-seducer",
    items: [T("ANTI-SEDUCER", 500, 200, { size: 100, color: red }), I("thought", 500, 520, 2.4, { at: "trapped" }), H("\"Do I look good?\"", 500, 860, { size: 70, at: "Do I look" }), H("\"Was that stupid?\"", 500, 980, { size: 70, at: "something stupid" })],
  },
  {
    at: "That insecurity",
    items: [I("person", 500, 400, 2), T("INSECURITY", 500, 800, { size: 120, color: red }), H("people can feel it", 500, 960, { size: 80, at: "people can feel" })],
  },
  {
    at: "The master seducer",
    items: [T("MASTER SEDUCER", 500, 200, { size: 96, color: green }), I("sponge", 500, 560, 2.4, { at: "like a sponge" }), H("listens for what's missing", 500, 940, { size: 66, at: "listen for" })],
  },
  {
    at: "Errol Flynn",
    items: [T("ERROL FLYNN", 500, 220, { size: 110 }), I("martini", 340, 580, 1.8, { at: "two martinis" }), I("martini", 660, 580, 1.8), N(2, 500, 950, { suffix: " MARTINIS", size: 100, color: purple })],
  },
  {
    at: "And the real weapon",
    items: [H("the real weapon?", 500, 260, { size: 90 }), T("ACTING TOUGH", 500, 480, { size: 110, at: "Not acting" }), S(500, 480, 720, { at: "tough" }), T("VULNERABILITY", 500, 800, { size: 112, color: green, at: "Vulnerability" }), U(500, 880, 720, green)],
  },
  CTA("The full animated breakdown", "the art of seduction"),
];

/** Mastery: gaji lebih kecil, latihan fisik. */
export const SH05: Beat[] = [
  {
    at: "If you're in your twenties",
    drawn: true,
    items: [T("20s?", 500, 260, { size: 180, color: blue }), T("TAKE THE", 500, 560, { size: 120 }), T("LOWER SALARY", 500, 720, { size: 120, color: red }), U(500, 810, 720, red)],
  },
  {
    at: "Not the giant corporation",
    items: [I("factory", 500, 380, 2.2), H("invisible cog", 500, 740, { size: 80, at: "invisible cog" }), I("gear", 500, 920, 1), X(500, 560, 330, { at: "playing office" })],
  },
  {
    at: "but the job where",
    items: [I("person", 340, 420, 1.6), I("crown", 340, 220, 0.7), I("person", 660, 450, 1.3), H("work next to a master", 500, 820, { size: 76, at: "next to a master" })],
  },
  {
    at: "Because mastery is physical",
    items: [I("hand", 300, 380, 1.6), A(450, 380, 560, 380, red), I("brain", 720, 380, 1.6), T("REWIRES", 500, 760, { size: 130, color: purple, at: "rewires" }), H("your brain", 500, 900, { size: 80 })],
  },
  {
    at: "Stevie Wonder",
    items: [T("STEVIE WONDER", 500, 200, { size: 100 }), I("piano", 500, 520, 2.4), H("since age", 500, 880, { size: 80, at: "since he was" }), N(11, 500, 1020, { size: 130, color: red })],
  },
  {
    at: "And forget the lie",
    items: [H("\"work should be fun\"", 500, 300, { size: 84 }), S(500, 300, 640, { at: "fun" }), I("hourglass", 500, 640, 1.8, { at: "Real mastery" }), N(100, 500, 960, { suffix: "s OF HOURS", size: 96, color: red, at: "hundreds of hours" })],
  },
  {
    at: "That's where real confidence",
    items: [I("crown", 500, 380, 2.2), T("REAL", 500, 740, { size: 120 }), T("CONFIDENCE", 500, 890, { size: 130, color: green })],
  },
  CTA("Watch the full animated breakdown", "the path to mastery"),
];

/** Stroke Robert Greene. */
export const SH06: Beat[] = [
  {
    at: "The world's greatest expert",
    drawn: true,
    items: [I("crown", 500, 260, 1.6), T("POWER EXPERT", 500, 530, { size: 110 }), T("LOST CONTROL", 500, 700, { size: 120, color: red }), H("of his own body", 500, 860, { size: 84 })],
  },
  {
    at: "In 2018",
    items: [N(2018, 500, 260, { from: 2000, plain: true, size: 200, color: red }), I("brain", 500, 620, 2.2, { at: "severe stroke" }), H("left side paralyzed", 500, 960, { size: 80, at: "paralyzed" })],
  },
  {
    at: "No more hiking",
    items: [I("shoe", 300, 300, 1.4), X(300, 300, 110), I("wave", 700, 300, 1.4, { at: "swimming" }), X(700, 300, 110, { at: "swimming" }), H("can't even cut his food", 500, 720, { size: 74, at: "cut his own" })],
  },
  {
    at: "In the darkest depression",
    items: [I("wheelchair", 500, 380, 2.2), H("from the darkest place...", 500, 740, { size: 74 }), T("ACCEPTANCE", 500, 900, { size: 116, color: green, at: "acceptance" })],
  },
  {
    at: "and radical gratitude",
    items: [I("heart", 500, 360, 2), T("RADICAL", 500, 700, { size: 120 }), T("GRATITUDE", 500, 860, { size: 130, color: green }), U(500, 950, 620, green)],
  },
  {
    at: "Most of us walk",
    items: [I("person", 500, 360, 1.8), H("half asleep", 500, 660, { size: 90 }), I("shoe", 500, 900, 1.3, { at: "tying our own" }), H("a miracle", 500, 1080, { size: 80, color: red, at: "shoes" })],
  },
  CTA("Watch the full animated story", "Robert Greene's story"),
];

export const EP3_SHORTS = { SH03, SH04, SH05, SH06 };
