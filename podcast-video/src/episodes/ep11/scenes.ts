import { Beat } from "../../board/Board";
import { A, H, I, N, O, P, T, X } from "../../board/dsl";
import { BARS, FLOW, LINE, SHEET, TIMELINE } from "../../board/charts";
import { theme } from "../../theme";

const { red, blue } = theme;

// Episode 11 v2: "Who pays now?" Better Offline: Into The Jensenverse w/ Gamers Nexus (Nov 18) +
// monologue "The Home Stretch" (Nov 20). S00 + part cards in the Halftone Dossier look; the body
// rotates scene kinds (claim card, photo, counter, bars, line, sheet, flow, timeline) so no two
// shots in a row look the same. Numbers are Zitron's or his sources'; allegations are labelled.

const ZITRON = "thumbs/photo_zitron.png";

const title = (n: string, name: string, icon: string): Beat["items"] => [
  T(n, 800, 200, { size: 70, color: blue }),
  T(name, 800, 360, { size: 100 }),
  I(icon, 800, 620, 1.5),
];

const S00: Beat[] = [
  {
    at: "Twenty-six billion dollars.",
    drawn: true,
    items: [P(ZITRON, 255, 470, 640, 820), N(26, 1120, 330, { prefix: "$", suffix: "B", size: 200, color: red }), H("into Anthropic's IPO", 1120, 500, { size: 60 })],
  },
  {
    at: "That's what Nvidia, Microsoft, Google",
    items: [FLOW("ANTHROPIC", [
      { label: "Nvidia", at: "Nvidia" }, { label: "Microsoft", at: "Microsoft" }, { label: "Google", at: "Google" },
      { label: "+4 more", at: "four other" },
    ], { amount: "$26B" })],
  },
  {
    at: "Ed Zitron calls it the",
    items: [T("THE LAST MONEY", 800, 300, { size: 130 }), T("OUT THE DOOR", 800, 460, { size: 150, color: red, at: "out the door" }), H("Ed Zitron, Better Offline", 800, 620, { size: 56 })],
  },
  {
    at: "Because if he's right, the",
    items: [I("money", 400, 430, 2), X(400, 430, 150, { at: "nobody left" }), T("NEXT IN LINE?", 1100, 300, { size: 110 }), T("NOBODY LEFT", 1100, 450, { size: 120, color: red, at: "nobody left" })],
  },
  {
    at: "In the next ten minutes:",
    items: [
      T("TODAY'S CASE", 800, 170, { size: 90, color: red }),
      H("1. the debut", 800, 330, { size: 70, at: "the debut" }),
      H("2. the missing filing", 800, 450, { size: 70, at: "missing filing" }),
      H("3. the death watch", 800, 570, { size: 70, at: "death watch" }),
    ],
  },
];

const S01: Beat[] = [
  { at: "Part one. The debut.", items: title("EXHIBIT 1", "THE DEBUT", "bell") },
  {
    at: "How did the year's biggest",
    items: [N(83, 800, 330, { prefix: "$", size: 220, at: "$83" }), H("listing price per share", 800, 470, { size: 60 }), T("STUCK NEAR $100", 800, 620, { size: 100, color: red, at: "above $100" })],
  },
  {
    at: "His verdict: not the massive",
    items: [P(ZITRON, 400, 450, 440, 520), T("\"NOT THE MASSIVE", 1100, 300, { size: 90 }), T("RETURN\"", 1100, 430, { size: 120, color: red }), H("but first days say little", 1100, 580, { size: 52, at: "say little" })],
  },
  {
    at: "First, growth. Citing spending",
    items: [LINE("Anthropic revenue growth per quarter", [
      { label: "earlier", value: 150, text: "~150%", at: "around 150%" },
      { label: "last quarter", value: 47, text: "47%", at: "47%" },
      { label: "this quarter", value: 20, text: "15-25%", hi: true, at: "15 to 25%" },
    ], { note: "a rocket running out of fuel", noteAt: "running out of fuel" })],
  },
  {
    at: "Now the bills. Anthropic has",
    items: [SHEET("anthropic_commitments.xlsx", [
      { label: "Commitments, mostly compute", value: 895, text: "$895B", at: "$895 billion" },
      { label: "... of which can't be cancelled", value: 435, text: "$435B", color: "red", at: "$435 billion" },
    ], { formula: "=SUM(compute_contracts)" })],
  },
  {
    at: "Here's the number that really",
    items: [BARS("Revenue per year", [
      { label: "Anthropic needs (2030)", value: 600, text: "$600B", hi: true, at: "$600 billion" },
      { label: "Microsoft, last year", value: 331, text: "$331B", at: "$331 billion" },
    ], { note: "nearly twice Microsoft", noteAt: "nearly twice" })],
  },
  {
    at: "To be fair, there's a",
    items: [SHEET("anthropic_cash.xlsx", [
      { label: "Cash after the IPO", value: 200, text: "$200B+", color: "lime", at: "$200 billion" },
      { label: "Prepayments on compute", text: "coming", color: "amber", at: "prepayments" },
      { label: "Revenue bar this quarter", value: 21, text: "$21B", color: "red", at: "$21 billion" },
    ], { formula: "=IF(revenue<21B,\"problem\")", note: "even 15% growth isn't enough", noteAt: "isn't enough" })],
  },
  {
    at: "Which raises the obvious question.",
    items: [I("question", 400, 430, 2), T("WHO WAS", 1100, 300, { size: 130 }), T("BUYING?", 1100, 450, { size: 150, color: red, at: "buying these shares" })],
  },
];

