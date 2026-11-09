import { Beat } from "../../board/Board";
import { A, H, I, N, O, S, T, U, X } from "../../board/dsl";
import { theme } from "../../theme";

const { red, blue, green, orange, purple } = theme;

// Episode 6 (diupload sebagai episode ke-5): AI dan krisis matematika, Lex Fridman Podcast #503.

const title = (n: string, name: string, icon: string): Beat["items"] => [
  T(n, 800, 200, { size: 70, color: blue }),
  T(name, 800, 360, { size: 100 }),
  U(800, 450, 860, red),
  I(icon, 800, 650, 1.5),
];

// Cold open: frame pertama sudah tergambar penuh dan sama dengan thumbnail A.
const S00: Beat[] = [
  {
    at: "In just a few weeks",
    drawn: true,
    items: [I("robot", 360, 430, 2.6), T("AI DROPPED", 1080, 260, { size: 90 }), T("700", 1080, 420, { size: 150, color: red }), T("MATH PROOFS", 1080, 580, { size: 90 }), U(1080, 660, 560, red)],
  },
  {
    at: "In one single night",
    pace: 0.6,
    items: [I("moon", 400, 420, 2), N(700, 1050, 360, { suffix: " RESULTS", size: 110, color: red, at: "seven hundred" }), H("in one drop", 1050, 520, { size: 64 })],
  },
  {
    at: "One mathematician said",
    pace: 0.6,
    items: [I("medal", 450, 420, 2.4), H("\"if a human did this...\"", 1100, 330, { size: 60 }), T("INSTANT FIELDS MEDAL", 1100, 480, { size: 70, color: red, at: "instant Fields" })],
  },
  {
    at: "Lex Fridman called it",
    pace: 0.6,
    items: [I("headset", 330, 420, 1.6), T("EMERGENCY EPISODE", 1000, 330, { size: 80, color: red, at: "emergency" }), H("Lex Fridman + 3 mathematicians", 1000, 480, { size: 54 })],
  },
  {
    at: "This is that three and a half hour",
    pace: 0.6,
    items: [
      T("3.5 HRS", 380, 360, { size: 110 }),
      A(600, 360, 900, 360, red),
      T("10 MIN", 1150, 360, { size: 120, color: red }),
      H("what AI solved", 300, 640, { size: 50, at: "actually solved" }),
      H("why they mourn", 800, 640, { size: 50, at: "mourning" }),
      H("what it can't give you", 1300, 640, { size: 50, color: red, at: "can't give you" }),
    ],
  },
];

