import { Beat } from "../../board/Board";
import { A, H, I, N, O, P, S, T, U, X } from "../../board/dsl";
import { theme } from "../../theme";

const { red, blue, green, orange, purple } = theme;

// Episode 8: Ed Zitron di The Diary of a CEO (AI bubble).
// Semua klaim dibingkai sebagai pendapat/hitungan Zitron; bantahan Steven Bartlett ikut ditampilkan.

const title = (n: string, name: string, icon: string): Beat["items"] => [
  T(n, 800, 200, { size: 70, color: blue }),
  T(name, 800, 360, { size: 100 }),
  U(800, 450, 860, red),
  I(icon, 800, 650, 1.5),
];

// Cold open: frame pertama tergambar penuh dan sama dengan thumbnail A (potret Ed + "$20.9B LOST").
const S00: Beat[] = [
  {
    at: "OpenAI lost twenty point nine",
    drawn: true,
    items: [P("thumbs/photo_zitron.png", 270, 520, 760, 842), T("$20.9B", 1120, 330, { size: 190, color: red }), T("LOST", 1120, 520, { size: 130 }), H("OpenAI, last year", 1120, 660, { size: 56 })],
  },
  {
    at: "And according to Ed Zitron",
    pace: 0.6,
    items: [I("virus", 450, 400, 1.8), X(450, 400, 110), H("not a bug", 450, 560, { size: 60 }), T("THE BUSINESS MODEL", 1080, 430, { size: 76, color: red, at: "business model" })],
  },
  {
    at: "Zitron, one of tech's",
    pace: 0.6,
    items: [I("person", 380, 430, 2), T("ED ZITRON", 1050, 300, { size: 96 }), H("on The Diary of a CEO", 1050, 430, { size: 58, at: "Diary of a CEO" }), T("\"IT'S A CON\"", 1050, 580, { size: 90, color: red, at: "a con" }), H("bill comes due: 2027", 1050, 720, { size: 54, at: "bill comes due" })],
  },
  {
    at: "This is that two and a half hour",
    pace: 0.6,
    items: [
      T("2.5 HRS", 380, 300, { size: 110 }),
      A(600, 300, 900, 300, red),
      T("10 MIN", 1150, 300, { size: 120, color: red }),
      H("the money", 300, 560, { size: 54, at: "the money" }),
      H("the myths", 640, 560, { size: 54, at: "myths" }),
      H("the pop", 980, 560, { size: 54, at: "bubble pops" }),
      H("what proves him wrong?", 800, 700, { size: 60, color: red, at: "prove him wrong" }),
    ],
  },
];