const S02: Beat[] = [
  { at: "Part two. The last money", items: title("EXHIBIT 2", "THE LAST MONEY OUT THE DOOR", "door") },
  {
    at: "Look at who wrote the",
    items: [FLOW("ANTHROPIC IPO", [
      { label: "Nvidia", at: "Nvidia" }, { label: "Microsoft", at: "Microsoft" }, { label: "Google", at: "Google" },
      { label: "AMD", at: "AMD" }, { label: "TSMC", at: "TSMC" }, { label: "Broadcom", at: "Broadcom" }, { label: "Micron", at: "Micron" },
    ], { amount: "$26B" })],
  },
  {
    at: "Notice something? These are Anthropic's",
    items: [FLOW("", [
      { label: "Suppliers", at: "suppliers" }, { label: "Anthropic", at: "topping up" }, { label: "Suppliers' revenue", hi: true, at: "keep paying" },
    ], { dir: "loop", title: "Topping up a customer" })],
  },
  {
    at: "That's the last money out",
    items: [I("door", 400, 430, 2), T("EARLY INVESTORS: OUT", 1100, 290, { size: 84, at: "last money" }), T("RETAIL: LOSSES", 1100, 430, { size: 100, color: red, at: "almost immediately" }), H("his view", 1100, 560, { size: 52 })],
  },
  {
    at: "Here's why that matters for",
    items: [BARS("OpenAI's raise", [
      { label: "Wanted (reports)", value: 30, text: "$30B", at: "$30 billion" },
      { label: "Got", value: 11, text: "$11B", hi: true, at: "$11 billion" },
    ], { note: "at $1.25T, not $1.4T", noteAt: "$1.4 trillion" })],
  },
  {
    at: "Oddly, one Bloomberg report",
    items: [I("scroll", 400, 430, 2), T("\"WIRED AND", 1100, 300, { size: 110 }), T("RECEIVED\"", 1100, 440, { size: 120, color: red, at: "wired" }), H("never seen that in funding news", 1100, 580, { size: 50, at: "never seen that" })],
  },
  {
    at: "And OpenAI's numbers, as he",
    items: [BARS("OpenAI, one quarter", [
      { label: "Revenue", value: 10, text: "$10B", at: "$10 billion of revenue" },
      { label: "Loss", value: 10.9, text: "$10.9B", hi: true, at: "$10.9 billion" },
    ], { note: "margins: -150% → -100%", noteAt: "minus 100%" })],
  },
  {
    at: "He expects OpenAI to need",
    items: [I("money", 400, 430, 2), T("NEXT RAISE:", 1100, 290, { size: 100 }), T("EARLY 2027", 1100, 430, { size: 120, color: red, at: "early next year" }), H("big backers: only a few hundred million", 1100, 570, { size: 48, at: "few hundred million" })],
  },
  {
    at: "So his question is blunt.",
    items: [P(ZITRON, 400, 450, 440, 520), T("WHO'S LEFT", 1100, 300, { size: 120 }), T("TO FUND OPENAI?", 1100, 450, { size: 100, color: red, at: "fund OpenAI" })],
  },
  {
    at: "And the biggest supplier of",
    items: [I("chip", 800, 380, 2.4), T("...WENT QUIET", 800, 640, { size: 120, color: red, at: "went quiet" })],
  },
];

