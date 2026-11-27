import { Beat } from "../../board/Board";
import { H, I, N, O, P, T } from "../../board/dsl";
import { BARS, FLOW, LINE, SHEET, TIMELINE } from "../../board/charts";
import { theme } from "../../theme";

const { red, blue } = theme;

// Episode 13: Aswath Damodaran on Prof G Markets (host Ed Elson, Nov 20, recorded just before the
// Anthropic listing). Every number is his or the host's, as said in the episode; prices after the
// listing are from news reports (CNBC, Bloomberg). Photo: Aswath Damodaran, ICAI Singapore Chapter, CC BY 3.0.

const DAM = "thumbs/photo_damodaran.png";

const title = (n: string, name: string, icon: string): Beat["items"] => [
  T(n, 800, 200, { size: 70, color: blue }),
  T(name, 800, 360, { size: 100 }),
  I(icon, 800, 620, 1.5),
];

const S00: Beat[] = [
  {
    at: "Seventy-seven dollars.",
    drawn: true,
    items: [T("$77", 800, 330, { size: 260, color: red }), H("one share of Anthropic, by his math", 800, 530, { size: 60 })],
  },
  {
    at: "That's what Aswath Damodaran, the",
    items: [P(DAM, 400, 450, 440, 520), H("Aswath Damodaran, NYU", 1100, 260, { size: 56, at: "NYU professor" }), T("THE DEAN", 1100, 390, { size: 120, at: "dean of valuation" }), T("OF VALUATION", 1100, 520, { size: 100, color: red, at: "dean of valuation" })],
  },
  {
    at: "He worked it out minutes",
    items: [LINE("His value vs the market", [
      { label: "his value", value: 77, text: "$77", at: "worked it out" },
      { label: "IPO price", value: 83, text: "$83", at: "$83" },
      { label: "fell within a week", value: 79, text: "~$79", hi: true, at: "Within a week" },
    ])],
  },
  {
    at: "On Prof G Markets, he",
    items: [
      T("TODAY", 800, 170, { size: 90, color: red }),
      H("1. his math", 800, 300, { size: 64, at: "his math" }),
      H("2. \"designed in hell\"", 800, 410, { size: 64, at: "designed in hell" }),
      H("3. the one number", 800, 520, { size: 64, at: "one number" }),
      H("4. why he might still buy", 800, 630, { size: 64, at: "still buy" }),
    ],
  },
];

const S01: Beat[] = [
  { at: "Part one. The $77 math.", items: title("EXHIBIT 1", "THE $77 MATH", "calculator") },
  {
    at: "Damodaran first valued Anthropic on",
    items: [P(DAM, 400, 450, 440, 520), T("NOV 2 VALUATION", 1100, 300, { size: 90 }), T("\"A BIG, UPLIFTING STORY\"", 1100, 440, { size: 72, color: red, at: "uplifting story" })],
  },
  {
    at: "a trillion dollars in revenue",
    items: [SHEET("damodaran_anthropic.xlsx", [
      { label: "Revenue in ~10 years", text: "$1 trillion", at: "a trillion dollars" },
      { label: "Biggest company today", text: "under $1T a year", color: "amber", at: "more than any company" },
      { label: "Operating margin", text: "27.5%", at: "27.5%" },
      { label: "Cost of capital", text: "9.7%", at: "9.7%" },
    ], { formula: "=VALUE(anthropic)" })],
  },
  {
    at: "And one more step most",
    items: [FLOW("$1.475T", [
      { label: "The step most skip", at: "most people skip" },
      { label: "Compute contracts = debt", hi: true, at: "like debt" },
      { label: "~$500B, subtracted", at: "subtracted them" },
    ], { amount: "equity value" })],
  },
  {
    at: "Then the world changed.",
    items: [I("ballot", 400, 430, 2), T("THE MIDTERMS", 1100, 300, { size: 110, at: "midterm election" }), H("a Congress more hostile to data centers and AI", 1100, 430, { size: 44, color: red, at: "more hostile" })],
  },
  {
    at: "So he raised the cost",
    items: [BARS("His equity value", [
      { label: "Nov 2", value: 1475, text: "$1.475T", at: "raised the cost" },
      { label: "after the election", value: 1350, text: "$1.35T", hi: true, at: "$1.35 trillion" },
    ], { note: "pricier compute + regulatory drag", noteAt: "regulatory drag" })],
  },
  {
    at: "Then he divided by the",
    items: [I("calculator", 400, 430, 2), T("DIVIDE BY THE SHARES", 1100, 260, { size: 76 }), H("plus a big pile of options", 1100, 380, { size: 50, at: "options" }), T("= $77", 1100, 520, { size: 140, color: red, at: "$77 a share" })],
  },
  {
    at: "Moments later, the IPO priced",
    items: [P(DAM, 400, 450, 440, 520), H("IPO priced at $83", 1100, 260, { size: 56, at: "$83" }), T("\"IT TERRIFIES ME\"", 1100, 400, { size: 96, color: red, at: "terrifies me" }), H("so close to a banker's price", 1100, 530, { size: 52, at: "banker's price" })],
  },
  {
    at: "If you want the AI",
    items: [I("bell", 800, 360, 2.2, { at: "subscribe now" }), O(800, 360, 170, 170, red, { at: "subscribe now" }), T("THE AI MONEY STORY", 800, 640, { size: 90 }), H("explained every week", 800, 760, { size: 56, at: "every week" })],
  },
  {
    at: "So what did he expect",
    items: [T("WHAT DID HE", 800, 320, { size: 130 }), T("EXPECT NEXT?", 800, 480, { size: 130, color: red, at: "the market" })],
  },
];

