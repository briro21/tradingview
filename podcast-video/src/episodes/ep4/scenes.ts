import { Beat } from "../../board/Board";
import { A, H, I, N, O, S, T, U, X } from "../../board/dsl";
import { theme } from "../../theme";

const { red, blue, green, orange, purple } = theme;

// Cold open: misteri dulu (data retensi Episode 1), panel pertama sudah tergambar di frame 0.
const S00: Beat[] = [
  {
    at: "Under the floor",
    drawn: true,
    items: [I("ruin", 380, 330, 2.4), I("planks", 380, 660, 1.6), I("lockbox", 380, 680, 0.9), T("WHAT WAS UNDER", 1080, 300, { size: 80 }), T("THE FLOOR?", 1080, 450, { size: 120, color: red }), U(1080, 540, 560, red)],
  },
  {
    at: "Inside a copper box",
    pace: 0.6,
    items: [I("lockbox", 300, 420, 1.8), N(100, 300, 700, { prefix: "+", suffix: " YEARS", size: 70, color: orange, at: "over a century" }), I("letter", 800, 420, 1.6, { at: "desperate letters" }), H("letters", 800, 640), I("secretMap", 1300, 420, 1.6, { at: "a map" }), H("a secret wing", 1300, 640, { color: red, at: "secret wing" })],
  },
  {
    at: "But to understand",
    pace: 0.6,
    items: [I("ruin", 380, 420, 2), A(620, 420, 940, 420, red, { at: "come back" }), I("mansion", 1200, 420, 2.4), H("first: bring it back from the dead", 800, 760, { size: 56, at: "come back" })],
  },
];

// Phase 1: The Embrace of Silence.
const S01: Beat[] = [
  {
    at: "Time is a quiet thief",
    items: [T("PHASE 1", 800, 200, { size: 70, color: blue }), T("THE EMBRACE OF SILENCE", 800, 360, { size: 90 }), U(800, 440, 900, red), I("hourglass", 800, 640, 1.5)],
  },
  {
    at: "It erodes it",
    items: [I("hourglass", 400, 420, 1.9), H("season by season", 1050, 420, { size: 80 })],
  },
  {
    at: "First the laughter",
    items: [I("crowd", 300, 380, 1.3), H("laughter", 300, 600), I("lightning", 800, 380, 1.2, { at: "warmth" }), H("warmth", 800, 600), I("house", 1300, 380, 1.3, { at: "the roof" }), H("the roof", 1300, 600)],
  },
  {
    at: "Look at this place",
    items: [I("ruin", 450, 420, 2.6), T("A MONUMENT TO", 1100, 340, { size: 70, at: "a monument" }), T("IMPERMANENCE", 1100, 460, { size: 90, color: purple })],
  },
  {
    at: "Ivy has crawled",
    items: [I("ivy", 350, 420, 2.4), I("ruin", 800, 420, 2), A(1000, 420, 1180, 420, green, { at: "for the earth" }), I("sprout", 1350, 420, 1.4)],
  },
  {
    at: "Nature is patient",
    items: [I("sprout", 450, 420, 2), T("NATURE IS PATIENT", 1100, 340, { size: 76, color: green }), H("it erases our footsteps", 1100, 480, { at: "erases" })],
  },
  {
    at: "The glass of the grand conservatory",
    items: [I("brokenWindow", 400, 400, 2.2), I("diamond", 900, 420, 1.2, { at: "crushed diamonds" }), H("like crushed diamonds", 1250, 420, { size: 54, at: "crushed diamonds" })],
  },
  {
    at: "Floorboards once polished",
    items: [I("planks", 400, 420, 2.2), I("rain", 900, 300, 1.4, { at: "decades of rain" }), H("buckled and warped", 1150, 560, { at: "buckled" })],
  },
  {
    at: "The grand staircase",
    items: [I("stairs", 450, 420, 2.4), A(650, 260, 900, 220, red, { at: "collapsed" }), H("to collapsed ceilings", 1150, 300, { size: 56 }), H("and empty doorways", 1150, 420, { size: 56, at: "empty doorways" })],
  },
  {
    at: "And yet",
    items: [I("ruin", 450, 420, 2.2), T("THE BONES", 1100, 340, { size: 110, at: "bones" }), T("ARE STRONG", 1100, 480, { size: 110, color: green, at: "still strong" })],
  },
  {
    at: "It is not waiting",
    items: [H("not a miracle...", 800, 260, { size: 72 }), S(800, 260, 460, { at: "intervention" }), T("AN INTERVENTION", 800, 440, { size: 110, color: red, at: "intervention" }), I("clock", 800, 690, 1.3, { at: "rewind the clock" })],
  },
];