const S03: Beat[] = [
  { at: "Part three. The missing filing.", items: title("EXHIBIT 3", "THE MISSING FILING", "scroll") },
  {
    at: "Nvidia reported earnings this week,",
    items: [I("chart", 400, 430, 2), T("RECORD NUMBERS", 1100, 280, { size: 96, at: "record numbers" }), H("beat expectations", 1100, 410, { size: 56, at: "beat expectations" }), H("raised the forecast", 1100, 500, { size: 56, at: "raised forecast" }), H("interim CEO: Colette Kress", 1100, 610, { size: 48, at: "Colette Kress" })],
  },
  {
    at: "But Zitron spotted what wasn't",
    items: [TIMELINE("Nvidia's quarterly report (10-Q)", [
      { label: "Earnings out", text: "THIS WEEK", at: "alongside earnings" },
      { label: "10-Q: nothing yet", text: "MISSING", hi: true, at: "This time, nothing" },
      { label: "Filing deadline", text: "DEC 4", at: "December 4th" },
    ], { note: "Kress: \"within the coming weeks\"", noteAt: "coming weeks" })],
  },
  {
    at: "Bulls say it's just extra",
    items: [I("scales", 400, 430, 2), T("BULLS: EXTRA CHECKS", 1100, 280, { size: 80, at: "extra checks" }), T("ZITRON: UNCONVINCED", 1100, 410, { size: 80, color: red, at: "isn't convinced" }), H("\"we need answers from Nvidia\"", 1100, 560, { size: 52, at: "need answers" })],
  },
  {
    at: "On the scandal, he cites",
    items: [N(12, 800, 320, { prefix: "~$", suffix: "B", size: 200, at: "$12 billion" }), H("chip sales via Megaspeed (WSJ)", 800, 480, { size: 60 }), T("REPORTS, NOT FINDINGS", 800, 630, { size: 90, color: red, at: "not findings" })],
  },
  {
    at: "Then his guest, Steve from",
    items: [LINE("Nvidia revenue booked to Singapore", [
      { label: "one quarter", value: 0.76, text: "$0.76B", at: "$760 million" },
      { label: "a year later", value: 4, text: "$4B", at: "$4 billion" },
      { label: "fiscal year", value: 24, text: "$24B", at: "$24 billion" },
      { label: "now", value: 0, text: "GONE", hi: true, at: "vanished" },
    ])],
  },
  {
    at: "Steve's question: a company",
    items: [I("magnifier", 400, 430, 2), T("TRACKS A LEAKED", 1100, 270, { size: 90, at: "leaks to a reviewer" }), T("DRIVER...", 1100, 390, { size: 100 }), T("BUT NOT ITS CHIPS?", 1100, 530, { size: 90, color: red, at: "own chips" })],
  },
  {
    at: "One more thing doesn't add",
    items: [I("scales", 400, 430, 2), T("PROMISE: +70%", 1100, 290, { size: 100, at: "70% growth" }), T("WORRY: A GLUT", 1100, 430, { size: 100, color: red, at: "glut" }), H("you can't easily have both", 1100, 570, { size: 54, at: "have both" })],
  },
  {
    at: "The board, he says, has",
    items: [I("crown", 800, 360, 2.4), X(800, 360, 170, { at: "isn't coming back" }), T("WHO CAN DO WHAT HE DID?", 800, 640, { size: 90, color: red, at: "what he did" })],
  },
];

