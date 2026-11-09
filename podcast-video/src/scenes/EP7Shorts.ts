import { Beat } from "../board/Board";
import { A, H, I, N, O, T, X } from "../board/dsl";
import { theme } from "../theme";

const { red, green, blue } = theme;

// Shorts Robert Pape × The Diary of a CEO, panel vertikal 1000×1300, pusat x=500.
// Panel pertama `drawn`; CTA mengarah ke ringkasan 10 menit di channel.

const CTA = (at: string): Beat => ({
  at,
  items: [T("90 MIN", 500, 230, { size: 120 }), A(500, 320, 500, 420, red), T("10 MIN", 500, 520, { size: 140, color: red }), H("full animated summary", 500, 660, { size: 70 }), I("bell", 500, 900, 1.6), O(500, 900, 210, 210, red)],
});

/** Jebakan eskalasi: perang itu roulette, bukan catur. */
export const SH11: Beat[] = [
  {
    at: "Why can't a superpower",
    drawn: true,
    items: [I("roulette", 500, 360, 2.6), H("why can't a superpower", 500, 700, { size: 76 }), T("WALK AWAY?", 500, 860, { size: 120, color: red })],
  },
  {
    at: "Political scientist",
    items: [I("chess", 500, 330, 2), X(500, 330, 150, { at: "isn't chess" }), T("ROULETTE", 500, 720, { size: 150, color: red, at: "roulette" })],
  },
  {
    at: "You bet on red",
    items: [H("bet red → black", 500, 260, { size: 84, at: "comes up black" }), H("rational: walk away", 500, 420, { size: 76, color: green, at: "walks away" }), T("GAMBLER", 500, 620, { size: 130, color: red, at: "the gambler" }), T("DOUBLES DOWN", 500, 780, { size: 110, color: red, at: "doubles down" }), I("coin", 500, 1020, 1.6, { at: "borrows chips" })],
  },
  {
    at: "Pape maps each spin",
    items: [
      H("kill the Supreme Leader", 450, 300, { size: 64, at: "kill the Supreme Leader" }),
      H("6-week air campaign", 450, 480, { size: 64, at: "six week" }),
      H("blockade", 450, 660, { size: 64, at: "a blockade" }),
      X(880, 300, 40, { at: "didn't fold" }),
      X(880, 480, 40, { at: "didn't fold" }),
      X(880, 660, 40, { at: "didn't fold" }),
      H("chips: gas · lives · support", 500, 900, { size: 64, color: red, at: "And the chips" }),
    ],
  },
  { at: "That's the escalation trap", items: [T("THE", 500, 400, { size: 120 }), T("ESCALATION", 500, 560, { size: 130, color: red }), T("TRAP", 500, 720, { size: 130 })] },
  CTA("Full animated breakdown"),
];

/** "Rencana tiga hari" = Instant Thunder. */
export const SH12: Beat[] = [
  {
    at: "A three day bombing plan",
    drawn: true,
    items: [I("bomb", 500, 360, 2.6), T("3-DAY PLAN", 500, 700, { size: 130, color: red }), H("sounds small, right?", 500, 860, { size: 80 })],
  },
  {
    at: "Robert Pape says",
    items: [H("the reported targets:", 500, 260, { size: 72 }), H("leadership · refineries", 500, 400, { size: 70, at: "leadership" }), H("bridges · energy", 500, 520, { size: 70, at: "bridges" }), T("= INSTANT THUNDER", 500, 720, { size: 96, color: red, at: "Instant Thunder" }), H("Iraq, 1991", 500, 860, { size: 76, at: "nineteen ninety one" })],
  },
  {
    at: "It was also supposed",
    items: [H("planned", 500, 260, { size: 76 }), T("3 DAYS", 500, 400, { size: 150 }), H("lasted", 500, 620, { size: 76, at: "It lasted" }), T("43 DAYS", 500, 780, { size: 170, color: red, at: "forty three" })],
  },
  {
    at: "And here's the paradox",
    items: [I("brain", 500, 340, 2), H("paralyze a government...", 500, 640, { size: 76, at: "paralyze" }), T("WHO'S LEFT TO", 500, 800, { size: 96, color: red, at: "who is left" }), T("NEGOTIATE?", 500, 930, { size: 110, color: red, at: "who is left" })],
  },
  CTA("Full animated breakdown"),
];

/** Kekerasan politik seperti kebakaran hutan. */
export const SH13: Beat[] = [
  {
    at: "Robert Pape says political",
    drawn: true,
    items: [I("fire", 500, 360, 2.6), T("POLITICAL", 500, 700, { size: 110 }), T("WILDFIRE", 500, 850, { size: 140, color: red })],
  },
  {
    at: "You can predict",
    items: [I("tree", 500, 300, 1.8), H("dry wood: predictable", 500, 520, { size: 76, at: "how much dry wood" }), I("fire", 500, 760, 1.4, { at: "the spark" }), H("spark: unpredictable", 500, 960, { size: 76, color: red, at: "the spark" })],
  },
  {
    at: "And the dry wood is huge",
    items: [
      T("40M+", 500, 260, { size: 150, color: red, at: "forty million" }),
      H("military vs. anti-Trump protesters", 500, 400, { size: 56, at: "forty million" }),
      T("60M+", 500, 600, { size: 150, color: blue, at: "sixty million" }),
      H("force to stop Trump", 500, 740, { size: 60, at: "sixty million" }),
      H("both sides · doubled in 2 yrs", 500, 920, { size: 64, at: "Both sides" }),
    ],
  },
  {
    at: "The most dangerous moment",
    items: [I("ballot", 500, 360, 2.2), H("most dangerous moment:", 500, 660, { size: 76 }), T("TRANSFER", 500, 800, { size: 120, color: red, at: "transfer of power" }), T("OF POWER", 500, 930, { size: 120, color: red, at: "transfer of power" })],
  },
  CTA("Full animated breakdown"),
];

/** Menimbun persediaan vs firebreak. */
export const SH14: Beat[] = [
  {
    at: "Britain told every household",
    drawn: true,
    items: [I("bottle", 330, 340, 1.6), I("battery", 670, 340, 1.6), H("UK: stockpile 3 days", 500, 680, { size: 84 }), T("WORTH IT?", 500, 860, { size: 140, color: red })],
  },
  {
    at: "Robert Pape, who has advised",
    items: [I("person", 500, 340, 2), H("advised every White House", 500, 620, { size: 70 }), T("\"I'M NOT DOING IT\"", 500, 800, { size: 92, color: red, at: "isn't doing it" })],
  },
  {
    at: "Day one",
    items: [I("bottle", 300, 360, 1.4), H("day 1", 300, 560, { size: 76 }), I("bottle", 700, 360, 1.4, { at: "By day three" }), X(700, 360, 110, { at: "you're out" }), H("day 3: out", 700, 560, { size: 76, color: red, at: "By day three" }), H("attacks can come again", 500, 820, { size: 76, at: "come again" })],
  },
  {
    at: "What actually buys time",
    items: [T("FIREBREAKS", 500, 260, { size: 140, color: green }), H("no Iran escalation until", 500, 440, { size: 64, at: "no escalation" }), H("the new Congress is seated", 500, 540, { size: 64 }), T("HANDS OFF CIVILIANS", 500, 720, { size: 86, color: red, at: "hands off civilians" }), I("phone", 500, 950, 1.4, { at: "email or call" })],
  },
  CTA("Full animated breakdown"),
];
