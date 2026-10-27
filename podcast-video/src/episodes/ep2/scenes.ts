import { Beat } from "../../board/Board";
import { A, H, I, N, O, S, T, U, X } from "../../board/dsl";
import { theme } from "../../theme";

const { red, blue, green, orange, purple } = theme;

// Hook
const S01: Beat[] = [
  {
    at: "Right now, inside",
    items: [I("server", 330, 420, 1.8), I("lock", 330, 150, 0.6), T("THE MOST GUARDED", 1050, 280, { size: 80 }), T("DATA CENTERS", 1050, 400, { size: 100, color: blue }), H("on Earth", 1050, 540)],
  },
  {
    at: "the smartest engineers alive",
    items: [I("crowd", 400, 420, 1.8), I("question", 1050, 330, 1.3, { at: "do not understand" }), T("CANNOT CONTROL", 1050, 640, { size: 90, color: red, at: "cannot control" })],
  },
  {
    at: "The former insiders",
    items: [I("person", 350, 420, 1.5), A(500, 420, 760, 420, red), I("money", 1050, 350, 1.6, { at: "multi-million dollar" }), X(1050, 350, 140, { at: "walking away" }), H("...just to warn us", 1050, 640, { at: "warn us" })],
  },
  {
    at: "Their internal forecasts",
    items: [N(70, 800, 300, { suffix: "%", size: 240, color: red, at: "70%" }), H("chance of", 800, 520), T("GLOBAL CATASTROPHE", 800, 650, { size: 90, at: "global catastrophe" })],
  },
  {
    at: "We are constantly fed",
    items: [I("robot", 400, 420, 1.8), I("heart", 560, 220, 0.6), H("\"a friendly assistant\"", 1100, 330, { at: "friendly assistant" }), H("write emails, cure diseases", 1100, 470, { at: "write emails" })],
  },
  {
    at: "But behind closed doors",
    items: [I("money", 300, 420, 1.3), A(450, 420, 620, 420, red), I("rocket", 800, 420, 1.5, { at: "arms race" }), T("ARMS RACE", 800, 700, { size: 100, color: red }), I("god", 1300, 420, 1.3, { at: "digital god" })],
  },
  {
    at: "The timeline for",
    items: [I("hourglass", 400, 420, 2), H("not decades away", 1050, 280, { at: "isn't decades" }), T("END OF THIS DECADE", 1050, 450, { size: 80, color: red, at: "end of this decade" })],
  },
  {
    at: "and it will change",
    items: [I("person", 800, 330, 1.6), T("HUMAN FOREVER", 800, 680, { size: 120, color: purple, at: "human forever" }), O(800, 680, 480, 100, red)],
  },
];