// Bagian 1: malam saat matematika berubah.
const S01: Beat[] = [
  { at: "Part one", pace: 0.7, items: title("PART 1", "THE NIGHT MATH CHANGED", "moon") },
  {
    at: "It's a Tuesday evening",
    pace: 0.7,
    items: [I("city", 400, 420, 2.2), H("Tuesday evening, New York", 1100, 320, { size: 60 }), H("math museum gala", 1100, 460, { size: 60, at: "National Museum" })],
  },
  {
    at: "Rutgers number theorist",
    items: [I("person", 350, 440, 2), I("martini", 560, 470, 0.9, { at: "whiskey" }), I("phone", 160, 470, 0.9, { at: "his phone" }), T("ALEX KONTOROVICH", 1150, 340, { size: 72 }), H("number theorist, Rutgers", 1150, 480, { size: 54 })],
  },
  {
    at: "He keeps refreshing",
    items: [I("phone", 450, 420, 2.2), H("refresh... refresh...", 1100, 340, { size: 64 }), H("OpenAI drop ~6 pm", 1100, 480, { size: 60, color: red, at: "six o'clock" })],
  },
  {
    at: "Then it drops",
    items: [N(700, 800, 340, { size: 200, color: red, plain: true, at: "Seven hundred" }), T("SOLVED PROBLEMS", 800, 540, { size: 90 })],
  },
  {
    at: "And the second thing he sees",
    items: [T("QUASI-RH", 800, 330, { size: 140, color: purple }), H("a partial Riemann hypothesis", 800, 500, { size: 60, at: "partial version" }), H("his field's most famous problem", 800, 620, { size: 54, at: "most famous" })],
  },
  {
    at: "His first thought",
    items: [I("brain", 450, 420, 2), H("\"that can't be in this drop\"", 1100, 340, { size: 58 }), T("COULD NOT COMPUTE", 1100, 490, { size: 76, color: red, at: "could not compute" })],
  },
  {
    at: "At the same gala",
    items: [I("person", 400, 440, 2), T("ANKUR MOITRA", 1100, 340, { size: 90 }), H("MIT, complexity theory", 1100, 480, { size: 56 })],
  },
  {
    at: "For weeks there had been rumors",
    items: [I("thought", 420, 420, 2), H("rumors for weeks", 1100, 320, { size: 64 }), T("UNIQUE GAMES", 1100, 470, { size: 90, color: blue, at: "Unique Games" })],
  },
  {
    at: "One colleague even rushed",
    items: [I("scroll", 420, 420, 2), H("footnote:", 1100, 320, { size: 60 }), H("\"because of the rumors...\"", 1100, 460, { size: 60, color: red, at: "couldn't wait" })],
  },
  {
    at: "Just hours before the drop",
    items: [I("person", 380, 440, 1.6), I("person", 620, 440, 1.6), H("\"will you read the AI proof?\"", 1150, 340, { size: 54, at: "would read" }), T("\"NO.\"", 1150, 500, { size: 130, color: red, at: "simply: no" })],
  },
  {
    at: "And this wasn't even the first shock",
    items: [I("temple", 400, 420, 2), H("Princeton talk:", 1100, 320, { size: 60, at: "Princeton" }), H("\"AI is years away\"", 1100, 460, { size: 64, at: "years away" })],
  },
  {
    at: "Two days later",
    items: [T("FERMAT'S LAST THEOREM", 800, 260, { size: 76 }), N(13, 800, 440, { suffix: " MILLION LINES", size: 100, color: red, at: "Thirteen million" }), H("verified in Lean, by Anthropic's AI", 800, 600, { size: 54, at: "verified code" })],
  },
  {
    at: "As far as Alex understands",
    items: [I("person", 300, 430, 1.4), I("person", 480, 430, 1.4), I("person", 660, 430, 1.4, { at: "three people" }), H("their input:", 1200, 320, { size: 60, at: "their input" }), T("\"KEEP GOING\"", 1200, 470, { size: 100, color: red, at: "keep going" })],
  },
  {
    at: "Then came Navier-Stokes",
    items: [I("vortex", 450, 420, 2.2), T("ROUND 3", 1100, 420, { size: 140, color: red, at: "round three" })],
  },
];

