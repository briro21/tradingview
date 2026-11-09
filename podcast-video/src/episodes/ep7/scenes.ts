import { Beat } from "../../board/Board";
import { A, H, I, N, O, S, T, U, X } from "../../board/dsl";
import { theme } from "../../theme";

const { red, blue, green, orange, purple } = theme;

// Episode 7 (diupload sebagai episode ke-6): Prof. Robert Pape di The Diary of a CEO.
// Semua klaim dibingkai sebagai analisis/skenario Pape, bukan fakta.

const title = (n: string, name: string, icon: string): Beat["items"] => [
  T(n, 800, 200, { size: 70, color: blue }),
  T(name, 800, 360, { size: 100 }),
  U(800, 450, 860, red),
  I(icon, 800, 650, 1.5),
];

// Cold open: frame pertama tergambar penuh dan sama dengan thumbnail A.
const S00: Beat[] = [
  {
    at: "A man who has advised",
    drawn: true,
    items: [I("calendarBlank", 360, 430, 2.8), T("8", 360, 480, { size: 190, color: red }), T("THE MOST", 1080, 260, { size: 90 }), T("DANGEROUS", 1080, 420, { size: 130, color: red }), T("WEEKS OF OUR LIVES", 1080, 580, { size: 70 }), U(1080, 650, 640, red)],
  },
  {
    at: "Three crises are colliding",
    pace: 0.6,
    items: [
      I("ballot", 330, 400, 1.6, { at: "transfer of power" }),
      H("power transfer, USA", 330, 600, { size: 46, at: "transfer of power" }),
      I("bomb", 800, 400, 1.6, { at: "three day bombing" }),
      H("3-day plan, Iran", 800, 600, { size: 46, color: red, at: "three day bombing" }),
      I("snowflake", 1270, 400, 1.6, { at: "dark winter" }),
      H("dark winter, Ukraine", 1270, 600, { size: 46, at: "dark winter" }),
    ],
  },
  {
    at: "Professor Robert Pape",
    pace: 0.6,
    items: [I("person", 400, 430, 2.2), T("PROF. ROBERT PAPE", 1050, 330, { size: 76 }), H("on The Diary of a CEO", 1050, 470, { size: 60, at: "Diary of a CEO" })],
  },
  {
    at: "This is that ninety minute",
    pace: 0.6,
    items: [
      T("90 MIN", 380, 360, { size: 110 }),
      A(600, 360, 900, 360, red),
      T("10 MIN", 1150, 360, { size: 120, color: red }),
      H("the chain", 450, 640, { size: 54, at: "How the chain" }),
      H("world war three?", 800, 640, { size: 54, at: "world war three" }),
      H("3 firebreaks", 1180, 640, { size: 54, color: green, at: "three firebreaks" }),
    ],
  },
];