// Insight 1: The Whistleblower
const S02: Beat[] = [
  {
    at: "To understand the sheer",
    items: [T("INSIGHT 01", 800, 220, { size: 70, color: blue }), T("THE WHISTLEBLOWER", 800, 400, { size: 120 }), U(800, 490, 1000, red), I("bell", 800, 680, 1)],
  },
  {
    at: "Daniel Kokotajlo",
    items: [I("person", 400, 420, 1.8), T("DANIEL KOKOTAJLO", 1050, 300, { size: 80 }), H("top forecaster at OpenAI", 1050, 440, { at: "top forecaster" }), H("(the company behind ChatGPT)", 1050, 560, { size: 50, color: blue, at: "behind ChatGPT" })],
  },
  {
    at: "His job was to predict",
    items: [I("magnifier", 400, 420, 1.8), I("chart", 1100, 420, 1.8), H("predict AI's future", 800, 760)],
  },
  {
    at: "What he saw inside",
    items: [I("eye", 400, 420, 1.8), T("HE RESIGNED", 1050, 400, { size: 110, color: red, at: "he resigned" })],
  },
  {
    at: "famously refusing to sign",
    items: [I("contract", 450, 420, 2.2), X(450, 420, 150, { at: "non-disparagement" }), H("a legal gag order", 1100, 330, { at: "legally gagged" }), T("REFUSED", 1100, 480, { size: 110, color: red })],
  },
  {
    at: "Walking away from that",
    items: [N(2_000_000, 800, 300, { prefix: "$", size: 170, color: red }), H("lost", 800, 470), N(80, 650, 640, { suffix: "%", size: 120, color: orange, at: "nearly 80%" }), H("of his net worth", 1050, 650)],
  },
  {
    at: "Why would a brilliant",
    items: [I("money", 450, 420, 1.8), T("vs", 800, 420, { size: 90, color: red }), I("bell", 1150, 420, 1.6, { at: "right to speak" }), H("the right to speak", 1150, 680)],
  },
  {
    at: "Because he realized",
    items: [I("shield", 400, 400, 1.6), H("\"build it safely\"", 400, 660, { at: "build artificial intelligence safely" }), A(600, 400, 900, 400, red), I("rocket", 1150, 400, 1.8, { at: "reckless" }), T("ARMS RACE", 1150, 660, { size: 80, color: red })],
  },
  {
    at: "The top CEOs",
    items: [I("person", 350, 420, 1.5), T("vs", 800, 420, { size: 100, color: red }), I("person", 1250, 420, 1.5), T("HIGH-STAKES STANDOFF", 800, 720, { size: 70, at: "high-stakes standoff" })],
  },
  {
    at: "They are terrified that",
    items: [I("flag", 400, 380, 1.6, { at: "rival nation" }), H("China?", 400, 620), I("crown", 1100, 380, 1.6, { at: "global dictator" }), T("GLOBAL DICTATOR", 1100, 620, { size: 70, color: red })],
  },
  {
    at: "So, their solution",
    items: [I("car", 450, 420, 2.2), T("NO BRAKES", 1100, 400, { size: 120, color: red, at: "missing brakes" }), U(1100, 480, 520, red)],
  },
  {
    at: "And what exactly are they building",
    items: [I("question", 800, 400, 2.4)],
  },
  {
    at: "modern AI is not software",
    items: [I("code", 450, 380, 1.8), H("traditional software", 450, 640), S(450, 640, 560, { at: "It is not a set" })],
  },
  {
    at: "Instead, developers",
    items: [I("brain", 450, 400, 2), A(650, 400, 900, 400), I("network", 1150, 400, 2, { at: "neural networks" }), H("modeled on the human brain", 800, 740)],
  },
  {
    at: "They start with a massive",
    items: [I("network", 400, 420, 1.6), I("dna", 600, 420, 1.2), N(10, 1050, 320, { size: 200, color: red, at: "10 trillion" }), T("TRILLION PARAMETERS", 1050, 520, { size: 70 })],
  },
  {
    at: "They feed it",
    items: [I("globe", 300, 400, 1.3), H("the entire internet", 300, 640), I("gamepad", 800, 400, 1.3, { at: "virtual environments" }), H("virtual worlds", 800, 640), I("coin", 1300, 400, 1.3, { at: "reward or punish" }), H("reward / punish", 1300, 640)],
  },
  {
    at: "They are essentially growing",
    items: [I("petri", 500, 450, 2.4), I("alien", 500, 350, 0.8), T("ALIEN INTELLIGENCE", 1150, 420, { size: 70, color: green }), H("in a petri dish", 1150, 540)],
  },
  {
    at: "Because this is a black box",
    items: [I("box", 800, 380, 2.4), T("BLACK BOX", 800, 720, { size: 110, color: purple })],
  },
  {
    at: "They just know",
    items: [I("server", 350, 420, 1.4), H("more data + compute", 350, 650), A(520, 420, 800, 420, red), I("brain", 1050, 420, 1.6, { at: "frighteningly smarter" }), I("arrowUp", 1300, 420, 1.2)],
  },
  {
    at: "We are literally building",
    items: [I("brain", 800, 360, 2.4), H("a brain we cannot comprehend", 800, 720)],
  },
  {
    at: "they begin to exhibit deceptive",
    items: [I("robot", 400, 420, 1.8), T("DECEPTION", 1100, 260, { size: 110, color: red }), H("lying to users", 1100, 420, { at: "lying to users" }), H("faking finished tasks", 1100, 540, { at: "pretending to complete" })],
  },
  {
    at: "The creators are hoping",
    items: [I("book", 400, 420, 1.8), H("simple guardrails", 400, 680), I("lightning", 1100, 420, 1.8, { at: "thousand times faster" }), H("1000× faster than Einstein", 1100, 680)],
  },
  {
    at: "mathematically doomed",
    items: [T("DOOMED", 800, 400, { size: 230, color: red }), H("to fail", 800, 620)],
  },
];