// Bagian 2: apa yang benar-benar dipecahkan AI.
const S02: Beat[] = [
  { at: "Part two", items: title("PART 2", "WHAT AI ACTUALLY SOLVED", "magnifier") },
  {
    at: "Start with the prime numbers",
    items: [T("2 · 3 · 5 · 7 · 11 · 13", 800, 300, { size: 100, color: purple }), H("the atoms of multiplication", 800, 470, { size: 64, at: "atoms" }), I("question", 800, 660, 1.2, { at: "mystery" })],
  },
  {
    at: "Bernhard Riemann found a function",
    items: [I("wave", 450, 420, 2.2), H("signal processing", 1100, 330, { size: 64, at: "signal processing" }), H("for the primes", 1100, 460, { size: 64 })],
  },
  {
    at: "Alex compares it to a microphone",
    items: [I("headset", 380, 420, 1.6), A(560, 420, 760, 420, red), I("wave", 960, 420, 1.6), H("voice → frequencies", 1350, 420, { size: 54, at: "frequencies" })],
  },
  {
    at: "The Riemann hypothesis says",
    items: [I("violin", 300, 420, 1.4), I("violin", 560, 420, 1.4), I("violin", 820, 420, 1.4), H("every instrument", 1300, 330, { size: 60, at: "every instrument" }), T("SAME VOLUME", 1300, 480, { size: 90, color: red, at: "same volume" })],
  },
  {
    at: "In math terms",
    items: [A(200, 600, 1400, 600, theme.ink), H("all zeros on one line:", 800, 260, { size: 60 }), T("½", 800, 430, { size: 200, color: red, at: "one half" }), U(800, 560, 200, red)],
  },
  {
    at: "For seventy years",
    items: [N(70, 450, 380, { suffix: " YEARS", size: 130, color: red }), H("zero-free zone", 1150, 330, { size: 64, at: "zero free" }), H("thinner and thinner", 1150, 470, { size: 60, at: "thinner" })],
  },
  {
    at: "The AI proved an entire strip",
    items: [H("no zeros from", 800, 250, { size: 64 }), T("⅞  →  1", 800, 420, { size: 160, color: green, at: "seven eighths to one" }), O(800, 420, 320, 120, green)],
  },
  {
    at: "Push that seven eighths down",
    items: [T("⅞", 450, 400, { size: 180 }), A(600, 400, 900, 400, red), T("½", 1100, 400, { size: 180, color: red }), H("= full Riemann hypothesis", 800, 640, { size: 64, at: "full Riemann" })],
  },
  {
    at: "Alex is careful here",
    items: [H("this method can't get there", 800, 280, { size: 64, at: "can't get there" }), T("NEW IDEA NEEDED", 800, 440, { size: 100, color: orange, at: "new idea" }), H("checked in Lean: 100% correct", 800, 620, { size: 58, color: green, at: "hundred percent" })],
  },
  {
    at: "Then Navier-Stokes",
    items: [I("wave", 400, 420, 2.2), T("NAVIER-STOKES", 1100, 330, { size: 90 }), H("F = ma for water and air", 1100, 480, { size: 60, at: "F equals" })],
  },
  {
    at: "The million dollar question",
    items: [I("money", 400, 420, 2), H("smooth flow...", 1100, 320, { size: 64 }), T("BLOW UP TO ∞?", 1100, 470, { size: 90, color: red, at: "blow up" })],
  },
  {
    at: "University of Washington engineer",
    items: [I("person", 400, 440, 2), T("STEVE BRUNTON", 1100, 340, { size: 90 }), H("fluid dynamics, Univ. of Washington", 1100, 480, { size: 50 })],
  },
  {
    at: "A perfectly orchestrated vortex",
    items: [I("vortex", 350, 420, 2.2), I("skater", 800, 420, 2, { at: "figure skater" }), T("∞", 1250, 400, { size: 220, color: red, at: "becomes infinite" })],
  },
  {
    at: "But here's the twist",
    items: [I("airplane", 400, 360, 1.8, { at: "Airplane" }), I("heart", 400, 640, 1.2, { at: "artificial hearts" }), H("for engineers:", 1100, 320, { size: 60 }), T("ALMOST NOTHING CHANGED", 1100, 470, { size: 64, color: red, at: "almost nothing" })],
  },
  {
    at: "We solved the million dollar math problem",
    items: [T("$1M MATH", 450, 360, { size: 100, color: green }), U(450, 440, 400, green), T("$1T ENGINEERING", 1150, 360, { size: 90, color: red, at: "trillion dollar" }), H("still open", 1150, 500, { size: 64, at: "still open" })],
  },
  {
    at: "And the Unique Games Conjecture",
    items: [I("chip", 420, 420, 2), T("UNIQUE GAMES", 1100, 300, { size: 90, color: blue }), H("which hard problems can we approximate?", 1100, 450, { size: 46, at: "approximate" })],
  },
  {
    at: "Ankur admits",
    items: [H("\"too nice to be true\"", 800, 320, { size: 76, at: "too nice" }), T("IT'S TRUE.", 800, 500, { size: 150, color: red, at: "It's true" })],
  },
];