// Bagian 1: delapan minggu paling berbahaya.
const S01: Beat[] = [
  { at: "Part one", pace: 0.7, items: title("PART 1", "THE 8 MOST DANGEROUS WEEKS", "calendar") },
  {
    at: "Robert Pape has studied",
    items: [I("magnifier", 420, 430, 2), N(30, 1100, 330, { suffix: " YEARS", size: 110, at: "thirty years" }), H("studying political violence", 1100, 470, { size: 56 }), H("last 5: the United States", 1100, 590, { size: 56, color: red, at: "The last five" })],
  },
  {
    at: "His starting point",
    items: [I("ballot", 400, 430, 2), T("MIDTERMS", 1100, 300, { size: 100 }), H("president: every 4 years", 1100, 440, { size: 54, at: "every four years" }), H("Congress: every 2 years", 1100, 540, { size: 54, at: "every two" })],
  },
  {
    at: "Right now, Pape notes",
    items: [I("temple", 380, 430, 2), H("House + Senate = one party", 1080, 330, { size: 58 }), T("LITTLE CHECK", 1080, 470, { size: 84, color: red, at: "very little check" }), H("lose them → changes overnight", 1080, 600, { size: 50, at: "Lose them" })],
  },
  {
    at: "But Pape's real worry",
    items: [
      H("count", 300, 360, { size: 64, at: "Counting" }),
      A(420, 360, 560, 360),
      H("certify", 700, 360, { size: 64, at: "certifying" }),
      A(830, 360, 970, 360),
      H("seat", 1100, 360, { size: 64, at: "seating" }),
      T("~2 MONTHS", 800, 520, { size: 90, color: red, at: "about two months" }),
      T("= DANGER ZONE", 800, 660, { size: 80, at: "danger zone" }),
    ],
  },
  {
    at: "We saw it on January sixth",
    items: [I("temple", 450, 430, 2), I("fire", 450, 260, 0.9), T("JANUARY 6", 1100, 360, { size: 100, color: red }), H("end of a 2-month transfer", 1100, 500, { size: 54 })],
  },
  {
    at: "Then he shows the number",
    pace: 0.8,
    items: [
      I("crowd", 450, 380, 2, { at: "forty million" }),
      T("40M+", 450, 600, { size: 110, color: red, at: "forty million" }),
      H("military vs. protesters", 450, 720, { size: 46, at: "forty million" }),
      I("crowd", 1150, 380, 2, { at: "sixty million" }),
      T("60M+", 1150, 600, { size: 110, color: blue, at: "sixty million" }),
      H("force to stop Trump", 1150, 720, { size: 46, at: "sixty million" }),
    ],
  },
  {
    at: "Violence on both sides",
    items: [I("scales", 420, 430, 2), H("both sides of the aisle", 1080, 330, { size: 60 }), T("DOUBLED", 1080, 470, { size: 110, color: red, at: "doubled" }), H("since Sept 2024", 1080, 600, { size: 54 })],
  },
  {
    at: "And what if Democrats win",
    items: [H("subpoenas", 500, 300, { size: 70, at: "Subpoenas" }), H("impeachments", 500, 420, { size: 70, at: "Impeachments" }), H("cabinet secretaries", 500, 540, { size: 70, at: "cabinet" }), I("stairs", 1150, 420, 2.2), T("\"NO POLITICAL BOTTOM\"", 1150, 660, { size: 60, color: red, at: "no political bottom" })],
  },
  {
    at: "But here's the thing",
    items: [
      I("ballot", 330, 400, 1.6),
      I("bomb", 800, 400, 1.6, { at: "war with Iran" }),
      I("lightning", 1270, 400, 1.6, { at: "power grid" }),
      T("SAME 8 WEEKS", 800, 650, { size: 90, color: red, at: "the same eight weeks" }),
    ],
  },
  {
    at: "To see why they might feed",
    items: [I("bulb", 500, 430, 2.2), H("Pape's most important idea", 1100, 400, { size: 64 }), T("?", 1100, 540, { size: 120, color: red })],
  },
];