// Bagian 1: satu triliun dolar, untuk apa?
const S01: Beat[] = [
  { at: "Part one", pace: 0.7, items: title("PART 1", "$1 TRILLION, FOR WHAT?", "money") },
  {
    at: "Ed Zitron has worked",
    items: [I("person", 400, 430, 2), N(16, 1100, 320, { suffix: " YEARS IN TECH", size: 80, at: "sixteen years" }), H("loves technology", 1100, 460, { size: 58, color: green, at: "loves technology" }), H("hates being misled", 1100, 580, { size: 58, color: red, at: "being misled" })],
  },
  {
    at: "Start with the spending",
    items: [I("server", 400, 430, 2.2), T("$1 TRILLION+", 1100, 300, { size: 100, color: red, at: "over a trillion" }), H("capex: data centers + AI chips", 1100, 440, { size: 52, at: "data centers" }), H("+ another trillion next year", 1100, 570, { size: 56, at: "another trillion" })],
  },
  {
    at: "To show the scale",
    items: [I("lightning", 380, 430, 2), T("STARGATE", 1100, 280, { size: 100 }), H("Abilene, Texas", 1100, 400, { size: 58, at: "building in" }), T("1.2 GW", 1100, 530, { size: 100, color: orange, at: "One point two" }), H("more than a city like Bristol", 1100, 660, { size: 50, at: "Bristol" })],
  },
  {
    at: "So where does the revenue",
    items: [N(70, 800, 330, { suffix: "%", size: 220, color: red, at: "seventy percent" }), H("of big cloud AI revenue", 800, 520, { size: 60 }), H("= OpenAI + Anthropic", 800, 640, { size: 66, color: blue, at: "OpenAI and Anthropic" })],
  },
  {
    at: "He lists it out",
    items: [
      T("AMAZON", 380, 250, { size: 70 }),
      A(560, 250, 900, 250, green),
      T("OPENAI", 1120, 250, { size: 70 }),
      H("$50B", 730, 190, { size: 54, color: green, at: "fifty billion" }),
      T("GOOGLE", 380, 450, { size: 70, at: "Google sent" }),
      A(560, 450, 900, 450, green, { at: "Google sent" }),
      T("ANTHROPIC", 1150, 450, { size: 70, at: "Google sent" }),
      H("$10B", 730, 390, { size: 54, color: green, at: "ten billion" }),
      A(1150, 560, 380, 560, red, { bend: 90, at: "comes back" }),
      T("A CIRCLE", 800, 760, { size: 90, color: red, at: "A circle" }),
    ],
  },
  {
    at: "Then he takes Microsoft",
    pace: 0.85,
    items: [
      T("MICROSOFT, LAST YEAR", 800, 180, { size: 66 }),
      H("AI revenue: ~$34B", 520, 320, { size: 60, at: "thirty four billion" }),
      H("from OpenAI: $24B", 520, 430, { size: 60, color: blue, at: "Twenty four billion" }),
      H("the rest: ~$10B", 520, 540, { size: 60, color: green, at: "around ten billion" }),
      T("$115B", 1180, 350, { size: 110, color: red, at: "a hundred and fifteen" }),
      H("capex", 1180, 450, { size: 54, at: "a hundred and fifteen" }),
      H("next: $175B", 1180, 560, { size: 60, color: red, at: "seventy five billion" }),
    ],
  },
  {
    at: "The math does not make sense",
    items: [I("calculator", 400, 430, 2), T("\"THE MATH DOES", 1080, 330, { size: 74 }), T("NOT MAKE SENSE\"", 1080, 440, { size: 74, color: red }), H("why won't they say how much?", 1080, 590, { size: 52, at: "why won't most" })],
  },
  {
    at: "But the spending is only half",
    items: [I("money", 500, 430, 1.8), H("next: what you actually pay", 1100, 430, { size: 60, color: red })],
  },
];

// Bagian 2: subsidi token.
const S02: Beat[] = [
  { at: "Part two", pace: 0.7, items: title("PART 2", "THE SUBSIDY", "coin") },
  {
    at: "To understand AI's economics",
    items: [I("car", 400, 430, 2), T("TOKENS", 1100, 280, { size: 110 }), H("≈ 3/4 of a word", 1100, 410, { size: 60, at: "three quarters" }), H("charged like a taxi meter", 1100, 530, { size: 56, at: "taxi meter" }), H("even its \"thinking\" counts", 1100, 650, { size: 52, at: "thinking" })],
  },
  {
    at: "But on a monthly plan",
    pace: 0.85,
    items: [
      H("you pay", 450, 220, { size: 56 }),
      H("it can burn", 1150, 220, { size: 56 }),
      T("$200", 450, 340, { size: 100, at: "two hundred dollar" }),
      A(620, 340, 940, 340, red, { at: "fourteen thousand" }),
      T("$14,000", 1150, 340, { size: 100, color: red, at: "fourteen thousand" }),
      T("$20", 450, 520, { size: 90, at: "twenty dollar plan" }),
      A(620, 520, 940, 520, red, { at: "four hundred" }),
      T("$400", 1150, 520, { size: 90, color: red, at: "four hundred" }),
      H("per SemiAnalysis, as Zitron cites", 800, 690, { size: 46, at: "SemiAnalysis" }),
    ],
  },
  {
    at: "That, he argues",
    items: [I("fire", 400, 430, 2.2), T("-$20.9B", 1100, 360, { size: 140, color: red }), H("OpenAI, last year", 1100, 520, { size: 60 })],
  },
  {
    at: "Then came the test",
    items: [I("car", 380, 430, 2), H("pay the real price →", 1100, 300, { size: 60, at: "real per token" }), T("UBER", 1100, 430, { size: 100, at: "Uber" }), H("whole year's budget in 3 months", 1100, 560, { size: 52, color: red, at: "three months" })],
  },
  {
    at: "His question is simple",
    items: [I("question", 500, 430, 2.2), H("at the real price...", 1100, 360, { size: 62 }), T("STILL USE IT?", 1100, 500, { size: 96, color: red })],
  },
  {
    at: "Steven Bartlett pushes back",
    items: [
      T("BARTLETT", 400, 260, { size: 70, color: blue }),
      H("losing money to grab share", 400, 400, { size: 46 }),
      H("costs usually fall", 400, 500, { size: 46, at: "costs usually fall" }),
      T("ZITRON", 1200, 260, { size: 70, color: red, at: "Zitron's answer" }),
      H("costs aren't falling", 1200, 400, { size: 46, at: "we'd see it" }),
      H("even chip renters lose money", 1200, 500, { size: 44, at: "renting out chips" }),
      S(800, 180, 600),
    ],
  },
  {
    at: "So if it's this expensive",
    items: [I("crowd", 500, 430, 2), H("why is everyone using it?", 1100, 430, { size: 62, color: red })],
  },
];