const S04: Beat[] = [
  { at: "Part four. Nobody can replace", items: title("EXHIBIT 4", "NOBODY CAN REPLACE HIM", "chess") },
  {
    at: "The reassurance goes: whatever",
    items: [I("chip", 400, 430, 2), T("\"AMD & BROADCOM", 1100, 300, { size: 90 }), T("WILL PICK IT UP\"", 1100, 430, { size: 96, at: "pick up" }), H("Zitron: misses what Jensen did", 1100, 570, { size: 50, color: red, at: "misses" })],
  },
  {
    at: "Start with cash. Over the",
    items: [BARS("Free cash flow, last 12 months", [
      { label: "Apple", value: 136, text: "$136B", at: "Apple" },
      { label: "Nvidia", value: 127, text: "$127B", at: "Nvidia, about" },
      { label: "Microsoft", value: 76, text: "$76B", at: "Microsoft, around" },
      { label: "Broadcom", value: 39, text: "$39B", hi: true, at: "And Broadcom" },
    ], { note: "about a quarter of Nvidia's", noteAt: "quarter of Nvidia's" })],
  },
  {
    at: "Broadcom, he says, already broke",
    items: [I("briefcase", 400, 430, 2), T("GOLDEN RULE:", 1100, 270, { size: 90 }), T("NEVER HOLD", 1100, 390, { size: 100 }), T("THE BAGS", 1100, 510, { size: 110, color: red, at: "customers' bags" })],
  },
  {
    at: "He says Broadcom is backstopping",
    items: [FLOW("ANTHROPIC", [
      { label: "Broadcom backstop", hi: true, at: "backstopping" }, { label: "$60B debt", at: "$60 billion" }, { label: "Leased chips", at: "lease chips" },
    ], { dir: "loop", title: "Holding a customer's bag" })],
  },
  {
    at: "Then there were the giant",
    items: [I("scroll", 400, 430, 2), T("$500B FUND:", 1100, 280, { size: 100, at: "half-trillion" }), T("\"NOT MEANINGFUL\"", 1100, 410, { size: 96, color: red, at: "isn't meaningful" }), H("$100B OpenAI plan: \"never a commitment\"", 1100, 560, { size: 46, at: "never a commitment" })],
  },
  {
    at: "And Nvidia kept writing smaller",
    items: [N(3, 800, 320, { prefix: "~$", suffix: "B", size: 220, at: "$3 billion" }), H("to Perplexity, a big buyer of compute", 800, 480, { size: 58, at: "buys so much" }), I("money", 800, 680, 1.3)],
  },
  {
    at: "His conclusion: this industry ran",
    items: [P(ZITRON, 400, 450, 440, 520), T("JENSEN'S WORD", 1100, 280, { size: 100, at: "Jensen's word" }), T("+ NVIDIA'S CASH", 1100, 410, { size: 96, at: "balance sheet" }), H("\"collect prepayments\" = a warning", 1100, 560, { size: 50, color: red, at: "prepayments" })],
  },
  {
    at: "If this helps you follow",
    items: [I("bell", 800, 360, 2.2, { at: "subscribe to catch" }), O(800, 360, 170, 170, red, { at: "subscribe to catch" }), T("NEXT CASE FILE", 800, 640, { size: 100, color: red, at: "next case file" })],
  },
  {
    at: "Because without that backstop, some",
    items: [T("WITHOUT", 800, 300, { size: 130 }), T("THE BACKSTOP...", 800, 460, { size: 120, color: red, at: "very exposed" })],
  },
];

const S05: Beat[] = [
  { at: "Part five. The death watch.", items: title("EXHIBIT 5", "THE DEATH WATCH", "skull") },
  {
    at: "So who's most exposed? Zitron",
    items: [FLOW("", [
      { label: "Debt", at: "borrow money" }, { label: "Nvidia chips", at: "buy Nvidia" }, { label: "Collateral", at: "collateral" },
      { label: "AI customers", hi: true, at: "rent the computing" },
    ], { dir: "loop", title: "The neocloud loop" })],
  },
  {
    at: "He's put two of them",
    items: [TIMELINE("Zitron's death watch", [
      { label: "Nscale: needs more money", text: "NSCALE", hi: true, at: "Nscale" },
      { label: "$45B West Virginia site", text: "BACKING?", at: "$45 billion" },
      { label: "Firmus: IPO cut, then pulled", text: "FIRMUS", hi: true, at: "Firmus" },
      { label: "Lambda hopes to list", text: "NEXT YEAR", at: "Lambda" },
    ])],
  },
  {
    at: "Why does Jensen matter here?",
    items: [I("lockbox", 400, 430, 2), T("\"IS NVIDIA", 1100, 290, { size: 110, at: "one question" }), T("BACKING THIS?\"", 1100, 430, { size: 110, color: red }), H("\"still waiting\" = no money", 1100, 570, { size: 54, at: "doesn't come" })],
  },
  {
    at: "It only takes one, he",
    items: [I("domino", 400, 430, 2), T("ONE INSOLVENCY", 1100, 290, { size: 96, color: red, at: "One insolvency" }), H("same chips, same customers", 1100, 420, { size: 56, at: "same chips" }), H("every floor on one beam", 1100, 520, { size: 56, at: "one beam" })],
  },
  {
    at: "Steve offers a fair counterpoint.",
    items: [I("scales", 400, 430, 2), T("COUNTERPOINT", 1100, 270, { size: 100 }), H("Steve, Gamers Nexus", 1100, 390, { size: 56 }), T("\"ALL PART OF THIS\"", 1100, 520, { size: 90, color: red, at: "all part of this" })],
  },
  {
    at: "So what does all this",
    items: [I("person", 800, 380, 2.4), T("NEVER BOUGHT A SHARE?", 800, 640, { size: 96, color: red, at: "single share" })],
  },
];

