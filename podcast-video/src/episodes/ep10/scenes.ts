import { Beat } from "../../board/Board";
import { A, H, I, N, O, P, T, X } from "../../board/dsl";
import { theme } from "../../theme";

const { red, blue } = theme;

// Episode 10: Ed Zitron's week (Better Offline w/ Ed Elson + Tech Won't Save Us w/ Paris Marx).
// S00 and part cards render in the Halftone Dossier look (ep10-reel/film.js); the body in the dark
// motion look. Allegations are labelled as reports/allegations; China's denial and Jensen Huang's
// apology are on screen; no gossip, no insults.

const ZITRON = "thumbs/photo_zitron.png";

const title = (n: string, name: string, icon: string): Beat["items"] => [
  T(n, 800, 200, { size: 70, color: blue }),
  T(name, 800, 360, { size: 100 }),
  I(icon, 800, 620, 1.5),
];

const S00: Beat[] = [
  {
    at: "The AI bubble was one",
    drawn: true,
    items: [P(ZITRON, 255, 470, 640, 820), T("THE AI BUBBLE", 1120, 300, { size: 120 }), T("WAS ONE MAN", 1120, 450, { size: 140, color: red }), H("Ed Zitron's claim", 1120, 600, { size: 56 })],
  },
  {
    at: "Nvidia has shed about one",
    items: [I("chip", 400, 430, 2), T("-$1.5 TRILLION", 1100, 340, { size: 130, color: red }), H("Nvidia market value, in 5 weeks", 1100, 500, { size: 56, at: "in market value" })],
  },
  {
    at: "Anthropic cut its IPO price",
    items: [I("chart", 400, 430, 2), T("ANTHROPIC IPO", 1100, 300, { size: 110 }), T("PRICE CUT ~50%", 1100, 450, { size: 110, color: red, at: "nearly half" })],
  },
  {
    at: "And Zitron thinks OpenAI may",
    items: [I("question", 400, 430, 2), T("OPENAI:", 1100, 300, { size: 120 }), T("NEVER PUBLIC?", 1100, 450, { size: 120, color: red, at: "never go public" })],
  },
  {
    at: "This is two hours of",
    items: [
      P(ZITRON, 400, 450, 440, 520),
      T("ZITRON", 1100, 250, { size: 90 }),
      H("Better Offline · Tech Won't Save Us", 1100, 390, { size: 54, at: "Better Offline" }),
      T("2 HRS → 10 MIN", 1100, 540, { size: 100, color: red, at: "in ten minutes" }),
    ],
  },
];

const S01: Beat[] = [
  { at: "Part one. The man who", items: title("EXHIBIT 1", "THE MAN WHO HELD IT TOGETHER", "crown") },
  {
    at: "In twenty nineteen, Nvidia bought",
    items: [I("network", 400, 430, 2), T("2019: MELLANOX", 1100, 290, { size: 100 }), H("chips networked into one cluster", 1100, 430, { size: 54, at: "work as one cluster" }), H("then: OpenAI's supercomputer", 1100, 540, { size: 54, at: "Microsoft built" })],
  },
  {
    at: "Then ChatGPT arrived, at a",
    items: [I("rocket", 400, 430, 2), T("CHATGPT", 1100, 300, { size: 120 }), H("big tech growth had gone flat", 1100, 450, { size: 56, at: "gone flat" })],
  },
  {
    at: "In his telling, Jensen Huang",
    items: [I("chip", 400, 430, 2), T("\"BUY OUR CHIPS,", 1100, 290, { size: 84 }), T("DO AI\"", 1100, 410, { size: 110, color: red }), H("and the markets will love you", 1100, 540, { size: 54, at: "markets will love" })],
  },
  {
    at: "But Zitron's math is brutal.",
    items: [I("calculator", 400, 430, 2), T("SPENT: ~$1.4T", 1100, 300, { size: 110 }), T("MADE: ~$100B", 1100, 450, { size: 110, color: red, at: "one hundred billion" }), H("his estimate, from AI", 1100, 590, { size: 54 })],
  },
  {
    at: "So what kept it going?",
    items: [
      I("crown", 800, 420, 1.6),
      H("CoreWeave", 380, 250, { size: 54, at: "CoreWeave" }),
      A(560, 300, 700, 380, red),
      H("Poolside", 1220, 250, { size: 54, at: "Poolside" }),
      A(1040, 300, 900, 380, red),
      H("Hugging Face", 380, 640, { size: 54, at: "Hugging Face" }),
      A(560, 600, 700, 500, red),
      H("OpenAI · Anthropic", 1220, 640, { size: 54, at: "OpenAI and Anthropic" }),
      A(1040, 600, 900, 500, red),
      T("$30B+ RENT-BACKS", 800, 800, { size: 70, color: red, at: "thirty billion" }),
    ],
  },
  {
    at: "He compares Jensen to the",
    items: [I("mask", 400, 430, 2), T("\"THE KINGPIN\"", 1100, 320, { size: 110, color: red }), H("holding the whole city together", 1100, 470, { size: 54, at: "holding the whole city" })],
  },
  {
    at: "And there's a reason others",
    items: [I("money", 400, 430, 2), T("FREE CASH FLOW", 1100, 300, { size: 100 }), T("\"HEAVEN\"", 1100, 420, { size: 110, color: red, at: "heaven" }), H("rivals lacked the balance sheet", 1100, 560, { size: 54, at: "balance sheet" })],
  },
  {
    at: "Zitron is no fan of",
    items: [P(ZITRON, 400, 450, 440, 520), T("ZITRON", 1100, 260, { size: 80 }), T("\"MAN, COULD THAT", 1100, 400, { size: 84 }), T("MAN SELL\"", 1100, 510, { size: 100, color: red, at: "man, could that man sell" })],
  },
];

