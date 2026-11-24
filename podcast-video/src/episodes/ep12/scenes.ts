import { Beat } from "../../board/Board";
import { H, I, N, O, P, T } from "../../board/dsl";
import { BARS, FLOW, LINE, SHEET, TIMELINE } from "../../board/charts";
import { theme } from "../../theme";

const { red, blue } = theme;

// Episode 12: Bull vs Bear on the Anthropic IPO. Big Technology Podcast (Alex Kantrowitz):
// Gary Marcus (Nov 17, bear) and Aaron Levie (Nov 19, bull), both recorded before the listing.
// Every claim is attributed to the speaker who made it; host numbers are labelled as the host's.
// Photos: Gary Marcus (Web Summit, CC BY 2.0), Aaron Levie (TechCrunch, CC BY 4.0), Ed Zitron (Web Summit, CC BY 2.0).

const MARCUS = "thumbs/photo_marcus.png";
const LEVIE = "thumbs/photo_levie.png";
const ZITRON = "thumbs/photo_zitron.png";

const title = (n: string, name: string, icon: string): Beat["items"] => [
  T(n, 800, 200, { size: 70, color: blue }),
  T(name, 800, 360, { size: 100 }),
  I(icon, 800, 620, 1.5),
];

const S00: Beat[] = [
  {
    at: "Days before Anthropic's record",
    drawn: true,
    items: [P(MARCUS, 255, 470, 640, 820), T("THE BEAR CASE", 1120, 300, { size: 120 }), T("EVER PROFITABLE?", 1120, 450, { size: 120, color: red, at: "never turn a profit" }), H("Gary Marcus", 1120, 600, { size: 60 })],
  },
  {
    at: "Then, on the same show,",
    items: [P(LEVIE, 400, 450, 440, 520), T("THE BULL CASE", 1100, 300, { size: 110 }), H("Aaron Levie, CEO of Box", 1100, 430, { size: 56, at: "Aaron Levie" })],
  },
  {
    at: "Then the market voted.",
    items: [T("THEN THE MARKET", 800, 330, { size: 120 }), T("VOTED", 800, 490, { size: 160, color: red })],
  },
  {
    at: "This is two hours of",
    items: [
      T("TODAY", 800, 170, { size: 90, color: red }),
      H("1. the bear case", 800, 310, { size: 66, at: "the bear case" }),
      H("2. the bull case", 800, 420, { size: 66, at: "the bull case" }),
      H("3. what actually happened", 800, 530, { size: 66, at: "what actually happened" }),
      H("4. the number that decides it", 800, 640, { size: 66, at: "one number" }),
    ],
  },
];

const S01: Beat[] = [
  { at: "Part one. The bear case.", items: title("EXHIBIT 1", "THE BEAR CASE", "chart") },
  {
    at: "First, a surprise. Gary Marcus,",
    items: [P(MARCUS, 400, 450, 440, 520), T("THE SKEPTIC", 1100, 270, { size: 100 }), T("PRAISES CLAUDE CODE", 1100, 400, { size: 80, color: red, at: "actually praises" }), H("language models + classic software", 1100, 530, { size: 50, at: "classic rule-based" })],
  },
  {
    at: "So the product isn't his",
    items: [SHEET("anthropic_ipo.xlsx", [
      { label: "Expected IPO valuation", text: "up to $1.4T", at: "$1.4 trillion" },
      { label: "Profitable quarters (Marcus)", text: "1, \"anomalous\"", color: "amber", at: "never made a profit" },
      { label: "Future commitments", value: 900, text: "~$900B", color: "red", at: "$900 billion" },
    ], { formula: "=PROFIT(anthropic)" })],
  },
  {
    at: "His analogy: you can make",
    items: [I("bottle", 400, 430, 2), T("GREAT LEMONADE", 1100, 280, { size: 100 }), T("SOLD BELOW COST", 1100, 420, { size: 100, color: red, at: "less than the lemons" }), H("= a bad business", 1100, 560, { size: 56, at: "bad business" })],
  },
  {
    at: "His bottom line is blunt.",
    items: [I("skull", 400, 430, 2), T("\"WOULDN'T BE SHOCKED\"", 1100, 260, { size: 76 }), H("if it went out of business", 1100, 380, { size: 52, at: "out of business" }), T("MOST LIKELY: SOLD", 1100, 520, { size: 90, color: red, at: "It gets sold" }), H("for far less than $1 trillion", 1100, 640, { size: 52, at: "less than a trillion" })],
  },
  {
    at: "If you want the AI",
    items: [I("bell", 800, 360, 2.2, { at: "subscribe now" }), O(800, 360, 170, 170, red, { at: "subscribe now" }), T("THE AI MONEY STORY", 800, 640, { size: 90 }), H("explained every week", 800, 760, { size: 56, at: "every week" })],
  },
  {
    at: "So why is he so",
    items: [T("WHY WON'T", 800, 320, { size: 130 }), T("THE GROWTH LAST?", 800, 480, { size: 110, color: red, at: "growth won't last" })],
  },
];