// Bagian 3: adopsi atau paksaan?
const S03: Beat[] = [
  { at: "Part three", pace: 0.7, items: title("PART 3", "ADOPTION, OR PRESSURE?", "crowd") },
  {
    at: "Bartlett lays out",
    pace: 0.85,
    items: [
      T("100M USERS", 800, 200, { size: 90, color: blue }),
      H("ChatGPT: ~60 days", 800, 330, { size: 62, at: "sixty days" }),
      H("TikTok: 9 months", 800, 440, { size: 56, at: "TikTok" }),
      H("Instagram: 2.5 years", 800, 540, { size: 56, at: "Instagram" }),
      H("his team: nearly everyone, daily", 800, 670, { size: 52, at: "nearly everyone" }),
    ],
  },
  {
    at: "Zitron's reply is one",
    items: [T("\"THE LARGEST", 800, 260, { size: 84 }), T("NON-CONSENSUAL PUSH", 800, 380, { size: 84, color: red }), T("OF TECHNOLOGY IN HISTORY\"", 800, 500, { size: 70 }), H("Gemini in Docs · Copilot in Word · AI on your socks", 800, 660, { size: 44, at: "Open Google Docs" })],
  },
  {
    at: "What about all the AI content",
    items: [I("box", 420, 430, 2), H("we already had search slop", 1100, 360, { size: 56 }), T("NOW: A SLOP MACHINE", 1100, 500, { size: 68, color: red, at: "slop machine" })],
  },
  {
    at: "Then they argue about mistakes",
    pace: 0.85,
    items: [
      T("BARTLETT", 400, 220, { size: 66, color: blue }),
      H("hallucinations (simple tasks)", 400, 330, { size: 42 }),
      T("22% → <1%", 400, 450, { size: 76, color: green, at: "twenty two percent" }),
      T("ZITRON", 1200, 220, { size: 66, color: red, at: "Zitron counters" }),
      H("AI said MSFT hit $575", 1200, 340, { size: 44, at: "five hundred and seventy five" }),
      X(1200, 450, 60, { at: "It never had" }),
      H("fine in a newsletter, not a hospital", 800, 650, { size: 46, at: "Dangerous" }),
    ],
  },
  {
    at: "And his test for real breakthroughs",
    items: [I("phone", 400, 430, 2.2), T("THE iPHONE TEST", 1100, 300, { size: 80 }), H("hand it over → instantly get it", 1100, 440, { size: 52, at: "they got it instantly" }), H("AI: prompts + harnesses needed", 1100, 570, { size: 52, color: red, at: "complicated setup" })],
  },
  {
    at: "Bartlett's counterpoint",
    items: [
      I("person", 380, 400, 1.6),
      H("compare to an intern", 380, 600, { size: 46 }),
      H("intern: learns, grows", 1150, 330, { size: 54, color: green, at: "a good intern" }),
      H("chatbot: reads its files", 1150, 460, { size: 54, color: red, at: "reads its files" }),
      I("cards", 1150, 650, 1.2, { at: "deck of cards" }),
    ],
  },
];