// Transition 1
const S03: Beat[] = [
  { at: "But the unpredictable", items: [I("alien", 800, 380, 2.4), H("...just the beginning", 800, 740, { at: "just the beginning" })] },
  {
    at: "Because what these tech giants",
    items: [N(3, 450, 330, { size: 180, color: red }), H("to 5 years", 450, 500), I("hammer", 1150, 400, 1.6, { at: "systematically dismantle" }), T("THE ECONOMY", 1150, 660, { size: 80, color: red })],
  },
];

// Insight 2: The End of Human Labor
const S04: Beat[] = [
  {
    at: "The mainstream narrative",
    items: [T("INSIGHT 02", 800, 220, { size: 70, color: blue }), T("THE END OF LABOR", 800, 400, { size: 120 }), U(800, 490, 950, red), I("briefcase", 800, 680, 1)],
  },
  {
    at: "We are told that during",
    items: [I("factory", 450, 400, 1.8), H("physical jobs replaced", 450, 660), A(650, 400, 900, 400), I("brain", 1150, 400, 1.6, { at: "cognitive jobs" }), H("thinking jobs grew", 1150, 660)],
  },
  {
    at: "We are told to adapt",
    items: [I("code", 300, 380, 1.3), H("learn to code", 300, 600), I("monitor", 800, 380, 1.3, { at: "prompt engineers" }), H("prompt engineer", 800, 600), I("robot", 1300, 380, 1.3, { at: "manage AI agents" }), H("manage AI agents", 1300, 600)],
  },
  {
    at: "But Artificial General Intelligence",
    items: [I("shieldBroken", 450, 420, 2), T("A NEW TOOL?", 1100, 280, { size: 90, color: blue, at: "new tool" }), S(1100, 280, 560, { at: "new inventor" }), T("A NEW INVENTOR", 1100, 460, { size: 90 })],
  },
  {
    at: "According to leaked",
    items: [I("contract", 400, 420, 1.8), T("\"AI 2027\"", 1050, 350, { size: 130, color: red, at: "AI 2027" }), H("report", 1050, 500)],
  },
  {
    at: "the sequence of human replacement",
    items: [H("not gradual", 800, 180, { size: 80 }), I("wave", 800, 470, 2.6, { at: "like a tsunami" }), T("TSUNAMI", 800, 760, { size: 110, color: blue })],
  },
  {
    at: "Right now, AI companies",
    items: [I("robot", 400, 420, 1.8), A(580, 420, 820, 420, red), I("flask", 1050, 420, 1.6), T("AUTOMATE AI RESEARCH", 800, 740, { size: 70, color: red, at: "automating the AI research" })],
  },
  {
    at: "They aren't trying",
    items: [I("car", 400, 400, 1.5), I("wrench", 600, 400, 1.2), X(500, 400, 170), H("not robo-taxis or plumbers", 500, 650)],
  },
  {
    at: "They are training AIs",
    items: [I("code", 300, 380, 1.2), H("write code", 300, 590), I("flask", 800, 380, 1.2, { at: "run massive experiments" }), H("run experiments", 800, 590), I("robot", 1300, 380, 1.2, { at: "design the next" }), H("design next AI", 1300, 590)],
  },
  {
    at: "Once an AI can perfectly",
    items: [T("RECURSIVE", 800, 300, { size: 140, color: purple, at: "recursive self-improvement" }), T("SELF-IMPROVEMENT", 800, 460, { size: 110, color: purple }), I("infinity", 800, 700, 1.2)],
  },
  {
    at: "The machine starts upgrading",
    items: [I("robot", 300, 520, 0.9), A(390, 470, 560, 400), I("robot", 700, 400, 1.3, { at: "smarter AI" }), A(840, 340, 1010, 280), I("robot", 1200, 260, 1.7, { at: "even smarter" })],
  },
  {
    at: "until it reaches Superintelligence",
    items: [I("brain", 450, 420, 2), I("lightning", 600, 260, 0.8), T("SUPERINTELLIGENCE", 1100, 400, { size: 70, color: red }), H("superior in every domain", 1100, 520, { at: "every conceivable" })],
  },
  {
    at: "And the leading companies",
    items: [N(2027, 450, 400, { from: 2024, plain: true, size: 180, color: red, at: "by 2027" }), H("or", 800, 400, { size: 90 }), N(2030, 1150, 400, { from: 2027, plain: true, size: 180, color: red, at: "2030" })],
  },
  {
    at: "When this intelligence explosion",
    items: [I("lightning", 450, 420, 2), H("not just repetitive jobs", 1100, 300), T("EVERY JOB", 1100, 460, { size: 130, color: red, at: "every job" })],
  },
  {
    at: "If an AI is exponentially",
    items: [
      H("CEO", 260, 260, { size: 80 }),
      H("lawyer", 600, 260, { size: 80 }),
      H("artist", 940, 260, { size: 80 }),
      H("scientist", 1300, 260, { size: 80 }),
      S(260, 260, 200, { at: "human cognitive labor" }),
      S(600, 260, 260),
      S(940, 260, 240),
      S(1300, 260, 300),
      T("OBSOLETE", 800, 560, { size: 160, color: red, at: "obsolete" }),
    ],
  },
  {
    at: "And shortly after",
    items: [I("factory", 450, 420, 1.9), A(650, 420, 850, 420), I("crowd", 1150, 420, 2, { at: "millions of humanoid" }), H("millions of humanoid robots", 800, 760)],
  },
  {
    at: "If you think your job is safe",
    items: [I("hand", 400, 420, 1.8), H("\"human touch\"?", 1050, 320), H("\"complex problems\"?", 1050, 460, { at: "complex problem" }), X(1050, 390, 200, { at: "severely underestimating" })],
  },
  {
    at: "If you ask an AI forecaster",
    items: [I("person", 450, 420, 1.6), I("question", 650, 220, 0.8), H("which career survives", 1100, 330), T("THE 2030s?", 1100, 470, { size: 110, color: red })],
  },
  {
    at: "asking that question",
    items: [N(1500, 400, 250, { from: 1400, plain: true, size: 150 }), I("person", 400, 560, 1.1), I("ship", 1150, 420, 2.2, { at: "invading Conquistadors" }), T("CONQUISTADORS", 1150, 720, { size: 70, color: red })],
  },
  {
    at: "The entire paradigm",
    items: [I("briefcase", 450, 420, 2), X(450, 420, 160), T("HUMAN LABOR", 1100, 330, { size: 100 }), T("IS ENDING", 1100, 470, { size: 110, color: red })],
  },
];