const S02: Beat[] = [
  { at: "Part two. The story everyone", items: title("EXHIBIT 2", "THE STORY EVERYONE IGNORED", "magnifier") },
  {
    at: "In late twenty twenty-five, the",
    items: [I("scroll", 400, 430, 2), T("MEGASPEED", 1100, 280, { size: 110 }), T("$4.8B OF CHIPS", 1100, 410, { size: 100, color: red, at: "four point eight billion" }), H("reported: NYT, Bloomberg (2025)", 1100, 550, { size: 52 })],
  },
  {
    at: "Bloomberg then found an almost",
    items: [I("mirror", 400, 430, 2), T("A TWIN COMPANY", 1100, 300, { size: 100 }), H("same website, same investor deck", 1100, 440, { size: 54, at: "same website" }), T("DATA CENTERS: CHINA", 1100, 570, { size: 76, color: red, at: "Chinese cities" })],
  },
  {
    at: "These are reports and allegations,",
    items: [I("scales", 400, 430, 2), T("ALLEGATIONS", 1100, 290, { size: 110 }), H("China denies the spying claims", 1100, 430, { size: 56, at: "China has denied" }), T("20%+ FROM CHINA", 1100, 570, { size: 90, color: red, at: "twenty percent or more" })],
  },
  {
    at: "That's over forty-three billion dollars.",
    items: [I("money", 400, 430, 2), T("~$43 BILLION", 1100, 300, { size: 130, color: red }), H("Culper Research estimate", 1100, 450, { size: 56 }), H("2025: sales booked by customer HQ", 1100, 560, { size: 52, at: "headquartered" })],
  },
  {
    at: "He describes another case from",
    items: [I("server", 400, 430, 2), T("SUPERMICRO CASE", 1100, 290, { size: 96 }), H("co-founder arrested, accused", 1100, 430, { size: 56, at: "was arrested" }), T("A HAIR DRYER?", 1100, 570, { size: 96, color: red, at: "hair dryer" })],
  },
  {
    at: "Then came the part that",
    items: [I("chip", 400, 430, 2), T("JENSEN HUANG", 1100, 280, { size: 100 }), H("admitted a relationship, apologized", 1100, 420, { size: 52, at: "apologized" }), T("STEPPED DOWN", 1100, 560, { size: 110, color: red, at: "stepped down" })],
  },
  {
    at: "Zitron calls the coverage one",
    items: [I("tv", 400, 430, 2), T("\"A MEDIA FAILURE\"", 1100, 320, { size: 96, color: red }), H("in plain sight for a year", 1100, 470, { size: 56, at: "plain sight" })],
  },
  {
    at: "His guest on Better Offline,",
    items: [I("question", 400, 430, 2), T("ED ELSON", 1100, 280, { size: 96 }), H("Prof G Markets", 1100, 400, { size: 52, at: "Prof G" }), T("WHAT DID JENSEN KNOW?", 1100, 540, { size: 80, color: red, at: "how much did Jensen" })],
  },
];