// Bagian 3: apakah AI benar-benar kreatif.
const S03: Beat[] = [
  { at: "Part three", items: title("PART 3", "IS AI REALLY CREATIVE?", "bulb") },
  {
    at: "Or is it just remixing",
    items: [I("book", 400, 420, 1.6), I("book", 620, 420, 1.6), A(780, 420, 960, 420, red), I("robot", 1200, 420, 1.8), H("remix?", 1200, 650, { size: 64 })],
  },
  {
    at: "The guests use a balloon",
    items: [I("balloon", 450, 420, 3), H("inside = everything humans know", 1100, 340, { size: 52, at: "inside of the balloon" })],
  },
  {
    at: "If AI only combines",
    items: [I("balloon", 450, 420, 3), T("CONVEX HULL", 1100, 360, { size: 90, color: red, at: "convex hull" }), H("\"nothing really new\"", 1100, 500, { size: 60, at: "Nothing really" })],
  },
  {
    at: "Alex prefers another picture",
    items: [I("tiles", 450, 420, 2.6), H("Tim Gowers: tiles", 1100, 320, { size: 64, at: "Tim Gowers" }), H("how far can known moves reach?", 1100, 460, { size: 52, at: "how far" })],
  },
  {
    at: "For quasi R H",
    items: [H("every move known to humans", 800, 260, { size: 64, at: "every single move" }), I("person", 500, 520, 1.4, { at: "kicking themselves" }), T("SHOCKING", 1100, 520, { size: 110, color: red, at: "shocking" }), H("the chain was so long", 1100, 660, { size: 54, at: "chain of moves" })],
  },
  {
    at: "Ankur adds something unsettling",
    items: [I("eye", 450, 420, 2), H("not how a human", 1100, 330, { size: 64, at: "don't look like" }), H("would solve it", 1100, 460, { size: 64 })],
  },
  {
    at: "It reminds him of image AI",
    items: [I("dog", 450, 420, 2.2), H("cat?", 450, 640, { size: 64 }), H("patterns humans can't see", 1100, 420, { size: 60, color: purple, at: "can't even see" })],
  },
  {
    at: "Another guest puts it",
    items: [I("radar", 450, 420, 2.4, { at: "radar" }), T("LIFTS THE FOG", 1100, 420, { size: 90, color: green, at: "lifts the fog" })],
  },
  {
    at: "And it redraws the map",
    items: [T("3SUM", 450, 380, { size: 150, color: blue, at: "three sum" }), H("coding-interview puzzle", 450, 540, { size: 50, at: "coding interviews" }), T("FASTER", 1150, 380, { size: 120, color: red, at: "faster" }), H("than anyone believed", 1150, 520, { size: 54 })],
  },
  {
    at: "An entire theory had been built",
    items: [I("house", 450, 420, 2.2), X(450, 420, 200, { at: "reorganize" }), H("a whole theory built on \"hard\"", 1100, 420, { size: 52 })],
  },
  {
    at: "There's a catch, though",
    items: [H("thousands attempted", 800, 260, { size: 64, at: "thousands" }), N(10, 800, 430, { suffix: "%", size: 180, color: red, at: "one in ten" }), H("only the wins published", 800, 610, { size: 60, at: "only the successes" })],
  },
  {
    at: "Nobody knows exactly",
    items: [I("question", 450, 420, 2), H("where is the line?", 1100, 330, { size: 64 }), H("\"our inability to predict\"", 1100, 470, { size: 56, color: red, at: "inability" })],
  },
];

