import { Beat } from "../../board/Board";
import { A, H, I, O, P, T, X } from "../../board/dsl";
import { theme } from "../../theme";

const { red, blue } = theme;

// Episode 9: Mark Cuban di The Diary of a CEO (bubble, utang AI, "AI is not smart").
// Mengikuti storybook/ep9/storybook.txt. Semua klaim dibingkai sebagai pandangan Cuban;
// bantahan Steven Bartlett ikut ditampilkan. Foto: Wikimedia Commons (lihat YOUTUBE.md).

const CUBAN = "thumbs/photo_cuban.png";
const BARTLETT = "thumbs/photo_bartlett.png";

const title = (n: string, name: string, icon: string): Beat["items"] => [
  T(n, 800, 200, { size: 70, color: blue }),
  T(name, 800, 360, { size: 100 }),
  I(icon, 800, 620, 1.5),
];

const S00: Beat[] = [
  {
    at: "Every year, America now pays",
    drawn: true,
    items: [P(CUBAN, 255, 470, 640, 820), T("$1 TRILLION", 1120, 320, { size: 170, color: red }), T("IN INTEREST", 1120, 490, { size: 110 }), H("every year, says Mark Cuban", 1120, 630, { size: 56 })],
  },
  {
    at: "AI giants borrowing more than",
    items: [I("server", 400, 430, 2.2), T("BORROWING", 1100, 330, { size: 100 }), T("> EARNING", 1100, 460, { size: 100, color: red }), H("the AI giants", 1100, 600, { size: 56 })],
  },
  {
    at: "We could be heading into",
    items: [I("bubble", 400, 430, 2.4), T("DEBT BUBBLE", 1100, 380, { size: 120, color: red, at: "debt bubble" }), H("his warning on The Diary of a CEO", 1100, 540, { size: 54 })],
  },
  {
    at: "So why is he sitting",
    items: [
      I("briefcase", 400, 430, 2),
      T("WHY CASH?", 1100, 280, { size: 120 }),
      H("the next crash is where", 1100, 430, { size: 56, at: "the next crash" }),
      T("THE REAL MONEY IS MADE", 1100, 550, { size: 70, color: red, at: "real money" }),
      H("90 min → 10 min", 1100, 680, { size: 54, at: "ninety-minute" }),
    ],
  },
];

const S01: Beat[] = [
  { at: "Part one. Everything is a", items: title("PART 1", "EVERYTHING IS A MEME STOCK", "cards") },
  {
    at: "do you think we're in",
    items: [P(BARTLETT, 400, 450, 440, 520), T("BARTLETT", 1100, 250, { size: 80 }), T("\"ARE WE IN A BUBBLE?\"", 1100, 390, { size: 80, color: red }), H("Cuban: yes, but not like dot-com", 1100, 530, { size: 54, at: "But not like the dot-com" })],
  },
  {
    at: "everything has become a meme",
    items: [I("cards", 400, 430, 2.2), T("EVERYTHING", 1100, 300, { size: 100 }), T("= MEME STOCK", 1100, 420, { size: 100, color: red }), H("Bitcoin · Micron · Google · Apple", 1100, 560, { size: 52, at: "Bitcoin" })],
  },
  {
    at: "miss its earnings forecast by",
    items: [I("coin", 400, 430, 2), T("1-PENNY MISS", 1100, 290, { size: 90 }), T("-18%", 1100, 450, { size: 160, color: red, at: "eighteen percent" }), H("real value didn't change 18%", 1100, 610, { size: 52, at: "real value" })],
  },
  {
    at: "trading stocks like baseball cards",
    items: [I("cards", 400, 430, 2.2), T("LIKE BASEBALL CARDS", 1100, 320, { size: 90, color: red }), H("no intrinsic value", 1100, 470, { size: 56, at: "no intrinsic value" }), H("only perceived value", 1100, 570, { size: 56, at: "perceived value" })],
  },
  {
    at: "started his career with baseball",
    items: [I("coin", 400, 430, 1.8), T("AGE 9", 1100, 300, { size: 110 }), T("25 CENTS → 50 CENTS", 1100, 450, { size: 80, color: red, at: "fifty cents" })],
  },
  {
    at: "So what pops this bubble?",
    items: [I("bubble", 400, 430, 2.2), I("pin", 570, 310, 1.2), T("WHAT POPS IT?", 1100, 300, { size: 110 }), T("\"NO IDEA\"", 1100, 440, { size: 110, color: red, at: "no idea" }), H("even Bartlett is tempted by Nvidia", 1100, 590, { size: 52, at: "tempting" })],
  },
  {
    at: "When the internet bubble burst",
    items: [I("monitor", 400, 430, 2), X(400, 430, 110, { at: "got crushed" }), T("DOT-COM CRASH", 1100, 290, { size: 100 }), H("Dell and Amazon crushed", 1100, 430, { size: 56, at: "got crushed" }), T("AMAZON TODAY: TRILLIONS", 1100, 570, { size: 70, color: red, at: "worth trillions" })],
  },
  {
    at: "Is it Anthropic? Is it",
    items: [I("question", 400, 430, 2), T("WHO WINS?", 1100, 320, { size: 110 }), H("Anthropic? OpenAI?", 1100, 460, { size: 56 }), H("\"I don't know\"", 1100, 570, { size: 60, color: red, at: "He doesn't know" })],
  },
  { at: "Debt. A lot of it.", items: [T("DEBT", 800, 300, { size: 200, color: red }), I("chain", 800, 600, 3)] },
];

