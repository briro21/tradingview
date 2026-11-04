import { Beat } from "../../board/Board";
import { A, H, I, N, O, S, T, U, X } from "../../board/dsl";
import { theme } from "../../theme";

const { red, blue, green, orange, purple } = theme;

const title = (n: string, name: string, icon: string): Beat["items"] => [
  T(n, 800, 200, { size: 70, color: blue }),
  T(name, 800, 360, { size: 100 }),
  U(800, 450, 860, red),
  I(icon, 800, 650, 1.5),
];

// Cold open: klaim paling mengejutkan sudah tergambar di frame 0, lalu janji isi video.
const S00: Beat[] = [
  {
    at: "You have never seen",
    drawn: true,
    items: [I("skullDark", 380, 420, 2.6), T("YOU HAVE NEVER SEEN", 1080, 300, { size: 70 }), T("THE REAL WORLD", 1080, 450, { size: 100, color: red }), U(1080, 540, 640, red)],
  },
  {
    at: "According to AI researcher",
    pace: 0.6,
    items: [I("brain", 400, 420, 2), T("JOSCHA BACH", 1050, 320, { size: 100 }), H("everything you see = a simulation", 1050, 470, { size: 54, at: "is a simulation" })],
  },
  {
    at: "In the next ten minutes",
    pace: 0.5,
    items: [
      I("skier", 260, 360, 1.1, { at: "abyss" }),
      H("the abyss", 260, 540, { size: 48 }),
      I("bird", 620, 360, 1.1, { at: "social media" }),
      H("a sick global brain", 620, 540, { size: 48 }),
      I("ghost", 980, 360, 1.1, { at: "spirit" }),
      H("spirit", 980, 540, { size: 48 }),
      I("cookie", 1340, 360, 1.1, { at: "cookie" }),
      H("happiness", 1340, 540, { size: 48 }),
      H("...and why your self cannot die", 800, 720, { size: 54, at: "cannot die" }),
    ],
  },
];

// Bagian 1: realitas adalah simulasi.
const S01: Beat[] = [
  { at: "We wake up every day", pace: 0.7, items: title("PART 1", "THE ILLUSION OF REALITY", "eye") },
  {
    at: "go to work",
    pace: 0.7,
    items: [I("briefcase", 400, 420, 1.8), T("FEELS REAL", 1100, 420, { size: 110 })],
  },
  {
    at: "But in his conversation with Lex Fridman",
    pace: 0.7,
    items: [I("person", 350, 420, 1.6), I("person", 650, 420, 1.6), H("Lex Fridman Podcast", 500, 700, { size: 54 }), H("hard to unsee", 1200, 420, { size: 70, color: red, at: "hard to unsee" })],
  },
  {
    at: "His claim is simple",
    items: [T("YOU HAVE NEVER LIVED", 800, 340, { size: 80 }), T("IN THE PHYSICAL WORLD", 800, 480, { size: 80, color: red, at: "physical world" })],
  },
  {
    at: "Think about where your brain is",
    items: [I("skullDark", 450, 420, 2.6), T("TOTAL DARKNESS", 1100, 420, { size: 90, color: purple, at: "total darkness" })],
  },
  {
    at: "It cannot see",
    items: [I("eye", 300, 380, 1.2), X(300, 380, 90), I("bell", 650, 380, 1.2, { at: "hear" }), X(650, 380, 90, { at: "hear" }), I("hand", 1000, 380, 1.2, { at: "touch" }), X(1000, 380, 90, { at: "touch" }), H("not directly", 1350, 380, { at: "directly" })],
  },
  {
    at: "All it ever receives",
    items: [I("lightning", 400, 420, 1.8), H("electrical signals", 1050, 340, { at: "electrical signals" }), H("spikes along nerves", 1050, 480, { at: "spikes" })],
  },
  {
    at: "So where does the world come from",
    items: [T("SO WHERE DOES", 800, 300, { size: 90 }), T("THE WORLD COME FROM?", 800, 440, { size: 100, color: red }), I("question", 800, 680, 1.2, { at: "The colors" })],
  },
  {
    at: "Bach's answer",
    items: [I("brain", 450, 420, 2.2), A(650, 420, 850, 420, red), T("BUILDS IT", 1150, 420, { size: 120, color: red, at: "builds it" })],
  },
  {
    at: "Everything you see is a kind of virtual reality",
    items: [I("headset", 450, 420, 2.4), T("VIRTUAL REALITY", 1100, 380, { size: 90, color: blue }), H("a model of the signals", 1100, 520, { at: "a model" })],
  },
  {
    at: "Your brain runs something like",
    items: [I("gamepad", 450, 420, 2.2), T("PHYSICS ENGINE", 1100, 360, { size: 90, color: purple, at: "physics engine" }), H("objects · gravity · faces", 1100, 500, { size: 54, at: "objects" })],
  },
  {
    at: "It is not a perfect copy",
    items: [H("perfect copy", 450, 380, { size: 76 }), S(450, 380, 420), T("A USEFUL STORY", 1100, 380, { size: 90, color: green, at: "useful story" }), H("so a primate survives", 1100, 520, { size: 56, at: "primate survive" })],
  },
  {
    at: "And the physical world itself",
    items: [I("atom", 450, 420, 2.2), H("quantum processes", 1100, 340, { at: "quantum" }), H("too fine and too fast", 1100, 480, { size: 56, at: "too fine" })],
  },
  {
    at: "What we call reality",
    items: [T("REALITY", 450, 420, { size: 120 }), H("=", 800, 420, { size: 110 }), T("A DREAM", 1150, 420, { size: 120, color: purple, at: "the dream" }), H("told by your nervous system", 800, 640, { size: 56, at: "nervous system" })],
  },
  {
    at: "You are not in the world",
    items: [I("book", 450, 420, 2), H("not in the world...", 1100, 320, { size: 64 }), T("IN A NOVEL", 1100, 470, { size: 110, color: red, at: "multimedia novel" }), H("written moment by moment", 1100, 620, { size: 50, at: "moment by moment" })],
  },
  {
    at: "So why would our minds",
    items: [I("question", 400, 420, 1.8), H("why the illusion?", 1100, 320, { at: "elaborate illusion" }), H("where is humanity heading?", 1100, 460, { size: 56, at: "heading" }), T("ANSWER AT THE END", 1100, 620, { size: 66, color: red, at: "by the end" })],
  },
  {
    at: "But first",
    items: [I("globe", 800, 400, 2.2), H("what our stories did to the planet", 800, 720, { size: 60, at: "the planet" })],
  },
];

