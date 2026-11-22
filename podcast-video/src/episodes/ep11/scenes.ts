import { Beat } from "../../board/Board";
import { A, H, I, O, P, T, X } from "../../board/dsl";
import { theme } from "../../theme";

const { red, blue } = theme;

// Episode 11: "Who pays now?" Better Offline: Into The Jensenverse w/ Gamers Nexus (Nov 18) +
// monologue "The Home Stretch" (Nov 20). S00 + part cards in the Halftone Dossier look.
// Predictions are labelled as Zitron's; allegations as reports; balance on screen.

const ZITRON = "thumbs/photo_zitron.png";

const title = (n: string, name: string, icon: string): Beat["items"] => [
  T(n, 800, 200, { size: 70, color: blue }),
  T(name, 800, 360, { size: 100 }),
  I(icon, 800, 620, 1.5),
];

const S00: Beat[] = [
  {
    at: "The last money out the",
    drawn: true,
    items: [P(ZITRON, 255, 470, 640, 820), T("THE LAST MONEY", 1120, 300, { size: 120 }), T("OUT THE DOOR", 1120, 450, { size: 140, color: red }), H("Ed Zitron on the Anthropic IPO", 1120, 600, { size: 54 })],
  },
  {
    at: "The shares are trading.",
    items: [I("chart", 400, 430, 2), T("ANTHROPIC", 1100, 300, { size: 110 }), T("IS PUBLIC", 1100, 440, { size: 120, color: red })],
  },
  {
    at: "Nvidia's required quarterly filing hasn't",
    items: [I("scroll", 400, 430, 2), T("NVIDIA 10-Q:", 1100, 300, { size: 110 }), T("NOT FILED YET", 1100, 440, { size: 110, color: red, at: "hasn't arrived" })],
  },
  {
    at: "And a half-trillion dollar fund",
    items: [I("money", 400, 430, 2), T("$500B FUND", 1100, 300, { size: 110 }), T("\"NOT MEANINGFUL\"", 1100, 440, { size: 100, color: red, at: "not to be meaningful" })],
  },
  {
    at: "This is an hour and",
    items: [P(ZITRON, 400, 450, 440, 520), T("ZITRON", 1100, 260, { size: 90 }), H("Better Offline", 1100, 390, { size: 56, at: "on Better Offline" }), T("90 MIN → 10 MIN", 1100, 540, { size: 96, color: red, at: "in ten minutes" })],
  },
];

const S01: Beat[] = [
  { at: "Part one. The debut.", items: title("EXHIBIT 1", "THE DEBUT", "bell") },
  {
    at: "Anthropic, the maker of Claude,",
    items: [I("chart", 400, 430, 2), T("LISTED: $83", 1100, 290, { size: 110 }), T("NOW: ~$100", 1100, 430, { size: 110, color: red, at: "struggling to stay above" }), H("\"not the massive return\"", 1100, 570, { size: 54, at: "massive return" })],
  },
  {
    at: "He is careful to add",
    items: [I("brain", 400, 430, 2), T("DAY-ONE PRICE", 1100, 300, { size: 100 }), H("says almost nothing about the company", 1100, 440, { size: 52, at: "says almost nothing" }), H("so: look at the business", 1100, 540, { size: 56, at: "looks at the business" })],
  },
  {
    at: "Growth first. Citing data from",
    items: [I("domino", 400, 430, 2), T("47% → 15-25%", 1100, 320, { size: 120, color: red, at: "fifteen to twenty-five percent" }), H("quarterly growth, per Ramp", 1100, 470, { size: 54 }), H("\"no longer rapid growth\"", 1100, 570, { size: 54, at: "no longer a company" })],
  },
  {
    at: "Then the bills. Anthropic has",
    items: [I("scroll", 400, 430, 2), T("$895B", 1100, 290, { size: 140, color: red }), H("of commitments, mostly compute", 1100, 430, { size: 54 }), T("$435B CAN'T BE CANCELLED", 1100, 560, { size: 70, at: "can't be cancelled" })],
  },
  {
    at: "He quotes a calculation from",
    items: [I("calculator", 400, 430, 2), T("NEEDS ~$600B/YR", 1100, 290, { size: 96, color: red, at: "six hundred billion" }), H("by 2030, per FT's Robert Armstrong", 1100, 430, { size: 50 }), H("Microsoft today: ~$331B", 1100, 540, { size: 56, at: "three hundred thirty-one" })],
  },
  {
    at: "To be fair, Anthropic now",
    items: [I("lockbox", 400, 430, 2), T("CASH: $200B+", 1100, 290, { size: 110 }), H("but big prepayments are coming", 1100, 430, { size: 54, at: "prepayments" }), T("Q4 BAR: $21B", 1100, 560, { size: 100, color: red, at: "twenty-one billion" })],
  },
];