const S02: Beat[] = [
  { at: "Part two. The bankers' game.", items: title("EXHIBIT 2", "THE BANKERS' GAME", "money") },
  {
    at: "Damodaran says bankers have one",
    items: [I("money", 400, 430, 2), T("BANKERS' ONE JOB:", 1100, 280, { size: 84 }), T("A DAY-ONE POP", 1100, 410, { size: 100, color: red, at: "pops on day one" }), H("his guess: open at $90-95", 1100, 540, { size: 52, at: "$90 to $95" })],
  },
  {
    at: "But he said the opening",
    items: [FLOW("THE SAME DOOR", [
      { label: "Opening price: irrelevant", at: "opening price is irrelevant" },
      { label: "The close matters", at: "where it closes" },
      { label: "Insiders can sell", hi: true, at: "insiders could" },
      { label: "Buyers coming in", at: "get in" },
    ])],
  },
  {
    at: "His line in the sand:",
    items: [N(71, 800, 330, { prefix: "$", suffix: "-72", size: 200, at: "$71" }), H("where it \"starts to get interesting\" for him", 800, 500, { size: 56, at: "get interesting" })],
  },
  {
    at: "Here's what happened. Anthropic opened",
    items: [LINE("ANT vs his number", [
      { label: "day 1 open", value: 111, text: "~$111", at: "$111" },
      { label: "day 1 close", value: 97, text: "~$97", at: "$97" },
      { label: "Nov 24", value: 82, text: "below $83", at: "below $83" },
      { label: "Nov 25", value: 79, text: "~$79", hi: true, at: "$79" },
    ], { note: "his value: $77", noteAt: "his $77" })],
  },
  {
    at: "But even at his number,",
    items: [I("lock", 400, 430, 2), T("\"IT NEEDS TO", 1100, 300, { size: 90, at: "drop a lot" }), T("DROP A LOT\"", 1100, 430, { size: 100, color: red, at: "drop a lot" }), H("and not because of AI", 1100, 570, { size: 52, at: "nothing to do with AI" })],
  },
];