const S02: Beat[] = [
  { at: "Part two. The debt behind", items: title("PART 2", "THE DEBT BEHIND THE BOOM", "chain") },
  {
    at: "AI keeps getting cheaper to",
    items: [I("battery", 400, 430, 2), T("CHEAPER...", 1100, 300, { size: 100 }), H("because they borrow and spend", 1100, 450, { size: 56, at: "keep borrowing" }), H("more power, more chips", 1100, 550, { size: 56, at: "more power" })],
  },
  {
    at: "the so-called hyperscalers, are, in",
    items: [I("creditCard", 400, 430, 2.2), T("BORROWING", 1100, 280, { size: 100 }), T("> MAKING", 1100, 400, { size: 100, color: red, at: "more than they're making" }), H("Meta: more than its cash flow?", 1100, 540, { size: 54, at: "Meta" })],
  },
  {
    at: "Nvidia, a company he's a",
    items: [I("chip", 400, 430, 2), T("NVIDIA", 1100, 280, { size: 100 }), T("SUBSIDIZING HALF", 1100, 400, { size: 90, color: red, at: "subsidizing half" }), H("the industry", 1100, 520, { size: 56 })],
  },
  {
    at: "Now add the government.",
    items: [I("temple", 400, 430, 2), T("+ GOVERNMENT", 1100, 300, { size: 100 }), H("deficits → more borrowing", 1100, 450, { size: 56, at: "deficits" })],
  },
  {
    at: "already paying around a trillion",
    items: [I("money", 400, 430, 2), T("$1 TRILLION", 1100, 300, { size: 140, color: red }), H("a year, in interest", 1100, 450, { size: 56, at: "in interest" }), H("same lenders → rates go up", 1100, 570, { size: 56, at: "rates go up" })],
  },
  {
    at: "If you owe forty billion",
    items: [I("thermometer", 400, 430, 2), T("$40B DEBT", 1100, 290, { size: 110 }), H("+ rising rates", 1100, 430, { size: 56, at: "rates keep climbing" }), T("CAN'T RAISE MONEY", 1100, 570, { size: 76, color: red, at: "can't raise money" })],
  },
  {
    at: "Something gets crowded out.",
    items: [I("box", 400, 430, 2), T("CROWDED OUT", 1100, 280, { size: 100 }), H("\"not enough of a financial expert\"", 1100, 420, { size: 52, at: "financial expert" }), T("SOMETHING GIVES", 1100, 560, { size: 100, color: red, at: "going to give" })],
  },
  {
    at: "end up as pickleball courts",
    items: [I("server", 330, 430, 1.8), A(480, 430, 600, 430, red), I("paddle", 720, 430, 1.6), T("PICKLEBALL COURTS?", 1250, 320, { size: 76, color: red }), H("goal: less power doing more", 1250, 470, { size: 52, at: "less power doing more" })],
  },
  {
    at: "the man who built Broadcast",
    items: [I("monitor", 400, 430, 2), T("BROADCAST.COM", 1100, 290, { size: 100 }), H("\"streaming was a joke\"", 1100, 430, { size: 56, at: "streaming was a joke" }), T("MISUNDERSTOOD", 1100, 570, { size: 100, color: red, at: "misunderstood" })],
  },
];