const S03: Beat[] = [
  { at: "Part three. The IPO that", items: title("EXHIBIT 3", "THE IPO THAT SHRANK", "cliff") },
  {
    at: "According to Ed Elson, it",
    items: [I("cliff", 400, 430, 2), T("HOPED: $2T", 1100, 280, { size: 110 }), T("NOW: $1-1.4T", 1100, 420, { size: 110, color: red, at: "one to one point four" }), H("raise: $100B → $65B", 1100, 560, { size: 56, at: "sixty-five billion" })],
  },
  {
    at: "Why the discount? Both men",
    items: [I("scroll", 400, 430, 2), T("$895 BILLION", 1100, 300, { size: 130, color: red, at: "eight hundred ninety-five" }), H("of commitments, mostly compute", 1100, 450, { size: 54 }), H("compute bill: $100-150B next year?", 1100, 560, { size: 52, at: "one hundred to one hundred fifty" })],
  },
  {
    at: "Meanwhile, growth is slowing.",
    items: [I("cliff", 400, 430, 2), T("150% → 47%", 1100, 330, { size: 130, color: red, at: "forty-seven percent" }), H("quarterly growth, per Zitron", 1100, 480, { size: 54 }), H("Ramp: even lower now", 1100, 580, { size: 54, at: "even lower" })],
  },
  {
    at: "That brief moment when Anthropic",
    items: [I("money", 400, 430, 2), T("\"PROFITABLE\"?", 1100, 300, { size: 120 }), H("a temporary compute discount", 1100, 450, { size: 56, at: "temporary discount" })],
  },
  {
    at: "But here's the balance. Elson",
    items: [I("scales", 400, 430, 2), T("ELSON:", 1100, 270, { size: 90 }), T("\"LESS DODGY\"", 1100, 400, { size: 110, color: red, at: "less dodgy" }), H("losses shown, no accounting tricks", 1100, 540, { size: 52, at: "income statement" })],
  },
  {
    at: "Zitron's sharper worry is about",
    items: [I("person", 400, 430, 2), T("GOOGLE IPO: $26B", 1100, 300, { size: 96, at: "twenty-six billion" }), T("ANTHROPIC: $1T+", 1100, 440, { size: 96, color: red, at: "over a trillion" }), H("where is the upside?", 1100, 580, { size: 56, at: "upside" })],
  },
  {
    at: "If this video is helping",
    items: [I("bell", 800, 420, 2), T("CASE CONTINUES", 800, 230, { size: 90 }), O(800, 420, 160, 160, red, { at: "subscribing" })],
  },
];

const S04: Beat[] = [
  { at: "Part four. Is the music", items: title("EXHIBIT 4", "IS THE MUSIC STILL PLAYING?", "piano") },
  {
    at: "Elson borrows a line from",
    items: [I("piano", 400, 430, 2), T("\"MARGIN CALL\"", 1100, 300, { size: 110 }), H("know when the music stops", 1100, 450, { size: 56, at: "about to stop" })],
  },
  {
    at: "His read: the music is",
    items: [
      T("STILL PLAYING", 800, 200, { size: 96, color: blue }),
      H("Meta stock sale: 5x oversubscribed", 800, 360, { size: 56, at: "five times oversubscribed" }),
      H("Amazon bonds: $60B+ in orders", 800, 470, { size: 56, at: "sixty billion" }),
      H("Microsoft: record demand", 800, 580, { size: 56, at: "Microsoft" }),
    ],
  },
  {
    at: "But the notes are going",
    items: [I("thermometer", 400, 430, 2), T("OUT OF TUNE", 1100, 290, { size: 110, color: red }), H("CoreWeave bond yields soar", 1100, 430, { size: 54, at: "CoreWeave" }), H("OpenAI cuts its target", 1100, 530, { size: 54, at: "funding target" })],
  },
  {
    at: "The bigger shift, he says,",
    items: [I("creditCard", 400, 430, 2), T("~$1T OF DEBT", 1100, 300, { size: 120, color: red, at: "nearly a trillion" }), H("big cloud firms, by 2028", 1100, 450, { size: 56 }), H("Meta: $60B equity raise", 1100, 550, { size: 54, at: "sixty billion dollar equity" })],
  },
  {
    at: "Zitron puts it in one",
    items: [T("STOCKS = EXCITEMENT", 800, 300, { size: 100 }), T("BONDS = FEAR", 800, 450, { size: 120, color: red, at: "how scared" }), H("junk rating would shut out pension funds", 800, 600, { size: 52, at: "below investment grade" })],
  },
  {
    at: "And venture capital? Asked what",
    items: [I("dice", 400, 430, 2), T("VENTURE CAPITAL", 1100, 320, { size: 100 }), H("\"the easiest crowd of all\"", 1100, 460, { size: 56, at: "easiest crowd" })],
  },
];