const S03: Beat[] = [
  { at: "Part three. Designed in hell.", items: title("EXHIBIT 3", "DESIGNED IN HELL", "fire") },
  {
    at: "Most tech founders keep control",
    items: [SHEET("anthropic_votes.xlsx", [
      { label: "Usual tech founders", text: "special voting shares", color: "amber", at: "special voting shares" },
      { label: "Anthropic's founder share", text: "1 share", color: "red", at: "single founder share" },
      { label: "Held by", text: "7 founders", at: "seven founders" },
      { label: "Share of the votes", text: "50.01%", color: "red", at: "50.01%" },
    ], { formula: "=CONTROL(founders)" })],
  },
  {
    at: "He calls the structure one",
    items: [P(DAM, 400, 450, 440, 520), T("\"DESIGNED IN HELL\"", 1100, 320, { size: 96, color: red, at: "designed in hell" }), H("for shareholders", 1100, 450, { size: 60, at: "for shareholders" })],
  },
  {
    at: "His comparison: the golden shares",
    items: [TIMELINE("Golden shares", [
      { label: "Governments privatize companies", text: "1980s-90s", at: "1980s" },
      { label: "Thatcher's Britain", text: "UK", at: "Thatcher's" },
      { label: "One share, a veto", text: "ANTHROPIC", hi: true, at: "One share" },
    ])],
  },
  {
    at: "And he sees a twist",
    items: [FLOW("FOUNDER SHARE", [
      { label: "A twist they missed", at: "sees a twist" },
      { label: "An AI scandal", at: "causes a scandal" },
      { label: "Activist government", hi: true, at: "activist government" },
      { label: "Pays an ordinary price", at: "ordinary share" },
      { label: "Controls big decisions", at: "biggest decisions" },
      { label: "Founders could sue", at: "fight that in court" },
    ], { amount: "a target" })],
  },
  {
    at: "There's a practical problem too.",
    items: [I("hammer", 400, 430, 2), T("WHO MAKES THEM", 1100, 280, { size: 90 }), T("CHANGE COURSE?", 1100, 410, { size: 96, color: red, at: "change course" }), H("maybe only a falling stock price", 1100, 540, { size: 50, at: "falling stock price" })],
  },
  {
    at: "So what would make the",
    items: [T("WHAT MAKES", 800, 320, { size: 130 }), T("THE BUSINESS WORK?", 800, 480, { size: 110, color: red, at: "business itself work" })],
  },
];

const S04: Beat[] = [
  { at: "Part four. The one number.", items: title("EXHIBIT 4", "THE ONE NUMBER", "magnifier") },
  {
    at: "Damodaran's first rule of corporate",
    items: [I("scroll", 400, 430, 2), T("RULE #1:", 1100, 270, { size: 100 }), H("young, money-losing companies shouldn't borrow", 1100, 400, { size: 42, at: "shouldn't borrow" }), T("ANTHROPIC BROKE IT", 1100, 530, { size: 84, color: red, at: "broke it" })],
  },
  {
    at: "What buys time is cash.",
    items: [TIMELINE("The runway", [
      { label: "Cash after the IPO: ~$200B", text: "NOW", at: "$200 billion" },
      { label: "Covers the compute bills", text: "2-3 YEARS", at: "two or three years" },
      { label: "Revenue must double every year", text: "MEANWHILE", hi: true, at: "roughly doubles" },
    ])],
  },
  {
    at: "That's the one number he",
    items: [FLOW("REVENUE", [
      { label: "Profits come", at: "profits come" },
      { label: "Commitments paid", at: "commitments get paid" },
      { label: "Risk goes away", at: "risk goes away" },
      { label: "Or it all falls apart", hi: true, at: "falls apart" },
    ])],
  },
  {
    at: "Host Ed Elson pointed out",
    items: [BARS("Growth per quarter (host's figures)", [
      { label: "Q3", value: 47, text: "+47%", at: "47%" },
      { label: "now trending", value: 20, text: "15-25%", hi: true, at: "15 to 25%" },
    ])],
  },
  {
    at: "Damodaran blames competition: OpenAI underpricing,",
    items: [P(DAM, 400, 450, 440, 520), H("OpenAI underpricing + open models", 1100, 220, { size: 46, at: "OpenAI underpricing" }), T("\"MOST BUSINESSES", 1100, 330, { size: 80, at: "don't need Claude" }), T("DON'T NEED CLAUDE\"", 1100, 440, { size: 80, color: red, at: "don't need Claude" }), H("\"It's overkill\"", 1100, 550, { size: 56, at: "overkill" }), H("powerful enough, not too powerful", 1100, 640, { size: 44, at: "not too powerful" })],
  },
  {
    at: "And even if AI helps",
    items: [I("pill", 400, 430, 2), T("CURES FOR ALL OF US", 1100, 300, { size: 80, at: "all of us" }), T("NOT NECESSARILY PROFITS", 1100, 430, { size: 72, color: red, at: "shareholders" })],
  },
  {
    at: "So why hasn't he written",
    items: [T("SO WHY NOT", 800, 320, { size: 130 }), T("WRITE IT OFF?", 800, 480, { size: 130, color: red, at: "written it off" })],
  },
];