const S02: Beat[] = [
  { at: "Part two. The trillion-pound baby.", items: title("EXHIBIT 2", "THE TRILLION-POUND BABY", "balloon") },
  {
    at: "Marcus has a favorite joke.",
    items: [LINE("The trillion-pound baby", [
      { label: "birth", value: 1, text: "1x", at: "his baby" },
      { label: "one month", value: 2, text: "2x", at: "doubled its weight" },
      { label: "college", value: 100, text: "1 TRILLION LB", hi: true, at: "a trillion pounds" },
    ], { note: "growth like that always tails off", noteAt: "always tails off" })],
  },
  {
    at: "And he thinks Anthropic's already",
    items: [BARS("Anthropic revenue growth, quarter on quarter", [
      { label: "Q2 (token-maxing)", value: 147, text: "+147%", at: "147%" },
      { label: "Q3", value: 47, text: "+47%", hi: true, at: "growth was 47%" },
    ])],
  },
  {
    at: "Then there's competition. Since 2023,",
    items: [TIMELINE("Marcus on competition", [
      { label: "\"Everyone builds the same thing\"", text: "2023", at: "Since 2023" },
      { label: "Price wars", text: "THEN", at: "price wars" },
      { label: "Cheaper Chinese models", text: "THIS YEAR", hi: true, at: "Cheaper Chinese models" },
    ])],
  },
  {
    at: "That leaves Anthropic one niche:",
    items: [I("gradcap", 400, 430, 2), T("ASSOCIATE PROFESSOR?", 1100, 280, { size: 76, at: "associate professor" }), T("OR FULL PROFESSOR?", 1100, 410, { size: 84, color: red, at: "full professor" }), H("the host's analogy", 1100, 540, { size: 50, at: "Alex Kantrowitz" })],
  },
  {
    at: "And each step up costs",
    items: [BARS("Cost to impress users (Marcus's warning)", [
      { label: "This year", value: 1, text: "$1B", at: "One billion" },
      { label: "Next year", value: 10, text: "$10B", at: "ten billion" },
      { label: "After that", value: 100, text: "$100B", hi: true, at: "a hundred billion" },
    ])],
  },
  {
    at: "Kantrowitz added more pressure: five",
    items: [N(19, 800, 330, { suffix: "%", size: 220, at: "19%" }), H("of revenue from five customers (the host's figure)", 800, 490, { size: 50 }), H("and some big ones are pulling back", 800, 590, { size: 54, color: red, at: "pulling back" })],
  },
  {
    at: "Marcus's conclusion: Anthropic has",
    items: [I("rocket", 400, 430, 2), T("STAY A ROCKET", 1100, 300, { size: 110, at: "stay a rocket" }), T("OR LOSE ESCAPE VELOCITY", 1100, 440, { size: 76, color: red, at: "escape velocity" })],
  },
  {
    at: "That's the bear case. Now",
    items: [P(LEVIE, 400, 450, 440, 520), T("NOW:", 1100, 300, { size: 110 }), T("THE BULL", 1100, 440, { size: 140, color: red, at: "thinks it's wrong" })],
  },
];