// Phase 2: Stripping the Veil.
const S02: Beat[] = [
  {
    at: "Before a resurrection",
    items: [T("PHASE 2", 800, 200, { size: 70, color: blue }), T("STRIPPING THE VEIL", 800, 360, { size: 100 }), U(800, 450, 860, red), H("first, a reckoning", 800, 620, { at: "reckoning" })],
  },
  {
    at: "The first job",
    items: [N(50, 400, 420, { suffix: " YEARS", size: 120, color: red }), H("of neglect", 400, 600), I("dust", 1150, 420, 2)],
  },
  {
    at: "The vines are pulled back",
    items: [I("ivy", 350, 420, 2), X(350, 420, 150), A(560, 420, 820, 420, green), I("bricks", 1100, 420, 2, { at: "intricate stonework" }), H("sun after 50 years", 1100, 680, { size: 56, at: "fifty years" })],
  },
  {
    at: "Rotten timber",
    items: [I("planks", 350, 420, 1.6), I("dust", 650, 420, 1.2), A(820, 420, 1020, 420, red), H("the foundation", 1250, 420, { size: 70, at: "foundation" })],
  },
  {
    at: "This is the most brutal phase",
    items: [T("WORSE", 450, 380, { size: 130, color: red, at: "looks worse" }), H("before it looks", 800, 560), T("BETTER", 1150, 380, { size: 130, color: green, at: "looks better" })],
  },
  {
    at: "The skeleton of the mansion",
    items: [I("ruin", 450, 420, 2.4), H("open to the sky", 1100, 420, { size: 74 })],
  },
  {
    at: "Scaffolding rises",
    items: [I("scaffold", 450, 420, 2.6), T("A STEEL CAGE", 1100, 360, { size: 96, at: "steel cage" }), H("holding up a fragile giant", 1100, 500, { size: 56, at: "fragile giant" })],
  },
  {
    at: "But as the dust settles",
    items: [I("door", 450, 420, 2.2, { at: "archways" }), H("the rooms make sense again", 1100, 420, { size: 60, at: "flow of the rooms" })],
  },
  {
    at: "It is no longer a ruin",
    items: [T("RUIN", 450, 420, { size: 140 }), S(450, 420, 360, { at: "no longer" }), A(650, 420, 900, 420, red), T("CANVAS", 1150, 420, { size: 140, color: green, at: "canvas" })],
  },
];