// Bagian 2: jurang entropi.
const S02: Beat[] = [
  { at: "Since the Enlightenment", items: title("PART 2", "THE ENTROPIC ABYSS", "skier") },
  {
    at: "we have felt like gods",
    items: [I("factory", 450, 420, 2.2), I("crown", 1100, 380, 1.6, { at: "felt like gods" }), H("felt like gods", 1100, 600)],
  },
  {
    at: "But look at the price",
    items: [I("tree", 300, 420, 1.6), A(450, 420, 650, 420, red), I("factory", 850, 420, 1.6, { at: "fossil fuels" }), N(100, 1250, 360, { suffix: "M YEARS", size: 90, color: red, at: "a hundred million" }), H("burned in ~100 years", 1250, 500, { size: 50, at: "roughly a century" })],
  },
  {
    at: "Trees and ancient life",
    items: [I("tree", 400, 420, 1.8), I("lightning", 800, 420, 1.4, { at: "set on fire" }), H("in the blink of an eye", 1200, 420, { size: 56, at: "blink" })],
  },
  {
    at: "For thousands of years",
    items: [I("crowd", 400, 420, 1.8), H("hundreds of millions", 1100, 300, { size: 64, at: "hundreds of millions" }), A(1100, 360, 1100, 440, red), T("BILLIONS", 1100, 520, { size: 140, color: red, at: "billions" })],
  },
  {
    at: "because we found a way",
    items: [I("hourglass", 450, 420, 2), H("borrowed energy", 1100, 340, { at: "borrow energy" }), H("from the deep past", 1100, 480, { at: "deep past" })],
  },
  {
    at: "Bach describes our situation",
    items: [I("skier", 450, 420, 2.6), T("SKIING DOWN", 1100, 340, { size: 90, at: "skiing down" }), T("AN ABYSS", 1100, 480, { size: 120, color: red, at: "entropic abyss" })],
  },
  {
    at: "We are going fast",
    items: [H("fast", 400, 360, { size: 90 }), H("exhilarating", 800, 360, { size: 90, color: green, at: "exhilarating" }), T("HOW DOES IT END?", 800, 600, { size: 100, color: red, at: "how the run ends" })],
  },
  {
    at: "Look at your own life",
    items: [I("house", 300, 400, 1.4), I("snowflake", 300, 220, 0.6), A(420, 400, 560, 400), I("car", 700, 400, 1.4, { at: "drive" }), I("snowflake", 700, 220, 0.6, { at: "drive" }), A(820, 400, 960, 400, theme.ink, { at: "office" }), I("city", 1100, 400, 1.4, { at: "office" }), I("snowflake", 1100, 220, 0.6, { at: "office" })],
  },
  {
    at: "It is a closed cooling chain",
    items: [T("A CLOSED", 800, 280, { size: 100 }), T("COOLING CHAIN", 800, 420, { size: 110, color: blue }), H("food too: trucks → shelves", 800, 620, { size: 56, at: "Our food" })],
  },
  {
    at: "If that chain breaks",
    items: [I("thermometer", 450, 420, 2.2), H("a few days of heat wave", 1100, 320, { size: 56, at: "heat wave" }), T("FRAGILE", 1100, 480, { size: 140, color: red, at: "fragile" })],
  },
  {
    at: "Our great grandparents",
    items: [I("sprout", 300, 400, 1.3), H("grow food", 300, 600), I("wrench", 650, 400, 1.2, { at: "mend clothes" }), H("mend", 650, 600, { at: "mend clothes" }), I("snowflake", 1000, 400, 1.2, { at: "hard winter" }), H("survive winter", 1000, 600, { at: "hard winter" }), H("us?", 1350, 380, { size: 90, at: "Most of us" }), H("a week", 1350, 520, { color: red, at: "a week" })],
  },
  {
    at: "In nature",
    items: [I("virus", 450, 420, 2), H("consume faster than it recovers", 1100, 320, { size: 50, at: "faster than" }), T("COLLAPSE", 1100, 480, { size: 120, color: red, at: "collapses" })],
  },
  {
    at: "Our civilization is betting",
    items: [I("dice", 450, 420, 1.8), H("\"we are in control\"", 1100, 340, { size: 64, at: "in control" }), H("is anyone steering?", 1100, 500, { color: red, at: "steering" })],
  },
  {
    at: "The machine is rolling downhill",
    items: [I("car", 450, 420, 2), A(650, 300, 1000, 600, red, { bend: 0 }), I("stop", 1250, 420, 1.4, { at: "which button" }), I("question", 1250, 220, 0.7, { at: "which button" })],
  },
  {
    at: "So could something smarter",
    items: [H("an emergency brake?", 800, 300, { size: 80 }), I("robot", 800, 600, 2, { at: "artificial intelligence" }), T("AI?", 1100, 600, { size: 120, color: blue, at: "artificial intelligence" })],
  },
];