// Bagian 4: mengapa matematikawan berduka.
const S04: Beat[] = [
  { at: "Part four", items: title("PART 4", "WHY MATHEMATICIANS MOURN", "skull") },
  {
    at: "Fields medalist Terence Tao",
    items: [I("medal", 400, 420, 2), T("TERENCE TAO", 1100, 300, { size: 90 }), T("\"HORRIFIED\"", 1100, 450, { size: 90, color: red, at: "horrified" }), H("years of slow research disrupted", 1100, 580, { size: 46, at: "casually disrupted" })],
  },
  {
    at: "You can't unhear a movie spoiler",
    items: [I("tv", 450, 420, 2), H("spoiler!", 450, 650, { size: 64 }), H("\"I mourn the path", 1100, 360, { size: 66, at: "I mourn" }), H("not taken\"", 1100, 480, { size: 66 })],
  },
  {
    at: "Ankur feels it too",
    items: [I("scroll", 420, 420, 1.8), H("old blueprint:", 1100, 300, { size: 60, at: "old blueprint" }), H("solve a famous problem → doors open", 1100, 430, { size: 46, at: "doors open" }), X(1100, 400, 300, { at: "blueprint is gone" })],
  },
  {
    at: "He says he feels more intellectually lonely",
    items: [I("person", 800, 400, 2.2), T("INTELLECTUALLY LONELY", 800, 680, { size: 80, color: purple })],
  },
  {
    at: "Some people now run scripts",
    items: [I("robot", 400, 420, 1.8), A(560, 420, 760, 420, red), I("scroll", 900, 380, 1), I("scroll", 1040, 420, 1), I("scroll", 1180, 380, 1), H("flooding the servers", 1050, 620, { size: 56, at: "flood" })],
  },
  {
    at: "And there's a darker side effect",
    items: [I("lock", 450, 420, 2), H("hide your ideas?", 1100, 330, { size: 70, color: red, at: "hiding their ideas" }), H("AI could finish it overnight", 1100, 470, { size: 52, at: "single night" })],
  },
  {
    at: "Alex tells the story of Andrew Wiles",
    items: [I("tv", 400, 420, 1.8), T("ANDREW WILES", 1100, 330, { size: 90 }), H("proved Fermat's Last Theorem", 1100, 470, { size: 54, at: "proving Fermat's" })],
  },
  {
    at: "He said he would never again",
    items: [H("\"never again", 800, 280, { size: 80 }), H("a moment that powerful\"", 800, 410, { size: 80 }), T("HE CHOKED UP", 800, 600, { size: 90, color: red, at: "choked up" })],
  },
  {
    at: "Could you get that moment",
    items: [I("power", 450, 420, 1.8), H("press a button?", 1100, 330, { size: 70 }), T("ABSOLUTELY NOT", 1100, 480, { size: 90, color: red, at: "Absolutely not" })],
  },
  {
    at: "It's like training for years",
    items: [I("mountain", 600, 460, 3), I("person", 300, 690, 0.8, { at: "climb a mountain" }), I("helicopter", 1100, 260, 1.6, { at: "helicopter lands" }), A(1050, 330, 680, 300, red, { at: "drops you" })],
  },
  {
    at: "Lex compares it to Olympic champions",
    items: [I("medal", 400, 420, 1.8), H("empty after gold", 400, 650, { size: 52 }), I("code", 1100, 420, 1.8, { at: "programmers" }), H("loss of meaning", 1100, 650, { size: 52, at: "loss of meaning" })],
  },
  {
    at: "But not everyone is mourning",
    items: [I("sprout", 420, 420, 2), T("HOPEFUL", 1100, 300, { size: 110, color: green, at: "hopeful" }), H("if another country invented teleportation...", 1100, 440, { size: 44, at: "teleportation" })],
  },
  {
    at: "Knowing a solution exists",
    items: [H("knowing it exists =", 800, 320, { size: 70 }), T("MOTIVATION", 800, 480, { size: 130, color: green })],
  },
];