// Penemuan kotak tembaga (dipindah ke tengah video agar ada misteri yang ditunggu).
const S03: Beat[] = [
  {
    at: "And then, in the third week",
    items: [N(3, 400, 380, { prefix: "WEEK ", size: 140, color: red }), T("THE FIRST SECRET", 1050, 420, { size: 90, at: "first secret" }), U(1050, 500, 640, red)],
  },
  {
    at: "In the master study",
    items: [I("planks", 450, 420, 2.4), I("crowbar", 450, 300, 1.4, { at: "crowbar" }), H("not wood. not stone.", 1150, 340, { size: 64, at: "wasn't wood" }), T("METAL", 1150, 500, { size: 140, color: red, at: "metal" })],
  },
  {
    at: "Wedged between",
    items: [I("planks", 450, 300, 2), I("lockbox", 450, 560, 1.6, { at: "copper lockbox" }), T("A COPPER BOX", 1100, 360, { size: 100, color: orange, at: "copper lockbox" }), H("hidden on purpose", 1100, 500, { at: "on purpose" })],
  },
  {
    at: "Inside, there was no gold",
    items: [I("coin", 300, 380, 1.3), X(300, 380, 110), I("diamond", 650, 380, 1.3, { at: "No jewels" }), X(650, 380, 110, { at: "No jewels" }), I("letter", 1150, 400, 2, { at: "brittle letters" }), H("brittle letters", 1150, 650)],
  },
  {
    at: "They were written by",
    items: [H("the original architect", 800, 220, { size: 70 }), N(1912, 800, 420, { from: 1900, plain: true, size: 180, color: red, at: "grand opening" }), H("3 months before the grand opening", 800, 620, { size: 58 })],
  },
  {
    at: "And they were not letters of triumph",
    items: [T("TRIUMPH", 450, 420, { size: 120 }), S(450, 420, 520, { at: "desperation" }), T("DESPERATION", 1150, 420, { size: 110, color: red, at: "desperation" })],
  },
  {
    at: "The architect was writing",
    items: [I("person", 300, 420, 1.6), A(450, 420, 650, 420), I("person", 800, 420, 1.6), H("silent partner", 800, 680, { size: 54 }), I("money", 1250, 400, 1.6, { at: "shortage of money" }), X(1250, 400, 140, { at: "shortage" })],
  },
  {
    at: "To finish the grand facade",
    items: [I("mansion", 450, 420, 2.4), T("CORNERS CUT", 1100, 360, { size: 100, color: red, at: "corners" }), H("where no one could see", 1100, 500, { at: "no one could see" })],
  },
  {
    at: "But beneath the letters",
    items: [I("secretMap", 450, 420, 2.2), O(450, 420, 200, 190, red), T("SOMETHING", 1100, 340, { size: 100 }), T("STRANGER...", 1100, 480, { size: 110, color: red }), H("we'll come back to it", 1100, 640, { size: 54, at: "come back" })],
  },
];

// Phase 3: The Turning of the Tide.
const S04: Beat[] = [
  {
    at: "Now the pendulum swings back",
    items: [T("PHASE 3", 800, 200, { size: 70, color: blue }), T("THE TURNING OF THE TIDE", 800, 360, { size: 86 }), U(800, 440, 900, red), I("wave", 800, 640, 1.4)],
  },
  {
    at: "The destruction stops",
    items: [T("DESTRUCTION", 450, 420, { size: 100, color: red }), S(450, 420, 520, { at: "creation" }), T("CREATION", 1150, 420, { size: 120, color: green, at: "creation" })],
  },
  {
    at: "Stone by stone",
    items: [I("bricks", 450, 420, 2.4), H("stone by stone", 1100, 340), H("fresh mortar seals the wounds", 1100, 480, { size: 54, at: "fresh mortar" })],
  },
  {
    at: "Up top",
    items: [I("hammer", 400, 420, 1.6), I("house", 900, 420, 2.2), H("timber + dark slate", 1300, 420, { size: 54, at: "solid timber" })],
  },
  {
    at: "For decades",
    items: [I("ruin", 450, 420, 2.2), A(680, 420, 920, 420, green, { at: "Suddenly" }), I("mansion", 1150, 420, 2.4, { at: "Suddenly" }), T("WHOLE", 1150, 700, { size: 100, color: green, at: "it is whole" })],
  },
  {
    at: "Inside, the grand staircase",
    items: [I("stairs", 450, 420, 2.4), T("DARK MAHOGANY", 1100, 380, { size: 90, color: "#6D4C41", at: "dark mahogany" }), H("rebuilt", 1100, 520)],
  },
  {
    at: "Fresh plaster",
    items: [I("roller", 450, 420, 2.2), H("a deep wound", 1100, 340, { at: "deep wound" }), T("HEALING", 1100, 480, { size: 110, color: green, at: "healing" })],
  },
  {
    at: "Even the air changes",
    items: [I("dust", 300, 420, 1.4), H("decay", 300, 620, { color: red }), A(450, 420, 650, 420), I("planks", 800, 420, 1.2, { at: "cut wood" }), I("roller", 1100, 420, 1.2, { at: "fresh paint" }), I("bulb", 1380, 420, 1.2, { at: "raw potential" })],
  },
  {
    at: "The house is waking up",
    items: [I("mansion", 450, 420, 2.4), I("sunrise", 450, 200, 1), T("WAKING UP", 1100, 420, { size: 120, color: orange })],
  },
];

