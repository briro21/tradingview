import { Beat } from "../board/Board";
import { A, H, I, N, O, S, T, U, X } from "../board/dsl";
import { theme } from "../theme";

const { red, green, blue, purple } = theme;

// Shorts video AI & krisis matematika (Lex Fridman #503), panel vertikal 1000×1300, pusat x=500.
// Panel pertama `drawn`; CTA mengarah ke ringkasan 10 menit di channel.

const CTA = (at: string): Beat => ({
  at,
  items: [T("3.5 HRS", 500, 230, { size: 120 }), A(500, 320, 500, 420, red), T("10 MIN", 500, 520, { size: 140, color: red }), H("full animated summary", 500, 660, { size: 70 }), I("bell", 500, 900, 1.6, { at: "subscribe" }), O(500, 900, 210, 210, red)],
});

/** Teorema Terakhir Fermat: 13 juta baris, "keep going". */
export const SH07: Beat[] = [
  {
    at: "On a Wednesday",
    drawn: true,
    items: [I("temple", 500, 330, 2), H("\"AI is years away\"", 500, 640, { size: 84 }), T("2 DAYS LATER...", 500, 820, { size: 100, color: red })],
  },
  {
    at: "Two days later",
    items: [T("FERMAT'S LAST", 500, 240, { size: 110 }), T("THEOREM", 500, 380, { size: 120 }), I("robot", 500, 680, 1.8, { at: "Anthropic's AI" }), H("formalized", 500, 960, { size: 80, color: green, at: "did it" })],
  },
  {
    at: "Thirteen million lines",
    items: [N(13, 500, 360, { suffix: "M", size: 260, color: red }), H("lines of verified proof", 500, 620, { size: 80 }), I("code", 500, 900, 1.6)],
  },
  {
    at: "One expert had",
    items: [N(5, 500, 360, { suffix: " YEARS", size: 170, color: blue }), H("of grant money", 500, 580, { size: 80 }), H("for just part of it", 500, 720, { size: 80, at: "just part" })],
  },
  {
    at: "And according to number theorist",
    items: [I("person", 300, 400, 1.4), I("person", 500, 400, 1.4), I("person", 700, 400, 1.4, { at: "two or three people" }), H("what they typed:", 500, 720, { size: 80, at: "what they typed" }), T("\"KEEP GOING\"", 500, 900, { size: 120, color: red, at: "keep going" })],
  },
  {
    at: "So what is a mathematician",
    items: [I("question", 500, 400, 2.4), H("what is a mathematician", 500, 760, { size: 80 }), T("FOR NOW?", 500, 900, { size: 130, color: red })],
  },
  CTA("I animated the full"),
];

/** Von Neumann bertanya pada Tuhan. */
export const SH08: Beat[] = [
  {
    at: "John von Neumann dies",
    drawn: true,
    items: [I("person", 500, 380, 2.2), T("VON NEUMANN", 500, 720, { size: 120 }), H("meets God", 500, 880, { size: 90, color: purple })],
  },
  {
    at: "He gets to ask God",
    items: [H("one question:", 500, 260, { size: 84 }), T("IS THE RIEMANN", 500, 460, { size: 100 }), T("HYPOTHESIS TRUE?", 500, 600, { size: 100, color: blue })],
  },
  {
    at: "God says yes",
    items: [T("\"YES.\"", 500, 500, { size: 260, color: green })],
  },
  {
    at: "Then von Neumann asks",
    items: [T("\"BUT HOW", 500, 420, { size: 150 }), T("DO YOU KNOW?\"", 500, 600, { size: 140, color: red })],
  },
  {
    at: "God says",
    items: [H("\"I know where", 500, 300, { size: 90 }), H("all the zeros are\"", 500, 430, { size: 90 }), T("NOT ENOUGH", 500, 680, { size: 130, color: red, at: "not enough" }), H("...the other place", 500, 860, { size: 80, at: "other place" })],
  },
  {
    at: "It's from a play",
    items: [I("scroll", 500, 360, 2), H("a 1950s play", 500, 660, { size: 90 }), H("never more relevant", 500, 800, { size: 80, color: red, at: "never been more" })],
  },
  {
    at: "AI just proved results",
    items: [I("robot", 500, 360, 2), H("results they never", 500, 660, { size: 80 }), H("expected to see", 500, 780, { size: 80 })],
  },
  {
    at: "But as one of them",
    items: [H("math is not the fact.", 500, 360, { size: 90 }), T("IT'S THE WHY", 500, 580, { size: 150, color: red, at: "It's the why" }), U(500, 680, 760, red)],
  },
  CTA("The full animated breakdown"),
];