const S02: Beat[] = [
  { at: "Part two. The last money", items: title("EXHIBIT 2", "THE LAST MONEY OUT THE DOOR", "door") },
  {
    at: "Here is the detail Zitron",
    items: [
      T("$26B INTO THE IPO", 800, 200, { size: 96, color: red, at: "twenty-six billion" }),
      H("Nvidia · Microsoft · Google · AMD", 800, 360, { size: 56, at: "Nvidia, Microsoft" }),
      H("TSMC · Broadcom · Micron", 800, 460, { size: 56, at: "TSMC" }),
      I("money", 800, 640, 1.4),
    ],
  },
  {
    at: "These are Anthropic's suppliers.",
    items: [I("network", 400, 430, 2), T("SUPPLIERS", 1100, 290, { size: 110 }), H("pumping up a customer", 1100, 430, { size: 56, at: "pumping up" }), T("\"LAST MONEY OUT\"", 1100, 560, { size: 90, color: red, at: "last money out" })],
  },
  {
    at: "That matters, he says, because",
    items: [I("money", 400, 430, 2), T("OPENAI RAISED $11B", 1100, 290, { size: 90 }), H("hoped for: $30B", 1100, 420, { size: 56, at: "hoping for thirty" }), H("\"wired and received\"?", 1100, 520, { size: 56, at: "wired and received" })],
  },
  {
    at: "And the numbers Zitron cites",
    items: [I("fire", 400, 430, 2), T("Q3 LOSS: $10.9B", 1100, 290, { size: 100, color: red, at: "ten point nine" }), H("on ~$10B of revenue", 1100, 430, { size: 56, at: "ten billion dollars of revenue" }), H("margin: -150% → -100%", 1100, 540, { size: 56, at: "minus one hundred percent" })],
  },
  {
    at: "Its newest model, he adds,",
    items: [I("robot", 400, 430, 2), T("A COLD RECEPTION", 1100, 330, { size: 96 }), H("even from the cheerleaders", 1100, 470, { size: 56, at: "cheer every release" })],
  },
  {
    at: "So what is the pitch",
    items: [I("question", 400, 430, 2), T("NEXT ROUND: Q1 2027", 1100, 290, { size: 90, at: "first quarter" }), H("worse economics, similar valuation", 1100, 430, { size: 52, at: "worse economics" }), T("BACKERS LOW ON CASH", 1100, 560, { size: 80, color: red, at: "running low on cash" })],
  },
  {
    at: "His question is simple. After",
    items: [P(ZITRON, 400, 450, 440, 520), T("ZITRON:", 1100, 260, { size: 84 }), T("\"WHO HAS THE", 1100, 390, { size: 90 }), T("MONEY LEFT?\"", 1100, 500, { size: 100, color: red, at: "who actually has the money" })],
  },
];