const S03: Beat[] = [
  { at: "Part three. AI is not", items: title("PART 3", "\"AI IS NOT SMART\"", "robot") },
  {
    at: "predict the next word",
    items: [I("dice", 400, 430, 2), T("PREDICTS", 1100, 280, { size: 100 }), T("THE NEXT WORD", 1100, 400, { size: 100, color: red }), H("predictive, not deterministic", 1100, 540, { size: 56, at: "not deterministic" })],
  },
  {
    at: "Ask four different AIs the",
    items: [I("robot", 400, 430, 2), T("4 AIs", 1100, 290, { size: 120 }), T("= 4 ANSWERS", 1100, 430, { size: 110, color: red, at: "four different answers" }), H("no ethics, no sense of consequences", 1100, 580, { size: 52, at: "no built-in ethics" })],
  },
  {
    at: "always out of date",
    items: [I("clock", 400, 430, 2), T("ALWAYS OUT OF DATE", 1100, 340, { size: 90, color: red }), H("today's talk isn't in the model", 1100, 490, { size: 56, at: "today's conversations" })],
  },
  {
    at: "a seeing-eye dog beside him",
    items: [I("dog", 400, 430, 2.2), T("THE DOG", 1100, 290, { size: 120, color: red }), T("GOES FIRST", 1100, 420, { size: 110 }), H("not the best AI model", 1100, 560, { size: 56, at: "He'd let the dog" })],
  },
  {
    at: "a two-year-old in a high",
    items: [I("bottle", 400, 430, 2), T("TODDLER > AI", 1100, 320, { size: 110 }), H("knows mom comes running", 1100, 470, { size: 56, at: "mom comes running" }), H("\"AI is never going to figure that out\"", 1100, 580, { size: 52, color: red, at: "never going to figure" })],
  },
  {
    at: "Even the scary hacking stories",
    items: [I("lock", 400, 430, 2), I("key", 570, 570, 1), H("nothing new invented", 1100, 290, { size: 56, at: "Nothing new" }), T("BRUTE FORCE", 1100, 420, { size: 110, color: red, at: "brute force" }), H("defenders can use it too", 1100, 560, { size: 56, at: "defenders" }), H("not a doomer", 1100, 660, { size: 56, at: "not a doomer" })],
  },
  {
    at: "Bartlett pushes back hard.",
    items: [P(BARTLETT, 400, 450, 440, 520), T("BARTLETT", 1100, 260, { size: 80 }), T("\"ISN'T IT EXPONENTIAL?\"", 1100, 400, { size: 76, color: red, at: "look exponential" })],
  },
  {
    at: "His own Tesla drives itself",
    items: [I("car", 400, 430, 2.2), T("SELF-DRIVING", 1100, 290, { size: 100 }), H("crash rate reportedly lower", 1100, 430, { size: 56, at: "crash rate" }), T("DOESN'T THE CURVE WIN?", 1100, 570, { size: 70, color: red, at: "the curve win" })],
  },
  {
    at: "as long as there's a",
    items: [I("person", 330, 430, 1.6), I("robot", 620, 430, 1.6), T("DELAY = HUMAN EDGE", 1250, 320, { size: 76, color: red }), H("and yet: 25 AI agents", 1250, 470, { size: 52, at: "twenty-five AI agents" })],
  },
];