const S03: Beat[] = [
  { at: "Part three. The bull case.", items: title("EXHIBIT 3", "THE BULL CASE", "rocket") },
  {
    at: "Aaron Levie runs Box, which",
    items: [P(LEVIE, 400, 450, 440, 520), T("NOT FINANCIAL ADVICE", 1100, 280, { size: 76, at: "not giving financial advice" }), T("BUT VERY BULLISH", 1100, 410, { size: 96, color: red, at: "very bullish" })],
  },
  {
    at: "His first number: Anthropic's revenue",
    items: [LINE("Anthropic quarterly revenue", [
      { label: "Q3 2025", value: 1.4, text: "$1.4B", at: "$1.4 billion" },
      { label: "Q3 2026", value: 17, text: "$17B", hi: true, at: "$17 billion" },
    ], { note: "12x, which he doesn't expect again", noteAt: "Twelve times" })],
  },
  {
    at: "His second number: customers spending",
    items: [BARS("Customers spending $100K+ a year", [
      { label: "a year earlier", value: 950, text: "~950", at: "about 950" },
      { label: "now", value: 11900, text: "~11,900", hi: true, at: "about 11,900" },
    ], { note: "\"voting with their wallets\"", noteAt: "voting with their wallets" })],
  },
  {
    at: "Why will it keep going?",
    items: [FLOW("AI AGENTS", [
      { label: "Coding", at: "coding was just" },
      { label: "Product design", at: "product design" },
      { label: "Cybersecurity", at: "cybersecurity" },
      { label: "Research", at: "research" },
      { label: "Sales", at: "sales" },
    ], { amount: "code-adjacent" })],
  },
  {
    at: "For the first time in",
    items: [I("chip", 400, 430, 2), T("NOT HOW FAST YOU TYPE", 1100, 300, { size: 72, at: "how fast people can type" }), T("HOW MUCH COMPUTE YOU BUY", 1100, 430, { size: 72, color: red, at: "computing power you buy" })],
  },
  {
    at: "And his favorite chart, from",
    items: [BARS("Revenue per $1 of compute (Anthropic's filing)", [
      { label: "Early 2025", value: 0.4, text: "$0.40", at: "40 cents" },
      { label: "This year", value: 1.72, text: "$1.72", hi: true, at: "seventy-two" },
    ], { note: "\"people should update their views\"", noteAt: "update their views" })],
  },
  {
    at: "So how does he answer",
    items: [T("HOW DOES HE", 800, 320, { size: 120 }), T("ANSWER MARCUS?", 800, 480, { size: 120, color: red, at: "answer Marcus" })],
  },
];

const S04: Beat[] = [
  { at: "Part four. Round two.", items: title("EXHIBIT 4", "ROUND TWO", "scales") },
  {
    at: "Kantrowitz put Marcus's biggest worries",
    items: [SHEET("bear_vs_bull.xlsx", [
      { label: "$900B of commitments", text: "depends on growth", color: "amber", at: "The debt?" },
      { label: "Token-maxing", text: "\"two-week fashion\"", color: "lime", at: "Token-maxing?" },
      { label: "Revenue run rate", text: "$80B+", color: "blue", at: "passed $80 billion" },
    ], { formula: "=LEVIE(marcus_worries)" })],
  },
  {
    at: "Diminishing returns? He says improving",
    items: [BARS("Cost to improve a model for one field", [
      { label: "Levie: training data", value: 0.01, text: "millions", hi: true, at: "costs millions" },
      { label: "the fear: pre-training", value: 100, text: "$100Bs", at: "hundreds of billions" },
    ], { note: "each field: trillions of dollars of work", noteAt: "trillions of dollars" })],
  },
  {
    at: "Cheap Chinese and open models?",
    items: [FLOW("", [
      { label: "Top model plans", at: "top model to plan" },
      { label: "Cheap models do the bulk", at: "cheap models for" },
      { label: "Spend on both", hi: true, at: "spend more on both" },
    ], { dir: "loop", title: "Levie: a rising tide" })],
  },
  {
    at: "Marcus answers with a warning:",
    items: [P(MARCUS, 400, 450, 440, 520), T("A DOZEN+ STUDIES:", 1100, 280, { size: 84, at: "more than a dozen" }), T("WEAK RETURNS", 1100, 410, { size: 100, color: red, at: "struggling to get a return" }), H("and hallucinations remain", 1100, 550, { size: 52, at: "hallucinations" })],
  },
  {
    at: "Marcus gave ground too. He",
    items: [TIMELINE("What Marcus conceded", [
      { label: "Raising money: \"my weakest argument\"", text: "1", at: "weakest argument" },
      { label: "Tenfold growth: not disputed", text: "2", at: "tenfold" },
      { label: "Jensen fallout could help Anthropic", text: "3", hi: true, at: "could help Anthropic" },
    ], { note: "\"The best argument you've made\"", noteAt: "best argument" })],
  },
  {
    at: "And on one point, Levie",
    items: [P(LEVIE, 400, 450, 440, 520), T("BILLS BEFORE BUYERS?", 1100, 300, { size: 80, at: "bills come due" }), T("\"ABSOLUTELY POSSIBLE\"", 1100, 440, { size: 84, color: red, at: "Absolutely possible" })],
  },
];