// Phase 4: The Return of Light and Color.
const S05: Beat[] = [
  {
    at: "A structure becomes a home",
    items: [T("PHASE 4", 800, 200, { size: 70, color: blue }), T("LIGHT AND COLOR", 800, 360, { size: 110 }), U(800, 450, 760, red), I("sunrise", 800, 650, 1.5)],
  },
  {
    at: "For years, the windows",
    items: [I("brokenWindow", 450, 420, 2.4), H("black voids", 1100, 340, { size: 76 }), H("empty eyes", 1100, 480, { size: 76, at: "empty eyes" })],
  },
  {
    at: "Now pristine glass",
    items: [I("window", 400, 420, 2.4), I("sunrise", 900, 380, 1.6, { at: "morning sun" }), H("the whole mansion changes", 1200, 680, { size: 54, at: "whole mansion" })],
  },
  {
    at: "Sunbeams cut across",
    items: [I("planks", 450, 420, 2.4), H("parquet floors", 1100, 340, { at: "parquet" }), H("perfect geometry", 1100, 480, { color: blue, at: "geometric" })],
  },
  {
    at: "The colors of a forgotten era",
    items: [I("book", 450, 420, 2), T("DEEP EMERALD", 1100, 380, { size: 100, color: green, at: "Deep emerald" }), H("library walls", 1100, 520, { at: "library walls" })],
  },
  {
    at: "Chipped crown moldings",
    items: [I("crown", 450, 420, 1.8), H("brilliant white", 1100, 340, { at: "brilliant white" }), A(1100, 560, 1100, 440, blue, { at: "pulling your eye" }), H("towering ceilings", 1100, 640, { at: "towering ceilings" })],
  },
  {
    at: "Crystal chandeliers",
    items: [I("chandelier", 450, 400, 2.6), N(1000, 1100, 380, { size: 140, color: orange, at: "a thousand" }), H("tiny prisms", 1100, 540)],
  },
  {
    at: "This is the phase of obsession",
    items: [T("OBSESSION", 800, 220, { size: 120, color: red }), I("door", 400, 560, 1.6, { at: "Carved rosettes" }), H("rosettes", 400, 780), I("key", 800, 560, 1.4, { at: "brass hinges" }), H("brass hinges", 800, 780), I("crown", 1200, 560, 1.4, { at: "into art" }), H("art", 1200, 780)],
  },
];

// Pembayaran misteri: peta rahasia.
const S06: Beat[] = [
  {
    at: "Which brings us back",
    items: [I("lockbox", 450, 420, 2.2), T("BACK TO", 1100, 340, { size: 90 }), T("THE BOX", 1100, 480, { size: 120, color: orange })],
  },
  {
    at: "Beneath the letters lay",
    items: [I("blueprint", 450, 420, 2.4), H("hand-drawn schematic", 1100, 340, { at: "hand-drawn" }), H("first floor", 1100, 480)],
  },
  {
    at: "At first glance",
    items: [I("blueprint", 350, 420, 1.8), H("=", 800, 420, { size: 140 }), I("blueprint", 1250, 420, 1.8, { at: "modern survey" }), H("hall · conservatory · library", 800, 720, { size: 56, at: "The grand hall" })],
  },
  {
    at: "But held up to the light",
    items: [I("bulb", 300, 420, 1.4), I("secretMap", 800, 420, 2.4, { at: "dotted lines" }), H("dotted lines", 1300, 420, { color: red, at: "dotted lines" })],
  },
  {
    at: "The architect had built",
    items: [I("mansion", 450, 420, 2.4), T("A HIDDEN", 1100, 340, { size: 100 }), T("STRUCTURE", 1100, 480, { size: 110, color: red })],
  },
  {
    at: "The library paneling",
    items: [I("book", 450, 420, 2), H("weeks of cleaning", 450, 680, { size: 54, at: "spent weeks" }), T("HOLLOW", 1150, 420, { size: 160, color: red, at: "hollow" })],
  },
  {
    at: "Behind it",
    items: [I("door", 300, 420, 1.6), A(450, 420, 750, 420, red, { bend: 0 }), H("windowless corridor", 900, 300, { size: 54, at: "windowless corridor" }), A(1050, 420, 1250, 620, red, { at: "down to" }), I("stairs", 1350, 620, 1.2), H("sub-basement", 1350, 800, { size: 54, at: "sub-basement" })],
  },
  {
    at: "that exists on no city registry",
    items: [I("scroll", 450, 420, 2), X(450, 420, 160), T("A PHANTOM WING", 1100, 420, { size: 96, color: purple, at: "phantom wing" }), I("ghost", 1100, 640, 1, { at: "phantom wing" })],
  },
  {
    at: "Built, the letters hint",
    items: [I("box", 350, 400, 1.6), H("illicit goods", 350, 640, { at: "illicit goods" }), H("or", 800, 420, { size: 80 }), I("door", 1250, 400, 1.6, { at: "escape route" }), H("an escape route", 1250, 640, { at: "escape route" })],
  },
  {
    at: "Suddenly, the quirks",
    items: [I("bricks", 400, 380, 1.6), H("the thick western wall", 400, 620, { size: 54, at: "western wall" }), I("planks", 1200, 380, 1.6, { at: "The echo" }), H("the echo under the pantry", 1200, 620, { size: 54, at: "butler's pantry" })],
  },
  {
    at: "Every dinner party",
    items: [I("martini", 300, 400, 1.3), I("crowd", 650, 400, 1.3, { at: "every waltz" }), T("INCHES FROM", 1150, 340, { size: 90, at: "just inches" }), T("RUIN", 1150, 480, { size: 140, color: red, at: "whispered ruin" })],
  },
  {
    at: "The next day",
    items: [I("planks", 450, 420, 2.4), I("hammer", 450, 230, 1, { at: "nailed them" }), T("THE SECRET", 1100, 340, { size: 100 }), T("WAS OUT", 1100, 480, { size: 120, color: red, at: "secret was out" })],
  },
];