const S05: Beat[] = [
  { at: "Part five. OpenAI, ten times", items: title("EXHIBIT 5", "OPENAI: TEN TIMES WORSE?", "skull") },
  {
    at: "Elson's view is blunt. Whatever",
    items: [I("fire", 400, 430, 2), T("ANTHROPIC: -$1B+", 1100, 290, { size: 96, at: "a little over a billion" }), T("OPENAI: -$20B+", 1100, 430, { size: 110, color: red, at: "more than twenty billion" }), H("operating losses, per Elson", 1100, 570, { size: 54 })],
  },
  {
    at: "Then there's the fundraising. According",
    items: [I("money", 400, 430, 2), T("ASKED: $30B", 1100, 290, { size: 110 }), T("GOT: $11B", 1100, 430, { size: 120, color: red, at: "came back with eleven" }), H("about one quarter's operating loss", 1100, 570, { size: 52, at: "one quarter's" })],
  },
  {
    at: "And OpenAI, he says, has",
    items: [I("scroll", 400, 430, 2), T("$750B", 1100, 290, { size: 130, color: red }), H("commitments through 2030", 1100, 430, { size: 54 }), H("\"stop using run rates\"", 1100, 540, { size: 56, at: "stop using run rates" })],
  },
  {
    at: "His prediction is the boldest",
    items: [P(ZITRON, 400, 450, 440, 520), T("ZITRON:", 1100, 260, { size: 84 }), T("MAY NEVER IPO", 1100, 390, { size: 110, color: red }), H("80% of revenue from 1% of customers", 1100, 530, { size: 50, at: "one percent of customers" })],
  },
  {
    at: "Elson expects a different path:",
    items: [I("stairs", 400, 430, 2), T("DOWN ROUNDS", 1100, 290, { size: 110 }), T("\"THEY WILL LET YOU DIE\"", 1100, 430, { size: 80, color: red, at: "let you die" })],
  },
  {
    at: "Zitron adds that venture capital",
    items: [I("dice", 400, 430, 2), T("$0.90-$1.30", 1100, 300, { size: 120, color: red }), H("back per $1 invested in VC", 1100, 450, { size: 54 }), H("since the late 2010s", 1100, 550, { size: 54 })],
  },
];

const S06: Beat[] = [
  { at: "Part six. Without Jensen.", items: title("EXHIBIT 6", "WITHOUT JENSEN", "crown") },
  {
    at: "This is where Zitron's opening",
    items: [I("crown", 400, 430, 2), X(400, 430, 120, { at: "Without Jensen backstopping" }), T("\"A CONFIDENCE GAME\"", 1100, 300, { size: 90, color: red, at: "confidence game" }), H("must keep growing every year", 1100, 450, { size: 54, at: "every single year" })],
  },
  {
    at: "He points to Elon Musk,",
    items: [I("rocket", 400, 430, 2), T("$40B FOR GPUS?", 1100, 320, { size: 110, color: red, at: "forty billion" }), H("would a bank lend that today?", 1100, 470, { size: 54, at: "walking into a bank" })],
  },
  {
    at: "Nvidia's new chief executive is",
    items: [I("briefcase", 400, 430, 2), T("NEW CEO:", 1100, 270, { size: 90 }), T("COLETTE KRESS", 1100, 390, { size: 100, color: red }), H("\"careful and dull\"", 1100, 520, { size: 56, at: "careful and dull" }), H("\"the beginning of the unraveling\"", 1100, 620, { size: 52, at: "unraveling" })],
  },
  {
    at: "Now the balance. Elson's view",
    items: [I("scales", 400, 430, 2), T("THE BALANCE", 1100, 260, { size: 96 }), H("Elson: music still plays for the strongest", 1100, 390, { size: 50 }), H("Zitron: \"Nvidia is not Enron\"", 1100, 490, { size: 54, at: "not Enron" }), T("ALLEGATIONS, NOT VERDICTS", 1100, 610, { size: 70, color: red, at: "not verdicts" })],
  },
  {
    at: "So what should you watch?",
    items: [
      T("WATCH", 800, 200, { size: 110, color: red }),
      H("1. Anthropic's shares after the IPO", 800, 350, { size: 56, at: "after the IPO" }),
      H("2. Lenders and AI debt", 800, 460, { size: 56, at: "lenders keep funding" }),
      H("3. OpenAI's next round", 800, 570, { size: 56, at: "next round" }),
      H("their analysis, not financial advice", 800, 690, { size: 50, color: red, at: "not financial advice" }),
    ],
  },
  {
    at: "If Zitron is right, the",
    items: [P(ZITRON, 400, 450, 440, 520), T("A SALES STORY", 1100, 330, { size: 110, color: red, at: "sales story" }), H("and the best salesman just left", 1100, 480, { size: 56, at: "left the stage" })],
  },
  {
    at: "This was two hours in",
    items: [
      T("2 HRS → 10 MIN", 800, 230, { size: 86 }),
      H("full episodes: Better Offline · Tech Won't Save Us", 800, 390, { size: 54, at: "links to both" }),
      I("bell", 800, 690, 1.4, { at: "subscribe" }),
      O(800, 690, 120, 120, red, { at: "subscribe" }),
    ],
  },
];

export const EP10_SCENES: Record<string, Beat[]> = { S00, S01, S02, S03, S04, S05, S06 };