const S05: Beat[] = [
  { at: "Part five. Then the market", items: title("EXHIBIT 5", "THEN THE MARKET VOTED", "chart") },
  {
    at: "On November 19th, Anthropic listed",
    items: [LINE("ANT share price", [
      { label: "listing", value: 83, text: "$83", at: "$83" },
      { label: "day 1 open", value: 111, text: "~$111", at: "$111" },
      { label: "day 1 close", value: 97, text: "~$97", at: "$97" },
      { label: "Friday", value: 87, text: "~$87", hi: true, at: "$87" },
    ], { note: "still above the listing price", noteAt: "above its listing price" })],
  },
  {
    at: "The deal raised more than",
    items: [BARS("Money raised in the IPO", [
      { label: "Base deal", value: 81, text: "$80B+", at: "more than $80 billion" },
      { label: "With extra shares", value: 93, text: "up to $93B", hi: true, at: "$93 billion" },
    ])],
  },
  {
    at: "So far, neither man is",
    items: [I("scales", 400, 430, 2), T("NEITHER PROVEN", 1100, 300, { size: 96 }), T("RIGHT YET", 1100, 440, { size: 110, color: red, at: "proven right" }), H("the real test is time", 1100, 580, { size: 56, at: "test is time" })],
  },
  {
    at: "Which brings us back to",
    items: [T("THE DECIDING", 800, 320, { size: 120 }), T("NUMBER", 800, 490, { size: 160, color: red, at: "decide it" })],
  },
];

const S06: Beat[] = [
  { at: "Part six. The deciding number.", items: title("EXHIBIT 6", "THE DECIDING NUMBER", "magnifier") },
  {
    at: "Strip away the babies and",
    items: [P(MARCUS, 450, 380, 400, 480), P(LEVIE, 1150, 380, 400, 480), T("SAME BET, OPPOSITE SIDES", 800, 800, { size: 70, color: red, at: "opposite directions" })],
  },
  {
    at: "So the number to watch",
    items: [BARS("Anthropic growth, quarter on quarter", [
      { label: "Q4: next quarter", value: 0, text: "?", hi: true, at: "next quarter's growth" },
      { label: "Q3", value: 47, text: "+47%", at: "from 47%" },
    ], { note: "up: bull case. down: bear case.", noteAt: "bear case does" })],
  },
  {
    at: "And as Ed Zitron argued",
    items: [P(ZITRON, 400, 450, 440, 520), T("THE BAR:", 1100, 300, { size: 100 }), T("$21B THIS QUARTER", 1100, 440, { size: 90, color: red, at: "$21 billion" }), H("Ed Zitron, last episode", 1100, 580, { size: 52, at: "last episode" })],
  },
  {
    at: "This is their analysis, not",
    items: [I("scales", 800, 360, 2.2), T("NOT FINANCIAL ADVICE", 800, 640, { size: 96, color: red, at: "not financial advice" })],
  },
  {
    at: "This was two hours of",
    items: [
      T("2 HRS → 8 MIN", 800, 230, { size: 86 }),
      H("both full episodes linked below", 800, 390, { size: 56, at: "linked below" }),
      I("bell", 800, 690, 1.4, { at: "subscribe" }),
      O(800, 690, 120, 120, red, { at: "subscribe" }),
    ],
  },
];

// Viewer ask: which podcast next (comments = engagement + research for the next episode).
const S07: Beat[] = [
  {
    at: "And tell us in the",
    items: [T("WHICH PODCAST", 800, 300, { size: 130 }), T("SHOULD WE DO NEXT?", 800, 460, { size: 110, color: red, at: "break down next" }), H("tell us in the comments", 800, 620, { size: 64, at: "comments" })],
  },
];

export const EP12_SCENES: Record<string, Beat[]> = { S00, S01, S02, S03, S04, S05, S06, S07 };