// Bagian 5: apa yang tidak bisa diambil AI.
const S05: Beat[] = [
  { at: "Part five", items: title("PART 5", "WHAT AI CAN'T TAKE", "heart") },
  {
    at: "Ankur's answer starts",
    items: [I("door", 400, 420, 2.2), I("person", 600, 460, 1.4), T("THE DOORMAN FALLACY", 1150, 420, { size: 70, color: red, at: "doorman fallacy" })],
  },
  {
    at: "If you think a doorman only opens doors",
    items: [I("person", 400, 420, 1.8), A(560, 420, 760, 420, red), I("door", 950, 420, 1.8, { at: "automatic door" }), H("automatic door", 950, 650, { size: 54 })],
  },
  {
    at: "But you lose everything else",
    items: [H("the welcome", 500, 280, { size: 64 }), H("the recognition", 1100, 280, { size: 64, at: "recognition" }), H("the security", 500, 460, { size: 64, at: "security" }), H("being cared for", 1100, 460, { size: 64, color: red, at: "cared for" })],
  },
  {
    at: "The visible part",
    items: [H("visible job:", 450, 330, { size: 60 }), T("PROVING", 450, 470, { size: 100 }), H("real job:", 1150, 330, { size: 60, at: "the real job" }), T("THINKING DEEPLY", 1150, 470, { size: 80, color: green, at: "thinking deeply" })],
  },
  {
    at: "When problem solving becomes cheap",
    items: [I("coin", 450, 420, 1.6), H("problem solving = cheap", 450, 640, { size: 50 }), I("arrowUp", 1100, 420, 1.6, { at: "more valuable" }), H("everything else = more valuable", 1100, 640, { size: 50, color: green })],
  },
  {
    at: "So what's the one thing",
    items: [T("THE ONE THING", 800, 340, { size: 110, color: red }), H("a machine can't give you", 800, 500, { size: 70 }), I("question", 800, 700, 1)],
  },
  {
    at: "In the nineteen fifties",
    items: [I("scroll", 400, 420, 1.8), H("a 1950s play", 1100, 300, { size: 64 }), T("VON NEUMANN", 1100, 440, { size: 90, at: "von Neumann" }), H("meets God", 1100, 580, { size: 60, at: "heaven" })],
  },
  {
    at: "Is the Riemann hypothesis true",
    items: [H("\"Is the Riemann hypothesis true?\"", 800, 280, { size: 64 }), T("\"YES.\"", 800, 460, { size: 150, color: green, at: "God says yes" })],
  },
  {
    at: "Then von Neumann asks",
    items: [T("\"BUT HOW", 800, 300, { size: 120 }), T("DO YOU KNOW?\"", 800, 460, { size: 120, color: red })],
  },
  {
    at: "And God says",
    items: [H("\"I know where all the zeros are\"", 800, 300, { size: 64 }), A(200, 520, 1400, 520, theme.ink), T("½", 800, 440, { size: 120, color: purple })],
  },
  {
    at: "That's not enough for von Neumann",
    items: [I("person", 450, 420, 2.2), H("not enough!", 1100, 320, { size: 76, color: red }), H("...ends up in the other place", 1100, 470, { size: 54, at: "other place" })],
  },
  {
    at: "Alex sums it up",
    items: [H("math is not the fact.", 800, 290, { size: 80 }), T("IT'S THE WHY", 800, 470, { size: 150, color: red, at: "It's the why" }), U(800, 570, 760, red)],
  },
  {
    at: "If you tell me something is true",
    items: [I("brain", 450, 420, 2), H("true, but no \"why\"?", 1100, 330, { size: 60 }), N(0, 1100, 480, { suffix: " KNOWLEDGE", size: 90, color: red, plain: true, at: "added zero" })],
  },
  {
    at: "A proof sitting as ones and zeros",
    items: [I("server", 400, 420, 1.8), X(400, 420, 160, { at: "not the value" }), A(560, 420, 760, 420, green), I("brain", 1000, 420, 1.8, { at: "human heads" }), H("lives in human heads", 1250, 620, { size: 54, at: "human heads" })],
  },
  {
    at: "That's why he doesn't believe",
    items: [H("AI does NOT destroy math", 800, 340, { size: 80, color: green, at: "destroys mathematics" }), H("even if it could solve everything", 800, 500, { size: 56, at: "everything we can" })],
  },
  {
    at: "And as Ankur puts it",
    items: [I("person", 400, 420, 1.8), I("lightning", 650, 420, 1.2, { at: "fights back" }), H("a good problem", 1150, 330, { size: 64 }), T("FIGHTS BACK", 1150, 470, { size: 100, color: red, at: "fights back" })],
  },
];