/** AI membelah mahasiswa jadi dua kelompok. */
export const SH09: Beat[] = [
  {
    at: "AI is splitting students",
    drawn: true,
    items: [I("gradcap", 500, 320, 2), T("AI IS SPLITTING", 500, 620, { size: 110 }), T("STUDENTS IN TWO", 500, 770, { size: 110, color: red })],
  },
  {
    at: "A Rutgers math professor",
    items: [A(150, 520, 850, 520), O(500, 420, 260, 110, blue), H("bell curve", 500, 260, { size: 84, at: "bell curve" }), X(500, 420, 200, { at: "two peaks" }), A(150, 980, 850, 980), O(320, 880, 100, 100, red), O(680, 880, 100, 100, red), H("two peaks", 500, 720, { size: 84, color: red, at: "two peaks" })],
  },
  {
    at: "One group uses AI",
    items: [I("robot", 500, 320, 1.8), H("\"here are my notes,", 500, 600, { size: 80, at: "here are my notes" }), H("test me\"", 500, 720, { size: 80, at: "test me" }), T("MUCH HIGHER GRADES", 500, 920, { size: 90, color: green, at: "much higher" })],
  },
  {
    at: "The other group asks",
    items: [I("clock", 500, 320, 1.8), H("\"just give me the answers\"", 500, 600, { size: 72, at: "the answers" }), H("homework ≠ exams", 500, 820, { size: 96, color: red, at: "no longer matches" })],
  },
  {
    at: "Same tool, opposite results",
    items: [T("SAME TOOL", 500, 380, { size: 140 }), T("OPPOSITE RESULTS", 500, 560, { size: 110, color: red })],
  },
  {
    at: "And learn the basics anyway",
    items: [I("calculator", 500, 360, 2), N(70, 500, 700, { suffix: " YEARS", size: 120, at: "seventy years" }), H("still learn times tables", 500, 860, { size: 80, at: "times tables" })],
  },
  {
    at: "Which group are you in",
    items: [T("WHICH GROUP", 500, 420, { size: 130 }), T("ARE YOU?", 500, 580, { size: 150, color: red })],
  },
  CTA("Full animated breakdown"),
];

/** Doorman fallacy. */
export const SH10: Beat[] = [
  {
    at: "If an automatic door",
    drawn: true,
    items: [I("door", 340, 380, 1.8), I("person", 680, 420, 1.6), T("WHY PAY A", 500, 760, { size: 120 }), T("DOORMAN?", 500, 910, { size: 140, color: red })],
  },
  {
    at: "That's a trap",
    items: [T("THE DOORMAN", 500, 380, { size: 120 }), T("FALLACY", 500, 540, { size: 150, color: red }), U(500, 640, 600, red)],
  },
  {
    at: "MIT mathematician Ankur Moitra",
    items: [I("person", 500, 340, 1.8), T("ANKUR MOITRA", 500, 640, { size: 100 }), H("MIT, on Lex Fridman", 500, 780, { size: 76 })],
  },
  {
    at: "A doorman doesn't just open doors",
    items: [H("welcomes you", 500, 260, { size: 84, at: "welcomes" }), H("recognizes you", 500, 420, { size: 84, at: "recognizes" }), H("keeps you safe", 500, 580, { size: 84, at: "safe" }), H("makes you feel cared for", 500, 740, { size: 76, color: red, at: "cared for" })],
  },
  {
    at: "Replace him with a sliding door",
    items: [I("door", 500, 380, 2.2), H("you lose all of that", 500, 720, { size: 90, color: red, at: "lose all" })],
  },
  {
    at: "Your job is not",
    items: [H("your job ≠", 500, 360, { size: 100 }), H("its most visible task", 500, 500, { size: 84 }), S(500, 500, 700, { at: "either" })],
  },
  {
    at: "And when problem solving becomes cheap",
    items: [H("problem solving = cheap", 500, 300, { size: 80 }), I("arrowUp", 500, 560, 1.8, { at: "more valuable" }), T("EVERYTHING ELSE", 500, 820, { size: 100, color: green }), H("becomes more valuable", 500, 960, { size: 80 })],
  },
  CTA("Full animated breakdown"),
];

export const EP6_SHORTS = { SH07, SH08, SH09, SH10 };