// Bagian 3: AI dan otak global.
const S03: Beat[] = [
  { at: "For Bach, AI is much more", items: title("PART 3", "AI & THE GLOBAL BRAIN", "network") },
  {
    at: "He sees it as humanity's last",
    items: [I("scroll", 450, 420, 2), T("THE LAST GREAT", 1100, 340, { size: 80 }), T("PHILOSOPHICAL PROJECT", 1100, 470, { size: 66, color: purple })],
  },
  {
    at: "Intelligence, at its core",
    items: [T("INTELLIGENCE", 450, 380, { size: 90 }), H("=", 800, 380, { size: 110 }), T("MODELS OF REALITY", 1150, 380, { size: 70, color: blue, at: "models of reality" })],
  },
  {
    at: "And the real goal of AI",
    items: [I("robot", 400, 420, 1.8), I("mirror", 800, 420, 1.8, { at: "model itself" }), H("a mind that understands", 1250, 360, { size: 54, at: "understands" }), H("what a mind is", 1250, 480, { size: 54 })],
  },
  {
    at: "Seen this way",
    items: [I("monitor", 450, 420, 2), T("TURING TEST", 1100, 340, { size: 100 }), H("not a test of machines", 1100, 480, { at: "not really" })],
  },
  {
    at: "It is a recursive test of us",
    items: [I("infinityLoop", 450, 420, 2.2), T("A TEST OF US", 1100, 380, { size: 100, color: red }), H("can we build a mind?", 1100, 520, { at: "build one" })],
  },
  {
    at: "If we can rebuild ourselves",
    items: [I("person", 400, 420, 1.6), A(550, 420, 750, 420, green), I("robot", 900, 420, 1.6), H("understood ourselves", 1300, 420, { size: 56, at: "understood ourselves" })],
  },
  {
    at: "But instead of building a wise mind",
    items: [T("A WISE MIND", 450, 400, { size: 90, color: green }), S(450, 400, 460, { at: "sick one" }), T("A SICK ONE", 1150, 400, { size: 100, color: red, at: "sick one" })],
  },
  {
    at: "Bach compares social media",
    items: [I("network", 450, 420, 2.4), T("A GLOBAL BRAIN", 1100, 380, { size: 96, color: purple, at: "global brain" }), H("billions wired together", 1100, 520, { at: "billions of people" })],
  },
  {
    at: "And what does that brain do",
    items: [H("no sense of real", 400, 340, { size: 60, at: "no stable" }), H("no brakes", 800, 340, { size: 60, at: "no brakes" }), H("no one in charge", 1200, 340, { size: 60, at: "no one in charge" }), I("warning", 800, 620, 1.4)],
  },
  {
    at: "He describes Twitter",
    items: [I("bird", 450, 420, 2.4), I("lightning", 650, 250, 0.9), T("PERMANENT", 1100, 340, { size: 100, color: red, at: "permanent seizure" }), T("SEIZURE", 1100, 480, { size: 120, color: red })],
  },
  {
    at: "Each of us becomes",
    items: [I("phone", 400, 420, 1.8), H("reinforcement learning agent", 1050, 300, { size: 54 }), H("likes · outrage · arguments", 1050, 460, { size: 56, color: red, at: "likes" })],
  },
  {
    at: "A tiny hit of dopamine",
    items: [I("pill", 450, 420, 1.8), T("DOPAMINE", 1100, 360, { size: 120, color: orange }), H("again and again", 1100, 500, { at: "again and again" })],
  },
  {
    at: "The network learns",
    items: [H("keeps us scrolling", 450, 380, { size: 70, color: red }), H("vs", 800, 380, { size: 70 }), H("keeps us sane", 1150, 380, { size: 70, color: green, at: "keeps us sane" }), X(1150, 380, 220, { at: "sane" })],
  },
  {
    at: "Meanwhile, in the physical world",
    items: [I("globe", 400, 420, 1.8), I("money", 800, 420, 1.4, { at: "clever accounting" }), H("\"innovation\"", 1250, 420, { size: 70, color: red, at: "innovation" })],
  },
  {
    at: "A wise global mind",
    items: [I("skier", 450, 420, 2), H("a wise mind would turn", 1100, 300, { size: 60, at: "change course" }), I("phone", 1100, 560, 1.2, { at: "refreshing" }), H("we're refreshing our feed", 1100, 760, { size: 54, at: "refreshing" })],
  },
  {
    at: "To understand why we behave",
    items: [I("magnifier", 450, 420, 2), A(650, 420, 850, 420), I("cell", 1100, 420, 2, { at: "smallest unit" })],
  },
];