// Bagian 2: jebakan eskalasi (catur vs roulette).
const S02: Beat[] = [
  { at: "Part two", pace: 0.7, items: title("PART 2", "THE ESCALATION TRAP", "roulette") },
  {
    at: "An escalation trap",
    items: [T("STRONG", 350, 330, { size: 90, color: blue }), A(520, 330, 1000, 330, red), T("WEAK", 1200, 330, { size: 90 }), H("bombs hit, leaders killed", 800, 500, { size: 56, at: "The bombs hit" }), T("WEAKER SIDE GAINS POWER", 800, 640, { size: 66, color: red, at: "gains power" })],
  },
  {
    at: "In this war, he says",
    items: [I("ship", 400, 430, 2), I("barrel", 650, 470, 1.2, { at: "oil" }), T("STRAIT OF HORMUZ", 1120, 330, { size: 74 }), N(20, 1120, 480, { suffix: "% OF WORLD OIL", size: 76, color: red, at: "twenty percent" })],
  },
  {
    at: "Most people, Pape says",
    items: [I("chess", 420, 430, 2.2), H("white takes a pawn...", 1080, 300, { size: 58 }), H("...then loses a bishop", 1080, 410, { size: 58, at: "loses a bishop" }), T("OFFER A DRAW", 1080, 560, { size: 80, color: blue, at: "offer a draw" }), H("\"just take a deal\"", 1080, 680, { size: 54, at: "just take a deal" })],
  },
  {
    at: "But Pape says international politics",
    items: [I("chess", 400, 430, 1.6), X(400, 430, 130), T("ROULETTE", 1100, 430, { size: 130, color: red, at: "roulette" })],
  },
  {
    at: "You bet on red",
    items: [I("roulette", 420, 430, 2.4), H("bet red → black", 1100, 300, { size: 62, at: "comes up black" }), H("rational: walk away", 1100, 420, { size: 58, color: green, at: "walks away" }), T("GAMBLER DOUBLES DOWN", 1100, 560, { size: 66, color: red, at: "doubles down" })],
  },
  {
    at: "It comes up black again",
    items: [I("coin", 380, 400, 1.6), I("coin", 470, 470, 1.6), I("coin", 330, 520, 1.6), H("borrow chips from a bookie", 1080, 380, { size: 58, at: "borrows chips" }), T("BET EVEN BIGGER", 1080, 520, { size: 80, color: red, at: "even bigger" })],
  },
  {
    at: "Pape maps each spin",
    pace: 0.8,
    items: [
      H("bet 1: kill the Supreme Leader", 800, 230, { size: 56, at: "Bet one" }),
      X(1380, 230, 36, { at: "It didn't" }),
      H("bet 2: six-week air campaign", 800, 380, { size: 56, at: "Bet two" }),
      X(1380, 380, 36, { at: "Iran kept the strait" }),
      H("bet 3: blockade", 800, 530, { size: 56, at: "Bet three" }),
      X(1380, 530, 36, { at: "hasn't collapsed" }),
      H("gas prices keep rising", 800, 680, { size: 56, color: red, at: "gas prices keep rising" }),
    ],
  },
  {
    at: "And the chips",
    items: [
      I("coin", 330, 360, 1.6),
      H("gas prices · lives · interest rates", 950, 360, { size: 58 }),
      H("borrowed chips = party support", 800, 520, { size: 62, at: "borrowed chips" }),
      T("JANUARY 3: PAY BACK", 800, 670, { size: 80, color: red, at: "January third" }),
    ],
  },
  {
    at: "So why not just stop",
    items: [I("crown", 420, 430, 2), H("presidents don't walk away", 1080, 340, { size: 58 }), T("LEGACY", 1080, 480, { size: 110, color: red, at: "their legacy" })],
  },
  {
    at: "Lyndon Johnson",
    items: [I("stairs", 400, 430, 2.2), T("LBJ · VIETNAM", 1080, 330, { size: 84 }), H("chasing losses up the ladder", 1080, 470, { size: 56, at: "chasing his losses" }), T("HUMILIATION → DOUBLE DOWN", 1080, 620, { size: 56, color: red, at: "pressure of humiliation" })],
  },
  {
    at: "Which brings us to the plan",
    items: [I("briefcase", 600, 430, 2), H("the plan on the president's desk", 1100, 430, { size: 54 })],
  },
];