const S03: Beat[] = [
  { at: "Part three. The missing filing.", items: title("EXHIBIT 3", "THE MISSING FILING", "scroll") },
  {
    at: "Nvidia reported earnings this week",
    items: [I("chip", 400, 430, 2), T("BEAT & RAISE", 1100, 300, { size: 110 }), H("interim CEO Colette Kress", 1100, 440, { size: 56, at: "Colette Kress" })],
  },
  {
    at: "But Zitron points to what",
    items: [I("scroll", 400, 430, 2), X(400, 430, 110, { at: "it didn't" }), T("NO 10-Q (YET)", 1100, 290, { size: 110, color: red }), H("deadline: December 4", 1100, 430, { size: 56, at: "December fourth" }), H("\"within the coming weeks\"", 1100, 530, { size: 54, at: "coming weeks" })],
  },
  {
    at: "Bulls say the delay is",
    items: [I("scales", 400, 430, 2), T("BULLS: EXTRA CHECKS", 1100, 290, { size: 84 }), T("ZITRON: \"WE NEED ANSWERS\"", 1100, 430, { size: 76, color: red, at: "we need answers" })],
  },
  {
    at: "On the scandal itself, he",
    items: [I("magnifier", 400, 430, 2), T("~$12B VIA MEGASPEED", 1100, 290, { size: 84, color: red, at: "twelve billion" }), H("per the Wall Street Journal", 1100, 420, { size: 54 }), H("reports and allegations, not findings", 1100, 520, { size: 50, at: "not findings" })],
  },
  {
    at: "Steve from Gamers Nexus adds",
    items: [I("chart", 400, 430, 2), T("SINGAPORE", 1100, 270, { size: 100 }), H("$762M → $4B a quarter", 1100, 400, { size: 56, at: "four billion a year later" }), T("THEN: VANISHED", 1100, 530, { size: 100, color: red, at: "vanished" })],
  },
  {
    at: "He also flags a contradiction.",
    items: [T("GUIDANCE: +70%", 800, 260, { size: 110 }), T("VS", 800, 400, { size: 80, color: blue }), T("\"A GLUT\" AT TSMC", 800, 540, { size: 110, color: red, at: "glut" }), H("you can't easily have both", 800, 680, { size: 54, at: "have both" })],
  },
  {
    at: "And the board, he says,",
    items: [I("crown", 400, 430, 2), X(400, 430, 120, { at: "won't bring Jensen back" }), T("NO RETURN", 1100, 320, { size: 120, color: red }), H("can someone take his place?", 1100, 470, { size: 54, at: "take his place" })],
  },
];

const S04: Beat[] = [
  { at: "Part four. Nobody can replace", items: title("EXHIBIT 4", "NOBODY CAN REPLACE HIM", "chess") },
  {
    at: "He starts with cash. He",
    items: [
      T("FREE CASH FLOW, 12 MONTHS", 800, 180, { size: 76 }),
      H("Apple ~$136B", 800, 320, { size: 64, at: "Apple" }),
      H("Nvidia ~$127B", 800, 420, { size: 64, at: "Nvidia at about" }),
      H("Microsoft ~$76B", 800, 520, { size: 64, at: "Microsoft at around" }),
      T("BROADCOM ~$39B", 800, 660, { size: 90, color: red, at: "Broadcom, at about" }),
    ],
  },
  {
    at: "And Broadcom, he says, has",
    items: [I("briefcase", 400, 430, 2), T("\"NEVER HOLD YOUR", 1100, 280, { size: 84 }), T("CUSTOMERS' BAGS\"", 1100, 390, { size: 96, color: red }), H("Broadcom: ~$60B Anthropic backstop", 1100, 520, { size: 50, at: "sixty billion" })],
  },
  {
    at: "He points to Perplexity too,",
    items: [I("magnifier", 400, 430, 2), T("PERPLEXITY: ~$3B", 1100, 300, { size: 100 }), H("one of the few big compute buyers", 1100, 440, { size: 52, at: "meaningful amounts" })],
  },
  {
    at: "Then there are the big",
    items: [I("money", 400, 430, 2), T("$500B FUND?", 1100, 270, { size: 110 }), T("\"NOT MEANINGFUL\"", 1100, 400, { size: 100, color: red, at: "isn't meaningful" }), H("$100B OpenAI plan: \"never a commitment\"", 1100, 540, { size: 48, at: "never a commitment" })],
  },
  {
    at: "His conclusion: the industry ran",
    items: [I("hand", 400, 430, 2), T("JENSEN'S WORD", 1100, 270, { size: 100 }), H("+ Nvidia's balance sheet", 1100, 390, { size: 56, at: "balance sheet" }), T("\"GET PREPAYMENTS\"", 1100, 530, { size: 96, color: red, at: "prepayments" })],
  },
  {
    at: "If this video is helping",
    items: [I("bell", 800, 420, 2), T("CASE CONTINUES", 800, 230, { size: 90 }), O(800, 420, 160, 160, red, { at: "subscribing" })],
  },
];