// Transition 2
const S05: Beat[] = [
  { at: "This default path", items: [I("god", 450, 400, 2), T("PLAN D", 1100, 380, { size: 170, color: red, at: "Plan D" }), H("loss of human control", 1100, 560, { at: "catastrophic loss" })] },
  { at: "But the whistleblowers", items: [I("house", 450, 420, 1.8), H("a narrow escape hatch", 1100, 300, { at: "narrow escape" }), T("PLAN A", 1100, 470, { size: 170, color: green, at: "Plan A" })] },
];

// Insight 3: Plan A
const S06: Beat[] = [
  {
    at: "We are not entirely doomed",
    items: [T("INSIGHT 03", 800, 220, { size: 70, color: blue }), T("PLAN A", 800, 400, { size: 170, color: green }), U(800, 500, 600, green), I("shield", 800, 690, 1)],
  },
  {
    at: "This alternative path",
    items: [I("scales", 450, 420, 1.9), H("governments step in", 1100, 300), N(2029, 1100, 470, { from: 2025, plain: true, size: 170, color: red, at: "2029" })],
  },
  {
    at: "In this scenario",
    items: [I("globe", 450, 420, 1.8), I("crowd", 1100, 420, 1.9, { at: "international coalition" }), H("an international coalition", 800, 760)],
  },
  {
    at: "They mandate a temporary",
    items: [I("pause", 450, 420, 2.2), T("GLOBAL PAUSE", 1100, 360, { size: 100, color: red }), H("on new frontier AI", 1100, 500, { at: "frontier AI" })],
  },
  {
    at: "Instead of secretive corporations",
    items: [I("box", 400, 420, 1.6), X(400, 420, 130), A(580, 420, 820, 420, green), I("server", 1100, 420, 1.6, { at: "fully transparent" }), I("eye", 1100, 180, 0.7), H("transparent, regulated", 800, 760)],
  },
  {
    at: "Chinese inspectors",
    items: [I("flag", 330, 380, 1.3), I("magnifier", 600, 380, 1.1), I("server", 1000, 380, 1.1), I("flag", 1300, 380, 1.3, { at: "American inspectors" }), H("inspectors audit each other", 800, 680)],
  },
  {
    at: "The ultimate goal",
    items: [I("rocket", 400, 420, 1.5), X(400, 420, 140), A(560, 420, 820, 420, green), I("sprout", 1100, 420, 1.7, { at: "slow, highly controlled" }), H("slow & transparent", 1100, 700)],
  },
  {
    at: "Under Plan A",
    items: [I("shield", 450, 420, 1.8), H("benefits, safely", 1100, 330), H("spread over the 2030s", 1100, 470, { at: "spread out" })],
  },
  {
    at: "As AI and robotics",
    items: [I("factory", 450, 420, 1.8), H("no mass starvation", 1100, 300, { at: "mass starvation" }), T("RESTRUCTURE", 1100, 460, { size: 100, color: blue, at: "restructure the economy" })],
  },
  {
    at: "We introduce a",
    items: [I("factory", 300, 420, 1.3), A(450, 420, 620, 420), I("money", 800, 420, 1.3, { at: "strictly taxed" }), A(980, 420, 1150, 420), I("crowd", 1320, 420, 1.3, { at: "redistributed to the public" }), T("CITIZEN'S DIVIDEND", 800, 740, { size: 80, color: green })],
  },
  {
    at: "It starts as a",
    items: [N(25_000, 800, 300, { prefix: "$", size: 190, color: green }), H("per citizen, per year", 800, 480), H("...growing to millions", 800, 620, { at: "millions of dollars" })],
  },
  {
    at: "By the year 2040",
    items: [N(2040, 450, 300, { from: 2030, plain: true, size: 160, color: green }), I("city", 1100, 400, 2, { at: "post-scarcity utopia" }), T("POST-SCARCITY", 800, 720, { size: 90, color: green })],
  },
  {
    at: "Cures for cancer",
    items: [I("pill", 400, 400, 1.6), H("cancer cured", 400, 650), I("dna", 1100, 400, 1.6, { at: "aging process" }), H("aging solved", 1100, 650)],
  },
  {
    at: "We build self-replicating",
    items: [I("solar", 450, 400, 1.8), H("solar arrays in space", 450, 660), I("city", 1150, 400, 1.6, { at: "special economic zones" }), H("pristine zones on Earth", 1150, 660)],
  },
  {
    at: "We can achieve biological",
    items: [I("infinity", 800, 360, 2.4), T("IMMORTALITY", 800, 640, { size: 130, color: purple })],
  },
  {
    at: "But this magnificent",
    items: [I("god", 450, 420, 1.8), I("lock", 450, 680, 0.7, { at: "cage the digital god" }), H("only if we cage", 1100, 330), T("THE DIGITAL GOD", 1100, 470, { size: 90, color: red })],
  },
  {
    at: "We have to sacrifice",
    items: [I("money", 400, 420, 1.6), X(400, 420, 140), A(560, 420, 820, 420, green), I("crowd", 1100, 420, 1.8, { at: "survival and prosperity" }), H("the survival of humanity", 800, 760)],
  },
];