const S04: Beat[] = [
  { at: "Part four. Twenty-five agents on", items: title("PART 4", "25 AGENTS ON HIS PHONE", "phone") },
  {
    at: "this dwarfs everything before it",
    items: [I("wave", 400, 430, 2.2), T("\"DWARFS EVERYTHING\"", 1100, 320, { size: 90, color: red }), H("the biggest AI proponent there is", 1100, 470, { size: 52 })],
  },
  {
    at: "he finally read a non-fiction",
    items: [I("book", 400, 430, 2), T("FIRST BOOK", 1100, 290, { size: 100 }), T("IN 25 YEARS", 1100, 410, { size: 100, color: red }), H("agents do the tedious work", 1100, 550, { size: 56 })],
  },
  {
    at: "At Cost Plus Drugs, his",
    items: [I("pill", 400, 430, 2), T("COST PLUS DRUGS", 1100, 290, { size: 90 }), H("cheaper prescription medicine", 1100, 420, { size: 56, at: "cheaper prescription" }), H("vs. big healthcare conglomerates", 1100, 520, { size: 52, at: "conglomerates" })],
  },
  {
    at: "every time one of them",
    items: [I("magnifier", 400, 430, 2), T("AGENT ON WATCH", 1100, 280, { size: 100, color: red }), H("every lawsuit, every bid", 1100, 420, { size: 56, at: "bid on a contract" }), H("drafts the records requests", 1100, 520, { size: 56, at: "public records" }), H("before: it never got done", 1100, 620, { size: 56, at: "never got done" })],
  },
  {
    at: "Bartlett catches the obvious problem.",
    items: [I("briefcase", 400, 430, 2), T("WHAT ABOUT JOBS?", 1100, 290, { size: 90, color: red }), H("an intern at $15-20 an hour", 1100, 430, { size: 56, at: "intern" }), H("→ new ideas, new hires", 1100, 540, { size: 56, at: "new businesses" })],
  },
  {
    at: "He calls it creative destruction.",
    items: [I("cassette", 400, 430, 2.2), T("CREATIVE DESTRUCTION", 1100, 290, { size: 84, color: red }), H("records → CDs → DVDs", 1100, 430, { size: 56, at: "then CDs" }), X(400, 430, 110, { at: "Cassettes are gone" }), H("money in music isn't gone", 1100, 540, { size: 56, at: "Money in music" })],
  },
  { at: "painful for a lot of", items: [I("person", 400, 430, 2), T("IT WILL HURT", 1100, 380, { size: 110, color: red }), H("a lot of people", 1100, 520, { size: 56 })] },
  {
    at: "Learn agents. Anyone who does",
    items: [I("phone", 400, 430, 2), T("LEARN AGENTS", 1100, 280, { size: 110, color: red }), H("the edge isn't information", 1100, 430, { size: 56, at: "the edge isn't" }), H("it's asking the right questions", 1100, 540, { size: 56, at: "which questions" })],
  },
];

const S05: Beat[] = [
  { at: "Part five. The garbage-bag playbook.", items: [...title("PART 5", "THE GARBAGE-BAG PLAYBOOK", "trashbag"), H("dad: upholstery, never over $40K", 800, 790, { size: 52, at: "forty thousand" })] },
  {
    at: "At twelve, Mark wanted new",
    items: [I("trashbag", 400, 430, 2.2), T("AGE 12", 1100, 260, { size: 100 }), T("BUY $3 → SELL $6", 1100, 390, { size: 90, color: red, at: "to sell for six" }), H("door to door", 1100, 530, { size: 56, at: "door to door" })],
  },
  {
    at: "slept on the floor",
    items: [I("sofa", 400, 430, 2), T("6 GUYS, 3 BEDROOMS", 1100, 290, { size: 80 }), T("FIRED", 1100, 430, { size: 120, color: red, at: "got fired" }), H("→ started Micro Solutions", 1100, 560, { size: 56, at: "Micro Solutions" })],
  },
  {
    at: "Everyone else would be tied",
    items: [I("medal", 400, 430, 2), T("EVERYONE ELSE:", 1100, 280, { size: 84 }), T("TIED FOR 2ND", 1100, 400, { size: 100, color: red }), H("read the manuals all night", 1100, 530, { size: 56, at: "manuals" }), H("\"same with AI today\"", 1100, 630, { size: 56, at: "same with AI" })],
  },
  {
    at: "profitable every single month for",
    items: [I("calendar", 400, 430, 2), T("PROFITABLE", 1100, 270, { size: 100 }), T("EVERY MONTH, 8 YEARS", 1100, 390, { size: 76, color: red }), H("goal: stay alive, not raise money", 1100, 520, { size: 52, at: "Staying alive" }), H("have to ask? you're probably not one", 1100, 620, { size: 52, at: "have to ask yourself" })],
  },
  { at: "which Yahoo bought for five", items: [I("crown", 400, 430, 2), T("$5.7 BILLION", 1100, 320, { size: 130, color: red }), H("Broadcast.com → Yahoo, in stock", 1100, 470, { size: 56 })] },
  {
    at: "Just get a job, and",
    items: [I("briefcase", 400, 430, 2), T("JUST GET A JOB", 1100, 280, { size: 100 }), H("get really good at it", 1100, 420, { size: 56, at: "really good" }), H("be brutally honest", 1100, 520, { size: 56, at: "brutally honest" })],
  },
  {
    at: "nobody who has an edge",
    items: [I("secretMap", 400, 430, 2), T("NOBODY SELLS", 1100, 290, { size: 100 }), T("THEIR EDGE", 1100, 410, { size: 110, color: red }), H("they're using it", 1100, 550, { size: 56, at: "They're using it" })],
  },
];