// Bagian 3: rencana tiga hari.
const S03: Beat[] = [
  { at: "Part three", pace: 0.7, items: title("PART 3", "THE 3-DAY PLAN", "bomb") },
  {
    at: "According to Pape",
    items: [I("bomb", 400, 430, 2.2), T("3 DAYS", 1080, 300, { size: 110, color: red }), H("ready within 96 hours of go", 1080, 450, { size: 56, at: "ninety six hours" }), H("embassy families pulled out", 1080, 570, { size: 56, at: "embassy families" })],
  },
  {
    at: "The media, he says",
    items: [H("\"three days\" = minor?", 800, 300, { size: 70 }), X(1240, 300, 50, { at: "Pape disagrees" }), H("leadership · refineries · bridges · energy", 800, 470, { size: 54, at: "The leaked targets" }), T("= INSTANT THUNDER", 800, 620, { size: 90, color: red, at: "Instant Thunder" })],
  },
  {
    at: "the plan that opened",
    items: [
      T("IRAQ 1991", 800, 220, { size: 76 }),
      H("planned:", 520, 380, { size: 62, at: "meant to last" }),
      T("3 DAYS", 520, 500, { size: 100, at: "meant to last" }),
      H("actual:", 1080, 380, { size: 62, at: "went on" }),
      T("43 DAYS", 1080, 500, { size: 100, color: red, at: "forty three" }),
      H("never paralyzed the military", 800, 680, { size: 54, at: "never paralyzed" }),
    ],
  },
  {
    at: "And here's the paradox",
    items: [I("brain", 400, 430, 2), H("goal: paralyze the government", 1080, 330, { size: 58, at: "paralyze the government" }), T("WHO'S LEFT TO", 1080, 480, { size: 76, color: red, at: "who is left" }), T("NEGOTIATE WITH?", 1080, 590, { size: 76, color: red, at: "who is left" })],
  },
  {
    at: "And if you don't fully succeed",
    items: [I("lightning", 380, 430, 2), H("remnants lash back", 1080, 300, { size: 64, at: "lash back" }), H("airports · infrastructure", 1080, 420, { size: 56, at: "airports" }), H("Houthis hit Riyadh airport", 1080, 560, { size: 56, color: red, at: "Houthis" }), H("\"first intentional civilian targeting\"", 1080, 680, { size: 44, at: "first intentional" })],
  },
  {
    at: "Then there are civilians in Iran",
    items: [I("house", 400, 430, 2), H("1991 civilian deaths (Pape's est.)", 1080, 330, { size: 52, at: "Pape estimates" }), T("5,000-15,000", 1080, 480, { size: 96, color: red, at: "five and fifteen thousand" }), T("→ INSPIRED ATTACKS", 1080, 630, { size: 70, at: "inspired attacks" })],
  },
  {
    at: "An inspired attack isn't ordered",
    items: [I("person", 420, 430, 2), H("not ordered by any government", 1080, 340, { size: 56 }), H("one person, on his own", 1080, 460, { size: 56, at: "on his own" }), T("REVENGE", 1080, 600, { size: 100, color: red, at: "revenge" })],
  },
  {
    at: "Pape, who has studied",
    items: [I("airplane", 380, 430, 2.2), N(8000, 1080, 260, { suffix: " suicide attacks studied", size: 56, at: "eight thousand" }), H("Dubai → Tel Aviv", 1080, 390, { size: 64, at: "Dubai to Tel Aviv" }), I("axe", 860, 540, 1.1, { at: "crash axe" }), H("30 min from landing", 1150, 540, { size: 54, color: red, at: "thirty minutes" })],
  },
  {
    at: "A passenger who happened",
    items: [I("person", 400, 430, 1.8), H("a passenger-pilot lands it", 1080, 330, { size: 56 }), H("Pape's estimate:", 1080, 460, { size: 56, at: "Pape can't be certain" }), N(90, 1080, 600, { suffix: "% planned attack", size: 76, color: red, at: "ninety percent" })],
  },
];