const S06: Beat[] = [
  { at: "Part six. Who pays?", items: title("EXHIBIT 6", "WHO PAYS?", "person") },
  {
    at: "Start with gamers. Steve doesn't",
    items: [I("gamepad", 400, 430, 2), T("GAMERS", 1100, 280, { size: 110 }), H("GPU prices won't fall soon", 1100, 410, { size: 56, at: "fall any time" }), H("no flood of cheap used parts", 1100, 510, { size: 56, at: "cheap used" })],
  },
  {
    at: "Then towns. Steve describes a",
    items: [BARS("One data center", [
      { label: "Tax breaks", value: 77, text: "$77M", hi: true, at: "$77 million" },
      { label: "Employees", value: 20, text: "< 20", at: "Fewer than 20" },
      { label: "Jobs after build", value: 55, text: "50-60", at: "50 or 60" },
    ], { note: "local hires: security, landscaping, cleaning", noteAt: "cleaning" })],
  },
  {
    at: "And the planned West Virginia",
    items: [I("tree", 400, 430, 2), T("WEST VIRGINIA", 1100, 300, { size: 100 }), H("a chestnut forest at risk", 1100, 430, { size: 56, at: "chestnut-producing" }), T("\"NOT THE BILLIONAIRES\"", 1100, 560, { size: 84, color: red, at: "Not the billionaires" })],
  },
  {
    at: "Then the economy. Zitron argues",
    items: [I("factory", 400, 430, 2), T("MORE CHIPS =", 1100, 300, { size: 110 }), T("MORE GROWTH?", 1100, 440, { size: 110, color: red }), H("Zitron: oversold", 1100, 580, { size: 56, at: "oversold" })],
  },
  {
    at: "Steve's version of the",
    items: [T("\"GPUS = GDP\"", 800, 300, { size: 170, at: "GPUs equal GDP" }), H("stats may have overstated software's growth since 2022", 800, 480, { size: 48, at: "overstated" }), H("his argument, not a settled finding", 800, 590, { size: 54, color: red, at: "settled finding" })],
  },
  {
    at: "So here's your watch list.",
    items: [TIMELINE("Your watch list", [
      { label: "Nvidia files its 10-Q", text: "DEC 4", hi: true, at: "December 4th" },
      { label: "Anthropic vs the $21B bar", text: "THIS QTR", at: "$21 billion" },
      { label: "OpenAI's next raise", text: "EARLY 2027", at: "raise money" },
      { label: "A neocloud runs out of road", text: "ANY DAY", at: "out of road" },
    ])],
  },
  {
    at: "To be fair to the",
    items: [I("scales", 400, 430, 2), T("THE BALANCE", 1100, 260, { size: 96 }), H("Nvidia: record numbers", 1100, 380, { size: 56, at: "record numbers" }), H("Anthropic: above its listing price", 1100, 480, { size: 52, at: "listing price" }), T("\"A CONFIDENCE GAME\"", 1100, 610, { size: 80, color: red, at: "confidence game" }), H("not financial advice", 1100, 720, { size: 46, at: "not financial advice" })],
  },
  {
    at: "That's an hour and a",
    items: [
      T("90 MIN → 10 MIN", 800, 230, { size: 86 }),
      H("full episodes in the description", 800, 390, { size: 56, at: "linked below" }),
      I("bell", 800, 690, 1.4, { at: "subscribe" }),
      O(800, 690, 120, 120, red, { at: "subscribe" }),
    ],
  },
];

export const EP11_SCENES: Record<string, Beat[]> = { S00, S01, S02, S03, S04, S05, S06 };