const S05: Beat[] = [
  { at: "Part five. The death watch.", items: title("EXHIBIT 5", "THE DEATH WATCH", "skull") },
  {
    at: "Zitron's sharpest prediction is about",
    items: [I("server", 400, 430, 2), T("NEOCLOUDS", 1100, 270, { size: 110 }), H("debt → Nvidia chips → collateral", 1100, 400, { size: 54, at: "collateral" }), H("same few customers", 1100, 500, { size: 56, at: "same customers" })],
  },
  {
    at: "He has put two of",
    items: [I("skull", 400, 430, 2), T("DEATH WATCH:", 1100, 260, { size: 96, color: red }), H("Nscale: needs more money, $45B project", 1100, 390, { size: 50, at: "Nscale" }), H("Firmus: cut its IPO, then pulled it", 1100, 490, { size: 50, at: "Firmus" }), H("Lambda: hoping to list next year", 1100, 590, { size: 50, at: "Lambda" })],
  },
  {
    at: "His point is about confidence.",
    items: [I("house", 400, 430, 2), T("\"IS NVIDIA", 1100, 290, { size: 100 }), T("BACKING THIS?\"", 1100, 410, { size: 100, color: red, at: "is Nvidia backing this" }), H("no answer, no loan", 1100, 550, { size: 56, at: "doesn't come" })],
  },
  {
    at: "It doesn't need all of",
    items: [I("domino", 400, 430, 2), T("ONE FAILURE", 1100, 300, { size: 110, color: red }), H("could make lenders doubt the sector", 1100, 440, { size: 52, at: "whole sector" })],
  },
  {
    at: "His guest, Steve from the",
    items: [I("scales", 400, 430, 2), T("COUNTERPOINT", 1100, 270, { size: 100 }), H("Steve, Gamers Nexus", 1100, 390, { size: 56 }), T("\"ALL PART OF THIS\"", 1100, 520, { size: 90, color: red, at: "all part of this" })],
  },
];

const S06: Beat[] = [
  { at: "Part six. Who pays?", items: title("EXHIBIT 6", "WHO PAYS?", "person") },
  {
    at: "Start with gamers. Steve doesn't",
    items: [I("gamepad", 400, 430, 2), T("GAMERS", 1100, 280, { size: 110 }), H("prices won't drop soon", 1100, 410, { size: 56, at: "much better" }), H("no flood of cheap used parts", 1100, 510, { size: 56, at: "second-hand" })],
  },
  {
    at: "Then communities. Steve describes a",
    items: [I("factory", 400, 430, 2), T("$77M TAX BREAKS", 1100, 270, { size: 100, color: red, at: "seventy-seven million" }), T("< 20 EMPLOYEES", 1100, 400, { size: 100, at: "fewer than twenty" }), H("~50-60 jobs after construction", 1100, 530, { size: 52, at: "fifty or sixty" })],
  },
  {
    at: "And Steve mentions the planned",
    items: [I("tree", 400, 430, 2), T("WEST VIRGINIA", 1100, 300, { size: 100 }), H("a chestnut forest at risk", 1100, 430, { size: 56, at: "chestnut-producing" }), T("\"NOT THE BILLIONAIRES\"", 1100, 560, { size: 84, color: red, at: "Not the billionaires" })],
  },
  {
    at: "And the economy. Zitron argues",
    items: [I("chart", 400, 430, 2), T("\"GPUS = GDP\"?", 1100, 290, { size: 110 }), H("software's growth contribution overstated?", 1100, 430, { size: 48, at: "overstated" }), H("his argument, not a settled finding", 1100, 530, { size: 50, color: red, at: "settled finding" })],
  },
  {
    at: "So what should you watch?",
    items: [
      T("WATCH", 800, 170, { size: 110, color: red }),
      H("1. Nvidia's 10-Q by December 4", 800, 310, { size: 54, at: "December fourth" }),
      H("2. Anthropic vs the $21B bar", 800, 410, { size: 54, at: "twenty-one billion" }),
      H("3. OpenAI's next raise", 800, 510, { size: 54, at: "raise money early" }),
      H("4. A neocloud running out of road", 800, 610, { size: 54, at: "out of road" }),
    ],
  },
  {
    at: "This is Zitron's analysis, not",
    items: [I("scales", 400, 430, 2), T("THE BALANCE", 1100, 260, { size: 96 }), H("Nvidia: record numbers", 1100, 380, { size: 56, at: "record numbers" }), H("Anthropic: above its listing price", 1100, 480, { size: 52, at: "listing price" }), T("\"A CONFIDENCE GAME\"", 1100, 610, { size: 80, color: red, at: "confidence game" })],
  },
  {
    at: "This was an hour and",
    items: [
      T("90 MIN → 10 MIN", 800, 230, { size: 86 }),
      H("full episodes: Better Offline", 800, 390, { size: 56, at: "link to the full" }),
      I("bell", 800, 690, 1.4, { at: "subscribe" }),
      O(800, 690, 120, 120, red, { at: "subscribe" }),
    ],
  },
];

export const EP11_SCENES: Record<string, Beat[]> = { S00, S01, S02, S03, S04, S05, S06 };