// Bagian 4: roh sebagai sistem operasi.
const S04: Beat[] = [
  { at: "What is life, really", items: title("PART 4", "THE OPERATING SYSTEM", "cell") },
  {
    at: "A cell is an extraordinary",
    items: [I("cell", 450, 420, 2.4), H("molecular machine", 1100, 300, { at: "molecular machine" }), H("harvests energy", 1100, 420, { at: "harvests energy" }), T("FIGHTS ENTROPY", 1100, 560, { size: 80, color: green, at: "against entropy" })],
  },
  {
    at: "In a sense, a cell is",
    items: [I("chip", 450, 420, 2), T("A BIOLOGICAL", 1100, 340, { size: 90 }), T("COMPUTER", 1100, 480, { size: 120, color: blue })],
  },
  {
    at: "When billions of cells",
    items: [I("cell", 280, 420, 0.8), I("cell", 380, 330, 0.8), I("cell", 400, 500, 0.8), A(550, 420, 750, 420), I("tree", 900, 420, 1.2, { at: "a plant" }), I("dog", 1150, 420, 1.2, { at: "an animal" }), I("person", 1400, 420, 1.2, { at: "a human" })],
  },
  {
    at: "Something has to coordinate them",
    items: [T("ONE ORGANISM", 450, 400, { size: 90, color: green }), H("not a crowd", 1150, 400, { size: 80, at: "not as a crowd" }), I("crowd", 1150, 620, 1.2)],
  },
  {
    at: "And here Bach makes one",
    items: [T("HIS MOST", 800, 300, { size: 100 }), T("SURPRISING CLAIM", 800, 450, { size: 110, color: red })],
  },
  {
    at: "He says that when ancient cultures",
    items: [I("temple", 450, 420, 2.2), T("\"SPIRIT\"", 1100, 380, { size: 130, color: purple, at: "spirit" }), H("pointed at something real", 1100, 540, { size: 56, at: "something real" })],
  },
  {
    at: "Spirit is an old word",
    items: [T("SPIRIT", 450, 420, { size: 120, color: purple }), H("=", 800, 420, { size: 110 }), T("OPERATING SYSTEM", 1170, 420, { size: 70, color: blue, at: "operating system" })],
  },
  {
    at: "It is the software that runs",
    items: [I("robot", 450, 420, 2.2), H("software of an autonomous robot", 1100, 340, { size: 50, at: "autonomous robot" }), H("makes a body act as one", 1100, 480, { size: 54, at: "act as one" })],
  },
  {
    at: "A plant has something like a spirit",
    items: [I("tree", 300, 420, 1.4), H("a plant", 300, 640), I("globe", 800, 420, 1.4, { at: "An ecosystem" }), H("an ecosystem", 800, 640, { at: "An ecosystem" }), I("person", 1300, 420, 1.4, { at: "You have one" }), H("you", 1300, 640, { at: "You have one" })],
  },
  {
    at: "And it does not stop",
    items: [I("house", 260, 420, 1.1, { at: "Families" }), I("briefcase", 600, 420, 1.1, { at: "companies" }), I("temple", 940, 420, 1.1, { at: "religions" }), I("flag", 1280, 420, 1.1, { at: "nations" }), T("HIGHER LEVEL OS", 800, 680, { size: 80, color: blue, at: "higher level" })],
  },
  {
    at: "They coordinate millions of people",
    items: [I("crowd", 450, 420, 2), H("like your mind coordinates", 1100, 340, { size: 54, at: "the way your mind" }), H("billions of cells", 1100, 480, { size: 54, at: "billions of cells" })],
  },
  {
    at: "A beehive works like this",
    items: [I("beehive", 450, 420, 2.2), H("so does", 1100, 340, { at: "So does" }), T("CIVILIZATION", 1100, 480, { size: 100, color: orange, at: "a civilization" })],
  },
  {
    at: "We like to think of ourselves",
    items: [H("independent heroes?", 450, 380, { size: 70 }), S(450, 380, 480, { at: "cells inside" }), I("cell", 1100, 380, 1.6, { at: "cells inside" }), T("SUPERORGANISM", 1100, 620, { size: 86, color: purple, at: "superorganism" })],
  },
  {
    at: "And a superorganism does not care",
    items: [I("cell", 400, 420, 1.4), X(400, 420, 120), H("it cares about", 1050, 340, { at: "It cares" }), T("THE WHOLE SYSTEM", 1050, 480, { size: 80, color: red, at: "whole system" })],
  },
  {
    at: "Think about how strange that is",
    items: [I("flag", 300, 400, 1.3, { at: "beliefs" }), H("beliefs", 300, 600, { at: "beliefs" }), I("scroll", 800, 400, 1.3, { at: "rules" }), H("rules", 800, 600, { at: "rules" }), I("star", 1300, 400, 1.2, { at: "beautiful" }), H("beauty", 1300, 600, { at: "beautiful" }), T("INSTALLED", 800, 780, { size: 90, color: purple, at: "installed" })],
  },
  {
    at: "That raises the most personal question",
    items: [I("chip", 350, 420, 1.4), I("person", 650, 420, 1.6, { at: "primate body" }), T("WHAT HAPPENS", 1150, 340, { size: 80 }), T("WHEN IT STOPS?", 1150, 470, { size: 86, color: red, at: "body stops" })],
  },
];