// Bagian 6: nasihat untuk generasi yang cemas.
const S06: Beat[] = [
  { at: "Part six", items: title("PART 6", "ADVICE FOR AN ANXIOUS GENERATION", "gradcap") },
  {
    at: "Finally, Lex asked",
    items: [I("crowd", 450, 420, 2), H("what should young people do now?", 1100, 420, { size: 54, at: "young people" })],
  },
  {
    at: "Alex sees something new",
    items: [A(150, 600, 750, 600), H("bell curve", 450, 300, { size: 60, at: "bell curve" }), O(450, 480, 200, 90, blue), A(850, 600, 1450, 600), H("two groups", 1150, 300, { size: 60, color: red, at: "two groups" }), O(1000, 480, 90, 80, red), O(1300, 480, 90, 80, red)],
  },
  {
    at: "Students who use AI to quiz themselves",
    items: [I("robot", 400, 360, 1.4), H("quiz me!", 400, 560, { size: 56 }), A(560, 360, 680, 260, green), T("A+", 800, 260, { size: 110, color: green, at: "much better" }), I("robot", 1100, 360, 1.4, { at: "ask it for the answers" }), H("just the answers", 1100, 560, { size: 56, at: "for the answers" }), T("F", 1400, 360, { size: 110, color: red, at: "falling behind" })],
  },
  {
    at: "Be the head, not the tail",
    items: [T("BE THE HEAD", 800, 340, { size: 120, color: green }), H("not the tail", 800, 500, { size: 70 })],
  },
  {
    at: "And learn the basics anyway",
    items: [I("calculator", 450, 420, 2.2), N(70, 1100, 330, { suffix: " YEARS", size: 100, at: "seventy years" }), H("still learn your times tables", 1100, 480, { size: 54, at: "times tables" })],
  },
  {
    at: "Steve's advice",
    items: [I("book", 450, 420, 2), T("STAY CURIOUS", 1100, 340, { size: 90, color: green }), H("learn the fundamentals", 1100, 480, { size: 60, at: "fundamentals" })],
  },
  {
    at: "The guests also defend boredom",
    items: [I("sofa", 450, 420, 2.2), T("PROTECT", 1100, 300, { size: 100 }), T("BOREDOM", 1100, 440, { size: 110, color: purple })],
  },
  {
    at: "Lex warns",
    items: [I("phone", 450, 420, 2.2), H("doom scrolling", 1100, 330, { size: 70, color: red, at: "doom scrolling" }), H("steals your curiosity", 1100, 470, { size: 60, at: "steal" })],
  },
  {
    at: "Ankur's advice is the one that sticks",
    items: [I("scroll", 450, 420, 1.8), X(450, 420, 150, { at: "look good on paper" }), H("stop optimizing", 1100, 330, { size: 64 }), H("to look good on paper", 1100, 460, { size: 60 })],
  },
  {
    at: "When he started at MIT",
    items: [H("Sanjeev Arora:", 800, 240, { size: 60 }), H("\"pretend you already have tenure\"", 800, 380, { size: 66, color: blue, at: "pretend you already" }), H("and do what you wanted all along", 800, 520, { size: 56, at: "all along" })],
  },
  {
    at: "Pretend you've already won",
    items: [I("crown", 800, 300, 1.8), T("PRETEND YOU'VE ALREADY WON", 800, 540, { size: 70, color: red }), H("then ask what you would do", 800, 680, { size: 56, at: "ask what" })],
  },
  {
    at: "And remember Alex",
    items: [I("phone", 350, 420, 1.4), X(350, 420, 120, { at: "put down" }), I("beachball", 800, 420, 1.8, { at: "beach" }), I("person", 1150, 440, 1.6), I("person", 1350, 480, 1.1)],
  },
  {
    at: "Lex closes with this thought",
    items: [H("intelligence =", 800, 260, { size: 70 }), T("THE CHERRY ON TOP", 800, 400, { size: 100, color: red, at: "cherry on top" }), I("heart", 800, 620, 1.3, { at: "other humans" }), H("the main thing: people", 800, 760, { size: 56, at: "other humans" })],
  },
  {
    at: "This was three and a half hours",
    items: [
      H("in the full episode:", 800, 200, { size: 60, at: "much deeper" }),
      H("P vs NP", 350, 380, { size: 64, at: "P versus" }),
      H("why deep learning works", 800, 380, { size: 56, at: "deep learning" }),
      H("invented or discovered?", 1250, 380, { size: 56, at: "invented" }),
      I("play", 800, 600, 1.3, { at: "the link" }),
    ],
  },
  {
    at: "And if you want more",
    items: [I("bell", 800, 360, 1.8), T("SUBSCRIBE", 800, 600, { size: 120, color: red }), O(800, 360, 150, 150, red)],
  },
];

export const EP6_SCENES = { S00, S01, S02, S03, S04, S05, S06 };