const S05: Beat[] = [
  { at: "Part five. Why he might", items: title("EXHIBIT 5", "WHY HE MIGHT STILL BUY", "scales") },
  {
    at: "Damodaran thinks AI ends up",
    items: [I("crown", 400, 430, 2), T("2-3 BIG PLAYERS", 1100, 280, { size: 96, at: "two or three" }), H("Anthropic: the most business-focused", 1100, 410, { size: 50, at: "business customers" }), H("agents learn a bank's data", 1100, 500, { size: 46, at: "agents learn" }), T("STICKY AGENTS", 1100, 610, { size: 90, color: red, at: "sticky" })],
  },
  {
    at: "So his $1.475 trillion is,",
    items: [P(DAM, 400, 450, 440, 520), T("\"OPTIMIST HAT", 1100, 280, { size: 90, at: "optimist hat" }), T("FIRMLY ON\"", 1100, 400, { size: 100, color: red, at: "firmly on" }), H("buy at a discount", 1100, 520, { size: 52, at: "at a discount" }), H("one company in a portfolio, never a big bet", 1100, 600, { size: 44, at: "big bet" })],
  },
  {
    at: "The same rule applies to",
    items: [SHEET("damodaran_nvidia.xlsx", [
      { label: "Shares bought in 2018", text: "sold", color: "amber", at: "bought in 2018" },
      { label: "Limit order to buy back", text: "$140", color: "lime", at: "$140" },
      { label: "The bigger risk", text: "China, not the CEO", at: "China question" },
      { label: "Jensen coming back?", text: "\"unlikely\"", color: "red", at: "unlikely to come back" },
    ], { formula: "=DAMODARAN(nvidia)" })],
  },
  {
    at: "Five days later, Nvidia's board",
    items: [I("crown", 400, 430, 2), T("JENSEN IS BACK", 1100, 300, { size: 96, color: red, at: "reinstated him" }), H("even the best valuation is a forecast", 1100, 440, { size: 50, at: "a forecast" })],
  },
  {
    at: "His rule for both: concentrating",
    items: [T("ALL IN ON ONE", 800, 320, { size: 120 }), T("AI STOCK = DEADLY", 800, 480, { size: 110, color: red, at: "is deadly" })],
  },
];

const S06: Beat[] = [
  { at: "Part six. What it means", items: title("EXHIBIT 6", "WHAT IT MEANS FOR YOU", "person") },
  {
    at: "Ed Elson says that for",
    items: [I("bubble", 400, 430, 2), H("Ed Elson, host", 1100, 260, { size: 52 }), T("AI STOCKS:", 1100, 390, { size: 100, at: "AI stocks" }), T("\"POPPED\"", 1100, 530, { size: 120, color: red, at: "already popped" })],
  },
  {
    at: "Damodaran is more struck by",
    items: [P(DAM, 400, 450, 440, 520), H("the rest of the market held up", 1100, 260, { size: 50, at: "held up" }), T("CLOSER TO THE BOTTOM", 1100, 390, { size: 76, at: "closer to the bottom" }), H("than two months ago", 1100, 470, { size: 44, at: "two months ago" }), H("but timing the exact bottom is futile", 1100, 560, { size: 46, color: red, at: "futility" })],
  },
  {
    at: "So his advice for people",
    items: [TIMELINE("His advice", [
      { label: "Add some tech", text: "YES", at: "add some" },
      { label: "All your money", text: "NO", hi: true, at: "Not all your money" },
      { label: "Anthropic specifically", text: "MAYBE NOT", at: "not necessarily Anthropic" },
    ])],
  },
  {
    at: "The number to watch next",
    items: [T("WATCH: REVENUE", 800, 250, { size: 110 }), H("keeps doubling", 800, 360, { size: 56, at: "keeps doubling" }), H("= his trillion dollar story holds", 800, 430, { size: 52, at: "story holds" }), H("if not, $77 may still be too high", 800, 510, { size: 56, at: "too high" }), T("NOT FINANCIAL ADVICE", 800, 620, { size: 80, color: red, at: "not financial advice" })],
  },
  {
    at: "That was an hour of",
    items: [
      T("60 MIN → 8 MIN", 800, 200, { size: 86 }),
      H("full episode linked below", 800, 330, { size: 56, at: "linked below" }),
      T("WHICH PODCAST NEXT?", 800, 470, { size: 80, color: red, at: "break down next" }),
      I("bell", 800, 700, 1.4, { at: "subscribe" }),
      O(800, 700, 120, 120, red, { at: "subscribe" }),
    ],
  },
];

export const EP13_SCENES: Record<string, Beat[]> = { S00, S01, S02, S03, S04, S05, S06 };