// Bagian 4: mitos-mitos.
const S04: Beat[] = [
  { at: "Part four", pace: 0.7, items: title("PART 4", "THE MYTHS", "cards") },
  {
    at: "Myth one",
    items: [I("cards", 330, 430, 1.6), H("myth 1: huge economic growth", 1050, 300, { size: 56 }), T("\"NO, IT'S NOT\"", 1050, 430, { size: 90, color: red, at: "No, it's not" }), H("real AI spend: ~$100B", 1050, 580, { size: 56, at: "a hundred billion" })],
  },
  {
    at: "Myth two",
    items: [I("flag", 330, 430, 1.6), H("myth 2: spend trillions to beat China", 1050, 300, { size: 50 }), T("\"WHAT RACE?\"", 1050, 440, { size: 100, color: red, at: "What race" }), H("China already has the models", 1050, 590, { size: 52, at: "already has" })],
  },
  {
    at: "Myth three",
    items: [I("briefcase", 330, 430, 1.6), H("myth 3: AI replaces all jobs", 1050, 260, { size: 54 }), H("no economic data for it", 1050, 370, { size: 54, color: red, at: "no economic data" }), H("hit: translators, transcribers, art directors", 1050, 490, { size: 42, at: "translators" }), H("OpenAI study: tokens ≠ revenue per employee", 1050, 610, { size: 42, at: "OpenAI study" })],
  },
  {
    at: "Myth four",
    items: [I("robot", 330, 430, 1.6), H("myth 4: AI already blackmails people", 1050, 300, { size: 50 }), T("SET UP + PROMPTED", 1050, 450, { size: 80, color: red, at: "set the models up" })],
  },
  {
    at: "Bartlett doesn't let it slide",
    items: [
      T("BARTLETT", 800, 200, { size: 70, color: blue }),
      I("car", 450, 420, 1.6, { at: "Self driving" }),
      H("far fewer crashes", 450, 600, { size: 50, at: "fewer crashes" }),
      I("tv", 1150, 420, 1.6, { at: "history is full" }),
      H("\"internet = fax machine\"", 1150, 600, { size: 48, color: red, at: "fax machine" }),
    ],
  },
  {
    at: "Zitron's answer is the key",
    pace: 0.85,
    items: [
      H("dot-com bubble left:", 450, 240, { size: 54 }),
      I("plug", 450, 420, 1.6, { at: "fiber optic" }),
      H("fiber the world later used", 450, 600, { size: 46, color: green, at: "fiber optic" }),
      H("AI bubble leaves:", 1150, 240, { size: 54, at: "is different" }),
      I("chip", 1150, 420, 1.6, { at: "is different" }),
      H("chips age, power bill stays", 1150, 600, { size: 46, color: red, at: "The chips age" }),
      T("\"NO POST-BUBBLE STORY\"", 800, 760, { size: 70, color: red, at: "no post bubble story" }),
    ],
  },
];

// Bagian 5: 2027.
const S05: Beat[] = [
  { at: "Part five", pace: 0.7, items: title("PART 5", "TWENTY TWENTY SEVEN", "domino") },
  {
    at: "Zitron calls it",
    items: [T("THE \"ROT-COM\"", 800, 260, { size: 100, color: red }), T("BUBBLE", 800, 380, { size: 100 }), H("big tech ran out of hyper-growth ideas", 800, 540, { size: 52, at: "ran out of new ideas" }), H("bought AI chips → stocks soared", 800, 650, { size: 52, at: "stocks soared" })],
  },
  {
    at: "At the center of it",
    pace: 0.85,
    items: [
      T("OPENAI", 800, 180, { size: 90 }),
      H("raised $122B this year", 800, 300, { size: 56, at: "a hundred and twenty two" }),
      H("needs $100B+ a year", 800, 400, { size: 56, color: red, at: "at least a hundred billion" }),
      H("valued at $865B", 800, 500, { size: 56, at: "eight hundred and sixty five" }),
      H("IPO slipped; Anthropic may list first", 800, 610, { size: 50, at: "slipped" }),
    ],
  },
  {
    at: "His prediction",
    items: [I("hourglass", 420, 430, 2), T("2027:", 1100, 320, { size: 110, color: red }), T("OUT OF CASH?", 1100, 460, { size: 90 }), H("Zitron's forecast", 1100, 590, { size: 50 })],
  },
  {
    at: "Then come the dominoes",
    pace: 0.8,
    items: [
      I("domino", 230, 380, 1.4),
      H("OpenAI", 230, 560, { size: 46 }),
      I("domino", 560, 380, 1.4, { at: "SoftBank" }),
      H("SoftBank ~$100B stake", 560, 560, { size: 40, at: "SoftBank" }),
      I("domino", 890, 380, 1.4, { at: "Oracle" }),
      H("Oracle 7 GW", 890, 560, { size: 44, at: "Oracle" }),
      I("domino", 1220, 380, 1.4, { at: "Nvidia" }),
      H("Nvidia -50–70%", 1220, 560, { size: 44, color: red, at: "fifty to seventy" }),
      A(260, 700, 1300, 700, red, { at: "grow more slowly" }),
      H("+ Amazon, Google, Microsoft grow slower", 800, 780, { size: 44, at: "grow more slowly" }),
    ],
  },
  {
    at: "The result, Zitron says",
    items: [I("money", 400, 380, 1.6), A(400, 500, 400, 700, red), T("TECH DEPRESSION", 1100, 320, { size: 84, color: red, at: "tech depression" }), H("retirement savings -20–40%", 1100, 460, { size: 56, at: "twenty to forty" }), H("(his forecast)", 1100, 570, { size: 46 })],
  },
  {
    at: "To be clear",
    items: [
      H("one man's forecast", 800, 200, { size: 64, color: blue }),
      T("BARTLETT", 400, 330, { size: 66, color: blue, at: "Bartlett points out" }),
      H("AWS, Uber lost money first", 400, 450, { size: 46, at: "Amazon Web Services" }),
      T("ZITRON", 1200, 330, { size: 66, color: red, at: "Zitron's reply" }),
      H("never this much, this fast", 1200, 450, { size: 46, at: "this much, this fast" }),
      H("what would change his mind?", 800, 650, { size: 58, color: red, at: "change his mind" }),
    ],
  },
];