// Phase 5: Breathing Life into the Stillness.
const S07: Beat[] = [
  {
    at: "Outside, the wilderness",
    items: [T("PHASE 5", 800, 200, { size: 70, color: blue }), T("BREATHING LIFE", 800, 360, { size: 110 }), U(800, 450, 760, red), I("hedge", 800, 650, 1.5, { at: "manicured estate" })],
  },
  {
    at: "A gravel driveway",
    items: [I("mansion", 800, 330, 2.2), { k: "path", d: "M520 860 C620 700 760 640 780 500", color: "#A1887F", w: 2 }, I("hedge", 450, 620, 1.1, { at: "planted hedges" }), I("hedge", 1150, 620, 1.1)],
  },
  {
    at: "The fountains",
    items: [I("fountain", 450, 420, 2.6), H("dry for decades...", 1100, 340, { size: 70 }), T("BACK TO LIFE", 1100, 480, { size: 100, color: blue, at: "surge back" })],
  },
  {
    at: "As evening falls",
    items: [I("moon", 400, 400, 1.6), T("WARMTH", 1050, 420, { size: 160, color: orange, at: "warmth" })],
  },
  {
    at: "Golden light blooms",
    items: [I("mansion", 450, 420, 2.6), I("bulb", 1050, 360, 1.2), T("A BEACON", 1100, 600, { size: 110, color: orange, at: "a beacon" })],
  },
  {
    at: "Look back at where this started",
    items: [I("ruin", 380, 420, 2.2), A(620, 420, 940, 420, green), I("mansion", 1200, 420, 2.4), H("another lifetime", 800, 760, { at: "another lifetime" })],
  },
  {
    at: "No matter how deep the decay",
    items: [T("NOTHING IS", 800, 280, { size: 100 }), T("TRULY LOST", 800, 430, { size: 120, color: green }), H("if someone does the work", 800, 620, { at: "do the work" })],
  },
  {
    at: "Though in this house",
    items: [I("secretMap", 450, 420, 2.2), I("ghost", 1100, 380, 1.4), H("better left in the dark", 1100, 640, { size: 60, color: purple, at: "left in the dark" })],
  },
  {
    at: "If you want more stories",
    items: [T("MORE STORIES", 800, 260, { size: 110 }), I("bell", 800, 560, 1.6, { at: "subscribe" }), O(800, 560, 190, 190, red)],
  },
];

export const EP4_SCENES = { S00, S01, S02, S03, S04, S05, S06, S07 };