// Bagian 4: langkah Putin dan "kebakaran hutan" di dalam negeri.
const S04: Beat[] = [
  { at: "Part four", pace: 0.7, items: title("PART 4", "PUTIN & THE WILDFIRE", "fire") },
  {
    at: "Now, the second crisis",
    items: [I("flag", 400, 430, 2), H("4 regions annexed on paper", 1080, 300, { size: 56, at: "formally annexed" }), H("not fully controlled", 1080, 410, { size: 56, at: "doesn't control" }), N(250000, 1080, 550, { suffix: "+ dead", size: 76, color: red, at: "two hundred and fifty thousand" }), T("~1% MORE OF UKRAINE", 1080, 680, { size: 62, at: "one percent" })],
  },
  {
    at: "So Putin doesn't want a photo op",
    items: [X(350, 330, 70), H("photo op", 350, 470, { size: 56 }), T("TERRITORY", 1050, 330, { size: 100, color: red, at: "deliver territory" }), H("Trump can't deliver it", 1050, 480, { size: 56, at: "doesn't think Trump can" }), H("only Ukraine can", 1050, 600, { size: 56, at: "Only Ukraine" })],
  },
  {
    at: "So around Thanksgiving",
    items: [I("snowflake", 380, 430, 2.2), T("DARK WINTER", 1080, 260, { size: 96, color: blue }), H("Kyiv · Kharkiv · Odesa", 1080, 400, { size: 60, at: "Kyiv" }), N(90, 1080, 540, { suffix: "% power out", size: 80, color: red, at: "ninety percent" }), H("for a month or two", 1080, 660, { size: 54, at: "a month or two" })],
  },
  {
    at: "Because Putin, he says",
    items: [I("roulette", 420, 430, 2), H("Putin's own escalation trap", 1080, 360, { size: 60 }), H("defeat could cost his life", 1080, 500, { size: 60, color: red, at: "his life" })],
  },
  {
    at: "Meanwhile, back in America",
    items: [I("fire", 420, 430, 2.4), T("VIOLENT POPULISM", 1080, 330, { size: 86, color: red, at: "violent populism" }), H("fringe → mainstream", 1080, 480, { size: 62, at: "fringe to the mainstream" })],
  },
  {
    at: "He uses a wildfire analogy",
    items: [
      I("tree", 400, 400, 2),
      H("dry wood: predictable", 400, 640, { size: 52, at: "how much dry wood" }),
      I("fire", 1150, 400, 2, { at: "the spark" }),
      H("the spark: unpredictable", 1150, 640, { size: 52, color: red, at: "the spark" }),
    ],
  },
  {
    at: "The dry wood is",
    items: [I("crowd", 400, 430, 2), H("dry wood = tens of millions", 1080, 320, { size: 56 }), H("spark = a single post", 1080, 450, { size: 56, at: "a single post" }), H("or a clash over ballot counting", 1080, 570, { size: 50, color: red, at: "a clash" })],
  },
  {
    at: "And then the crises start",
    items: [I("fire", 380, 430, 1.8), H("France: riots spread", 1080, 300, { size: 62, at: "riots in France" }), H("cause: prices from the Iran war", 1080, 420, { size: 54, at: "rising prices" }), H("gas · diesel · housing", 1080, 540, { size: 56, at: "Higher gas" }), T("NO LONGER SEPARATE", 1080, 670, { size: 66, color: red, at: "no longer separate" })],
  },
];

// Bagian 5: tentara, serangan siber, perang dunia ketiga.
const S05: Beat[] = [
  { at: "Part five", pace: 0.7, items: title("PART 5", "THE ROAD TO WORLD WAR 3", "globe") },
  {
    at: "In Britain, as the host",
    items: [T("UK: \"BE READY\"", 800, 220, { size: 80, color: blue }), I("bottle", 330, 470, 1.4, { at: "water" }), I("battery", 640, 470, 1.4, { at: "battery radio" }), I("money", 950, 470, 1.4, { at: "physical cash" }), H("3 days of supplies", 1270, 470, { size: 50, at: "three days" }), H("ATMs may not work", 800, 680, { size: 54, color: red, at: "ATMs" })],
  },
  {
    at: "Why? Cyber attacks",
    items: [I("code", 400, 430, 2), T("CYBER ATTACKS", 1080, 280, { size: 84, color: red }), H("Minnesota: power + water down", 1080, 420, { size: 54, at: "Minnesota" }), H("NYT: \"Iran's fingerprints\"", 1080, 540, { size: 54, at: "New York Times" }), H("never followed up", 1080, 660, { size: 50, at: "never followed up" })],
  },
  {
    at: "Next on his board",
    items: [I("shield", 400, 430, 2), T("INSURRECTION ACT", 1080, 300, { size: 80, color: red, at: "Insurrection Act" }), H("military vs. own citizens", 1080, 440, { size: 56, at: "against its own citizens" }), H("blocked by posse comitatus", 1080, 560, { size: 52, at: "posse comitatus" })],
  },
  {
    at: "Back in Iran",
    items: [I("helicopter", 380, 400, 1.8), H("weakened but dangerous", 1080, 280, { size: 58 }), H("ground troops for remnants", 1080, 400, { size: 58, at: "ground troops" }), T("FOREVER WAR", 1080, 540, { size: 96, color: red, at: "forever war" }), T("2027", 1080, 680, { size: 80, at: "twenty twenty seven" })],
  },
  {
    at: "And Russia",
    items: [I("code", 330, 430, 1.6), A(450, 430, 650, 430, red), H("public demands payback", 900, 330, { size: 56, at: "payback" }), H("Europe strikes Moscow", 900, 470, { size: 56, at: "strikes Moscow" }), T("= WW3", 1350, 430, { size: 110, color: red, at: "world war three looks like" })],
  },
  {
    at: "He's careful here",
    items: [
      T("NOT WW3 TODAY", 800, 220, { size: 84, color: green, at: "not in world war three" }),
      H("proxy wars: almost every year of the Cold War", 800, 380, { size: 50, at: "Proxy wars" }),
      H("world war = great powers hit each other's homelands", 800, 520, { size: 50, color: red, at: "World war means" }),
      H("a pathway, not a certainty", 800, 670, { size: 60, at: "a pathway" }),
    ],
  },
];