// Bagian 6: apa yang bisa membuktikan dia salah? (membayar open loop dari pembuka)
const S06: Beat[] = [
  { at: "Part six", pace: 0.7, items: title("PART 6", "WHAT WOULD PROVE HIM WRONG?", "question") },
  {
    at: "Remember the question",
    items: [I("question", 400, 430, 2), H("\"what would it take", 1100, 380, { size: 62 }), H("for you to be wrong?\"", 1100, 480, { size: 62, color: red })],
  },
  {
    at: "Zitron's answer",
    items: [
      I("chip", 330, 400, 1.6),
      T("COST ÷ 1,000", 1050, 260, { size: 90, color: green, at: "a thousand times" }),
      H("works on its own, reliably", 1050, 400, { size: 56, at: "works on its own" }),
      T("\"INDISTINGUISHABLE", 1050, 540, { size: 70, at: "indistinguishable" }),
      T("FROM MAGIC\"", 1050, 640, { size: 70, color: red, at: "indistinguishable" }),
      H("their own bar", 1050, 760, { size: 50, at: "set it there" }),
    ],
  },
  {
    at: "So what should ordinary people do",
    items: [I("money", 400, 430, 1.8), H("not financial advice", 1100, 280, { size: 56, color: red, at: "financial advice" }), H("he keeps his money in cash", 1100, 390, { size: 54, at: "in cash" }), H("be suspicious of tech promises", 1100, 500, { size: 54, at: "suspicious" }), H("\"annualized run rate\" = ?", 1100, 620, { size: 54, at: "annualized run rate" })],
  },
  {
    at: "And one piece of advice",
    items: [I("hourglass", 400, 430, 2), T("EVERY CON", 1100, 300, { size: 96 }), T("RUSHES YOU", 1100, 420, { size: 96, color: red }), H("unless it's on fire, slow down", 1100, 570, { size: 54, color: green, at: "slow down" })],
  },
  {
    at: "Bartlett ends with balance",
    items: [I("scales", 400, 430, 2), H("doesn't fully agree", 1100, 300, { size: 56 }), H("collect many perspectives", 1100, 420, { size: 56, at: "many perspectives" }), H("follow the evidence yourself", 1100, 540, { size: 56, color: blue, at: "follow the evidence" })],
  },
  {
    at: "Zitron's last words",
    items: [I("heart", 400, 430, 2), H("the best part: the people", 1100, 330, { size: 56, at: "the people around" }), T("TELL THEM", 1100, 470, { size: 90, color: red, at: "Tell the people" }), H("their work matters", 1100, 600, { size: 54, at: "work matters" })],
  },
  {
    at: "This was two and a half hours",
    items: [
      T("2.5 HRS → 10 MIN", 800, 230, { size: 86 }),
      H("full episode: The Diary of a CEO", 800, 390, { size: 60, at: "The full conversation" }),
      H("link in the description", 800, 510, { size: 56, color: blue, at: "link to the full" }),
      I("bell", 800, 690, 1.4, { at: "subscribe" }),
      O(800, 690, 120, 120, red, { at: "subscribe" }),
    ],
  },
];

export const EP8_SCENES: Record<string, Beat[]> = { S00, S01, S02, S03, S04, S05, S06 };