// Bagian 5: kematian dan identitas.
const S05: Beat[] = [
  { at: "The deepest human fear", items: title("PART 5", "DEATH & IDENTITY", "skull") },
  {
    at: "The fear that we will simply disappear",
    items: [I("person", 450, 420, 1.8), H("simply disappear", 1100, 420, { size: 76, color: red, at: "disappear" })],
  },
  {
    at: "But if reality as we know it",
    items: [I("brain", 400, 420, 1.6), A(560, 420, 760, 420), T("THE SELF", 1100, 360, { size: 110 }), H("is part of the model", 1100, 500, { at: "part of that model" })],
  },
  {
    at: "Your identity is not a physical object",
    items: [I("box", 400, 420, 1.6), X(400, 420, 130), T("A PATTERN", 1100, 360, { size: 110, color: blue, at: "a pattern" }), H("a representation", 1100, 500, { at: "representation" })],
  },
  {
    at: "Software does not breathe",
    items: [I("code", 450, 420, 2.2), H("no breath", 1100, 300, { size: 64 }), H("no fixed body", 1100, 420, { size: 64, at: "no fixed body" }), H("not born, does not die", 1100, 560, { size: 60, color: red, at: "born or dies" })],
  },
  {
    at: "What ends at death",
    items: [I("pause", 450, 420, 2), H("what ends:", 1100, 320, { size: 64 }), T("THE STORYTELLER", 1100, 460, { size: 80, color: purple, at: "telling the story" })],
  },
  {
    at: "He gives a fascinating example",
    items: [I("temple", 450, 420, 2.2), T("THE DALAI LAMA", 1100, 420, { size: 100, at: "Dalai Lama" })],
  },
  {
    at: "In Tibetan tradition",
    items: [I("person", 300, 420, 1.4), A(420, 420, 560, 420, orange, { at: "passed on" }), I("person", 700, 420, 1.4, { at: "passed on" }), A(820, 420, 960, 420, orange, { at: "generation after" }), I("person", 1100, 420, 1.4, { at: "generation after" }), H("a role, passed on", 700, 680, { size: 60, at: "a role" })],
  },
  {
    at: "A kind of software",
    items: [I("code", 450, 420, 2), H("reinstalled", 1100, 340, { size: 80, at: "reinstalled" }), H("into a new body", 1100, 480, { at: "new body" })],
  },
  {
    at: "And Bach suggests that all of us",
    items: [I("cell", 400, 420, 1.6), X(400, 420, 130, { at: "not your cells" }), T("YOU ARE A STORY", 1100, 380, { size: 86, color: purple, at: "You are a story" }), H("your organism tells", 1100, 520, { at: "organism tells" })],
  },
  {
    at: "From this point of view",
    items: [I("warning", 450, 420, 2), T("FEAR OF DEATH", 1100, 340, { size: 90, color: red }), H("a program panicking", 1100, 480, { at: "panic of a program" }), H("about shutdown", 1100, 600, { at: "shut down" })],
  },
  {
    at: "It is a useful panic",
    items: [H("useful", 450, 340, { size: 90, color: green }), H("keeps the primate alive", 450, 500, { size: 56, at: "primate alive" }), H("but not the final truth", 1150, 420, { size: 64, color: red, at: "final truth" })],
  },
  {
    at: "Bach also points out",
    items: [I("meditate", 450, 420, 2.4), H("meditation", 1100, 340, { at: "meditation" }), H("a shift of attention", 1100, 480, { at: "shift of attention" })],
  },
  {
    at: "They notice that the ego",
    items: [T("EGO", 450, 400, { size: 160 }), H("= a tool", 450, 600, { at: "a tool" }), T("NOT THE MASTER", 1100, 400, { size: 90, color: red, at: "not the master" })],
  },
  {
    at: "Seeing that can be frightening",
    items: [H("frightening", 450, 420, { size: 90, color: red }), H("liberating", 1150, 420, { size: 90, color: green, at: "liberating" }), I("star", 1150, 640, 0.9, { at: "liberating" })],
  },
];