// Bagian 6: tiga sekat api (firebreak).
const S06: Beat[] = [
  { at: "Part six", pace: 0.7, items: title("PART 6", "THREE FIREBREAKS", "fire") },
  {
    at: "Remember the wildfire",
    items: [I("fire", 400, 430, 2), H("can't stop every spark", 1080, 360, { size: 62 }), T("BUILD FIREBREAKS", 1080, 500, { size: 86, color: green, at: "build firebreaks" })],
  },
  {
    at: "Firebreak one",
    items: [T("1", 260, 400, { size: 200, color: green }), I("temple", 520, 430, 1.6), H("Congress: no escalation in Iran", 1100, 340, { size: 56 }), H("until the new Congress is seated", 1100, 460, { size: 52, at: "until the new Congress" }), H("unless Iran strikes first", 1100, 580, { size: 52, color: red, at: "unless Iran strikes first" })],
  },
  {
    at: "Firebreak two",
    items: [T("2", 260, 400, { size: 200, color: green }), I("city", 520, 430, 1.6), H("governors & mayors:", 1100, 340, { size: 56 }), H("2-month pause on federal armed agents", 1100, 460, { size: 48, at: "two month pause" }), H("take the key sparks away", 1100, 580, { size: 52, color: red, at: "key sparks" })],
  },
  {
    at: "Firebreak three",
    items: [T("3", 260, 400, { size: 200, color: green }), I("hand", 520, 430, 1.6), H("Pakistan · Qatar · India", 1100, 340, { size: 56, at: "Pakistan" }), T("HANDS OFF CIVILIANS", 1100, 480, { size: 70, color: red, at: "hands off civilians" })],
  },
  {
    at: "So should you stockpile",
    pace: 0.8,
    items: [
      I("bottle", 320, 430, 1.4, { at: "day one" }),
      H("day 1", 320, 620, { size: 50, at: "day one" }),
      I("bottle", 620, 430, 1.4, { at: "By day three" }),
      H("day 3: out", 620, 620, { size: 50, color: red, at: "By day three" }),
      H("attacks can come again", 1150, 380, { size: 54, at: "come again" }),
      T("FIREBREAKS BUY TIME", 1150, 520, { size: 60, color: green, at: "The firebreaks do" }),
    ],
  },
  {
    at: "So what can an ordinary person do",
    items: [I("phone", 400, 430, 2.2), H("email · text · call", 1080, 340, { size: 66, at: "email" }), H("your political leaders", 1080, 460, { size: 58 }), H("or events control us", 1080, 600, { size: 54, color: red, at: "letting events control us" })],
  },
  {
    at: "And he believes conversations",
    items: [I("headset", 400, 430, 1.8), H("after his last appearance...", 1080, 340, { size: 56 }), H("drone-network strike faded", 1080, 460, { size: 56, at: "momentum" }), H("public attention matters", 1080, 590, { size: 58, color: green, at: "public attention" })],
  },
  {
    at: "Asked if he's a pessimist",
    items: [I("sunrise", 450, 430, 2.2), T("OPTIMIST", 1080, 380, { size: 110, color: green, at: "the opposite" }), H("choose a better road", 1080, 530, { size: 58, at: "a better one" })],
  },
  {
    at: "This was ninety minutes in ten",
    items: [
      T("90 MIN → 10", 800, 230, { size: 90 }),
      H("full episode: The Diary of a CEO", 800, 390, { size: 60, at: "The full conversation" }),
      H("link in the description", 800, 510, { size: 56, color: blue, at: "link to the full" }),
      I("bell", 800, 690, 1.4, { at: "subscribe" }),
      O(800, 690, 120, 120, red, { at: "subscribe" }),
    ],
  },
];

export const EP7_SCENES: Record<string, Beat[]> = { S00, S01, S02, S03, S04, S05, S06 };