const S06: Beat[] = [
  { at: "Part six. Where the real", items: title("PART 6", "WHERE THE REAL MONEY IS MADE", "coin") },
  {
    at: "who sometimes went years without",
    items: [I("hourglass", 400, 430, 2), T("PATIENCE", 1100, 300, { size: 120 }), H("Buffett and Munger: years without investing", 1100, 440, { size: 50 }), H("AI stocks: to the moon, on debt", 1100, 560, { size: 52, at: "going to the moon" })],
  },
  {
    at: "keep some cash",
    items: [I("lockbox", 400, 430, 2.2), T("KEEP SOME CASH", 1100, 290, { size: 100, color: red }), H("when the market turns...", 1100, 430, { size: 56, at: "market turns" }), T("THE REAL MONEY", 1100, 560, { size: 90, at: "real money is made" })],
  },
  {
    at: "When the market crashed during",
    items: [
      I("cart", 400, 430, 2.2),
      T("COVID CRASH", 1100, 270, { size: 100 }),
      T("HE BOUGHT EVERYTHING", 1100, 390, { size: 84, color: red, at: "buying up everything" }),
      H("now: cash, in more than one country", 1100, 520, { size: 52, at: "more than one country" }),
      H("his view, not financial advice", 1100, 620, { size: 52, color: red, at: "not financial advice" }),
    ],
  },
  { at: "So what would change his", items: [P(CUBAN, 400, 450, 440, 520), T("WHAT WOULD", 1100, 270, { size: 90 }), T("CHANGE HIS MIND?", 1100, 390, { size: 90, color: red })] },
  {
    at: "like a brilliant twelve-year-old with",
    items: [
      I("bulb", 330, 430, 1.8),
      I("server", 700, 430, 1.6),
      T("SMART = LESS, NOT MORE", 1250, 290, { size: 70, color: red }),
      H("more chips = brute force", 1250, 420, { size: 52, at: "brute force" }),
      H("Elon? \"a sales guy\"", 1250, 520, { size: 52, at: "sales guy" }),
      H("no two experts agree", 1250, 620, { size: 52, at: "no two of them" }),
    ],
  },
  {
    at: "Bartlett closes not on markets",
    items: [I("heart", 400, 430, 2), T("SUCCESSFUL", 1100, 260, { size: 100 }), T("AND GOOD", 1100, 380, { size: 100, color: red, at: "good, happy person" }), H("\"miserable poor = miserable rich\"", 1100, 520, { size: 52, at: "miserable" })],
  },
  {
    at: "This was ninety minutes in",
    items: [
      T("90 MIN → 10 MIN", 800, 230, { size: 86 }),
      H("full episode: The Diary of a CEO", 800, 390, { size: 60, at: "link to the full" }),
      I("bell", 800, 690, 1.4, { at: "subscribe" }),
      O(800, 690, 120, 120, red, { at: "subscribe" }),
    ],
  },
];

export const EP9_SCENES: Record<string, Beat[]> = { S00, S01, S02, S03, S04, S05, S06 };