// Bagian 6: kebahagiaan adalah kue (pembayaran janji di awal).
const S06: Beat[] = [
  { at: "So we arrive at the question", items: title("PART 6", "HAPPINESS IS A COOKIE", "cookie") },
  {
    at: "If the world we see is a simulation",
    items: [I("headset", 300, 380, 1.2), H("a simulation", 300, 580, { size: 50 }), I("book", 800, 380, 1.2, { at: "self is a story" }), H("a story", 800, 580, { size: 50 }), I("skier", 1300, 380, 1.2, { at: "skiing toward" }), H("an abyss", 1300, 580, { size: 50 })],
  },
  {
    at: "then what is all of this for",
    items: [T("WHAT IS IT FOR?", 800, 300, { size: 110, color: red }), T("WHAT IS HAPPINESS?", 800, 480, { size: 100, at: "what is happiness" })],
  },
  {
    at: "Bach's answer begins with suffering",
    items: [I("person", 400, 420, 1.6), I("bricks", 750, 420, 1.6, { at: "pushing against" }), T("SUFFERING", 1200, 360, { size: 100, color: red }), H("caring about what you can't change", 1200, 500, { size: 44, at: "cannot change" })],
  },
  {
    at: "And happiness",
    items: [I("globe", 450, 420, 2), T("THE WORLD", 1100, 340, { size: 100 }), T("IS NEUTRAL", 1100, 480, { size: 110, color: blue, at: "is neutral" })],
  },
  {
    at: "Rain is not sad",
    items: [I("rain", 300, 400, 1.4), H("not sad", 300, 620), I("money", 750, 400, 1.4, { at: "Money" }), H("not joyful", 750, 620, { at: "not joyful" }), I("brain", 1250, 400, 1.6, { at: "Only your mind" }), H("decides the meaning", 1250, 620, { at: "decides" })],
  },
  {
    at: "That is why Bach offers this line",
    items: [I("cookie", 400, 420, 2.4), H("\"Happiness is a cookie", 1080, 340, { size: 64, at: "happiness is a cookie" }), H("your brain bakes", 1080, 460, { size: 64, at: "brain bakes" }), H("for itself.\"", 1080, 580, { size: 64, color: red, at: "for itself" })],
  },
  {
    at: "Think of the cookie a parent",
    items: [I("cookie", 350, 420, 1.4), A(500, 420, 700, 420), I("person", 850, 440, 1.2), I("sprout", 1250, 420, 1.4, { at: "vegetables" }), H("eat your vegetables", 1250, 640, { size: 54, at: "vegetables" })],
  },
  {
    at: "Your nervous system does the same thing",
    items: [I("brain", 450, 420, 2), H("pleasure = a reward", 1100, 320, { size: 64, at: "Pleasure" }), H("keeps you fighting, learning", 1100, 460, { size: 54, at: "fighting" }), H("and building", 1100, 560, { size: 54, at: "building" })],
  },
  {
    at: "The cookie was never out there",
    items: [I("cookie", 450, 420, 2), T("NEVER OUT THERE", 1100, 340, { size: 80 }), T("BAKED IN HERE", 1100, 480, { size: 96, color: green, at: "baked in here" })],
  },
  {
    at: "This also explains why",
    items: [H("every goal reached...", 800, 260, { size: 70 }), H("still empty", 800, 380, { size: 70, color: red, at: "still feel empty" }), I("briefcase", 400, 620, 1.1, { at: "promotion" }), I("house", 800, 620, 1.1, { at: "the house" }), I("money", 1200, 620, 1.1, { at: "bank account" })],
  },
  {
    at: "Each one delivers a cookie",
    items: [I("cookie", 400, 420, 1.6), A(560, 500, 760, 300, red), H("the bar goes up", 1100, 340, { size: 70, at: "raises the bar" }), H("a signal to keep you moving", 1100, 500, { size: 54, at: "a signal" })],
  },
  {
    at: "So stop chasing the cookie",
    items: [I("cookie", 350, 420, 1.4), X(350, 420, 120), A(500, 420, 700, 420, green), I("code", 900, 420, 1.6, { at: "your own software" }), H("understand your software", 1300, 420, { size: 50, at: "your own software" })],
  },
  {
    at: "Notice the stories your mind tells you",
    items: [I("book", 300, 400, 1.2), H("stories", 300, 600), I("cookie", 800, 400, 1.2, { at: "rewards" }), H("rewards", 800, 600, { at: "rewards" }), I("warning", 1300, 400, 1.2, { at: "fears" }), H("fears", 1300, 600, { at: "fears" })],
  },
  {
    at: "Because once you see the simulation",
    items: [H("a character", 450, 400, { size: 80 }), S(450, 400, 360, { at: "start becoming" }), A(650, 400, 850, 400, green), T("THE AUTHOR", 1150, 400, { size: 120, color: green, at: "its author" })],
  },
  {
    at: "If this conversation bent your mind",
    items: [I("play", 400, 400, 1.8), H("full Lex Fridman episode", 400, 640, { size: 50, at: "full Lex Fridman" }), H("link in description", 400, 740, { size: 46 }), I("bell", 1150, 400, 1.6, { at: "subscribe" }), O(1150, 400, 180, 180, red)],
  },
];

export const EP5_SCENES = { S00, S01, S02, S03, S04, S05, S06 };