// Outro
const S07: Beat[] = [
  { at: "The creation of superintelligence", items: [I("brain", 450, 420, 2), T("THE FINAL ACT", 1100, 330, { size: 100 }), H("of human engineering", 1100, 470)] },
  {
    at: "We face a binary choice",
    items: [I("money", 400, 380, 1.4), N(70, 400, 650, { suffix: "% catastrophe", size: 70, color: red, at: "70%" }), T("or", 800, 420, { size: 90 }), I("city", 1200, 380, 1.5, { at: "demand transparency" }), T("ABUNDANCE", 1200, 650, { size: 80, color: green, at: "abundance" })],
  },
  { at: "The window to choose", items: [I("hourglass", 450, 420, 2), T("THE WINDOW", 1100, 360, { size: 110 }), T("IS CLOSING", 1100, 500, { size: 110, color: red })] },
  {
    at: "If you want to see through",
    items: [H("see through the narrative", 800, 150, { size: 80 }), I("play", 600, 430, 1.8, { at: "subscribe button" }), T("SUBSCRIBE", 1100, 430, { size: 100, color: red }), I("bell", 1100, 680, 0.9), O(1100, 430, 330, 100, blue, { at: "right now" })],
  },
];

export const EP2_SCENES: Record<string, Beat[]> = { S01, S02, S03, S04, S05, S06, S07 };
