import { Beat } from "../../board/Board";
import { A, H, I, N, O, S, T, U, X } from "../../board/dsl";
import { theme } from "../../theme";

const { red, blue, green, purple } = theme;

// Hook
const S01: Beat[] = [
  {
    at: "Right now, you might",
    items: [I("person", 400, 420, 1.8), I("heart", 400, 150, 0.6), H("\"I'm a good person\"", 1050, 300, { size: 80 }), H("honest, not manipulative", 1050, 450, { at: "honest" })],
  },
  {
    at: "But legendary author Robert Greene",
    items: [I("book", 400, 420, 1.9), T("ROBERT GREENE", 1050, 330, { size: 100 }), H("expert on power", 1050, 470, { at: "experts on power" })],
  },
  {
    at: "you are lying to yourself",
    items: [I("mirror", 450, 420, 2), T("YOU ARE LYING", 1100, 340, { size: 90, color: red }), T("TO YOURSELF", 1100, 470, { size: 90, color: red })],
  },
  {
    at: "Behind the friendly smiles",
    items: [I("phone", 350, 420, 1.5), H("smiles, etiquette, perfect posts", 350, 680, { size: 50 }), A(520, 420, 780, 420, red), T("A DARK SIDE", 1100, 420, { size: 100, color: purple, at: "dark side" })],
  },
  {
    at: "We all wear masks",
    items: [I("mask", 800, 330, 2.6), H("narcissism · envy · aggression", 800, 680, { at: "hidden narcissism" })],
  },
  {
    at: "The bad news",
    items: [I("person", 400, 420, 1.5), H("pretend to be an angel...", 400, 700, { size: 54 }), A(560, 420, 820, 420, red), T("EXPLOITED", 1100, 420, { size: 110, color: red, at: "exploited" })],
  },
  {
    at: "But what happens if",
    items: [I("chess", 450, 420, 2), H("accept human nature", 1100, 300, { at: "accept the raw" }), T("CONTROL YOUR DESTINY", 1100, 460, { size: 66, color: green, at: "absolute control" })],
  },
];

// Insight 1: The Dark Side of Power
const S02: Beat[] = [
  {
    at: "We frequently misunderstand",
    items: [T("INSIGHT 01", 800, 220, { size: 70, color: blue }), T("THE DARK SIDE", 800, 400, { size: 130 }), U(800, 490, 850, red), I("mask", 800, 680, 1)],
  },
  {
    at: "We imagine tyrants",
    items: [I("crown", 300, 380, 1.3), H("tyrants", 300, 600), I("flag", 800, 380, 1.3, { at: "presidents" }), H("presidents", 800, 600), I("money", 1300, 380, 1.3, { at: "billionaires" }), H("billionaires", 1300, 600)],
  },
  {
    at: "However, the most absolute",
    items: [I("heart", 450, 420, 1.8), H("real power =", 1100, 300), T("CONTROL OF YOURSELF", 1100, 460, { size: 66, color: green, at: "control over yourself" })],
  },
  {
    at: "Total powerlessness",
    items: [I("person", 400, 430, 1.6), I("question", 560, 220, 0.6), T("POWERLESSNESS", 1100, 330, { size: 80, color: red }), H("corrupts more than power", 1100, 470, { at: "far more corrupting" })],
  },
  {
    at: "Powerlessness turns people",
    items: [I("skull", 400, 420, 1.6), H("passive-aggressive", 1100, 260, { at: "passive-aggressive" }), H("bitter", 1100, 380, { at: "bitter" }), T("TOXIC GAMES", 1100, 520, { size: 90, color: red, at: "toxic" })],
  },
  {
    at: "To attain true power",
    items: [I("mirror", 800, 360, 2.4), H("start with an honest look", 800, 720)],
  },
  {
    at: "Reflexively, when we hear",
    items: [T("\"NARCISSIST\"", 800, 220, { size: 100 }), I("hand", 450, 520, 1.4, { at: "point at others" }), A(560, 520, 820, 520, red), I("person", 1050, 520, 1.3)],
  },
  {
    at: "We say, \"Oh, my boss",
    items: [H("my boss", 330, 260, { size: 70 }), H("my ex", 800, 260, { size: 70, at: "my ex" }), H("but not me", 1270, 260, { size: 70, color: blue, at: "but not me" }), T("DEAD WRONG", 800, 560, { size: 160, color: red, at: "Dead wrong" })],
  },
  {
    at: "Every human being",
    items: [I("crowd", 450, 420, 2), H("self-centered by design", 1100, 330), H("needs first", 1100, 460, { at: "our own needs first" })],
  },
  {
    at: "If you walk through life",
    items: [I("crown", 450, 420, 1.6), H("moral superiority", 450, 660), X(450, 420, 140, { at: "never possess" }), T("NO SELF-AWARENESS", 1100, 420, { size: 70, color: red })],
  },
  {
    at: "This dark side isn't",
    items: [I("lightning", 450, 420, 2), H("don't repress it", 1100, 300), T("CHANNEL IT", 1100, 460, { size: 120, color: green, at: "strategically channeled" })],
  },
  {
    at: "Look at the figures",
    items: [H("Gandhi", 450, 300, { size: 90, at: "Mahatma Gandhi" }), H("Martin Luther King Jr.", 1100, 300, { size: 80, at: "Martin Luther King" }), H("naive? only good intentions?", 800, 560, { at: "Were they naive" })],
  },
  {
    at: "Absolutely not",
    items: [I("chess", 450, 420, 2), T("STRATEGISTS", 1100, 400, { size: 110, color: purple, at: "military strategists" })],
  },
  {
    at: "Martin Luther King consciously",
    items: [I("crowd", 350, 420, 1.6), H("planned protests", 350, 680), I("dog", 800, 420, 1.3, { at: "police dogs" }), A(950, 420, 1080, 420), I("tv", 1280, 420, 1.5, { at: "American televisions" })],
  },
  {
    at: "He knew it would break",
    items: [I("heart", 450, 400, 1.8), S(450, 400, 260), A(650, 420, 900, 420, green), I("scales", 1150, 400, 1.7, { at: "policy change" }), H("policy change", 1150, 680)],
  },
  {
    at: "That was cold, calculated",
    items: [I("tv", 450, 420, 1.8), T("TACTICAL", 1100, 330, { size: 110, color: red }), H("for a noble cause", 1100, 480, { at: "noble cause" })],
  },
  {
    at: "If our greatest heroes",
    items: [I("mask", 450, 420, 2), H("\"just be yourself\"?", 1100, 400, { at: "being yourself" }), X(1100, 400, 200, { wait: 10 })],
  },
  {
    at: "In the cutthroat professional",
    items: [I("briefcase", 450, 420, 1.8), H("innocence & transparency", 1100, 300), T("FATAL WEAKNESS", 1100, 460, { size: 90, color: red, at: "fatal weakness" })],
  },
  {
    at: "You must learn to separate",
    items: [I("heart", 300, 400, 1.3), T("≠", 560, 400, { size: 130 }), I("chess", 800, 400, 1.3), H("hire your old enemy", 1200, 330, { at: "hiring your old enemy" }), H("over a close friend", 1200, 460, { color: blue })],
  },
];

// Insight 2: Seduction
const S03: Beat[] = [
  {
    at: "But mastering yourself",
    items: [I("chess", 400, 420, 1.8), H("just the first move", 1100, 400, { at: "first move" })],
  },
  {
    at: "Seduction is the highest",
    items: [T("INSIGHT 02", 800, 220, { size: 70, color: blue }), T("SEDUCTION", 800, 400, { size: 150, color: purple }), U(800, 500, 750, red), I("heart", 800, 680, 1)],
  },
  {
    at: "Because when you seduce",
    items: [I("shield", 400, 420, 1.6), X(400, 420, 130, { at: "surrender their resistance" }), I("bulb", 1100, 400, 1.6, { at: "their own idea" }), H("\"it was my idea\"", 1100, 660)],
  },
  {
    at: "In the modern era",
    items: [I("phone", 450, 420, 2), H("swipe right...", 1100, 300, { at: "swiped right" }), T("A LOST ART", 1100, 460, { size: 100, color: red, at: "lost this ancient art" })],
  },
  {
    at: "The result is a generation",
    items: [I("person", 300, 430, 1.1), I("person", 650, 430, 1.1), I("person", 1000, 430, 1.1), H("isolated · awkward", 650, 720), T("BODY LANGUAGE", 1300, 300, { size: 54, color: purple, at: "body language" })],
  },
  {
    at: "Words are incredibly cheap",
    items: [I("thought", 450, 420, 1.8), H("words are cheap", 1100, 300), T("EASY TO FAKE", 1100, 460, { size: 90, color: red, at: "deceive" })],
  },
  {
    at: "Someone can vocally praise",
    items: [H("fake smile", 300, 260, { size: 64, at: "fake smile" }), H("dead eyes", 800, 260, { size: 64, at: "dead eyes" }), H("rising voice", 1300, 260, { size: 64, at: "rising tone" }), I("shoe", 800, 520, 1.4, { at: "feet pointing" }), A(950, 520, 1200, 520, red), H("exit", 1300, 520, { size: 70, color: red })],
  },
  {
    at: "Humans evolved over",
    items: [N(100_000, 800, 300, { size: 160, color: blue, suffix: "s of years" }), H("reading a silent language", 800, 500)],
  },
  {
    at: "Brilliant psychologist Milton Erickson",
    items: [I("wheelchair", 400, 420, 1.8), T("MILTON ERICKSON", 1050, 300, { size: 80 }), H("paralyzed by polio at 19", 1050, 440, { at: "polio" }), I("eye", 1050, 620, 0.9, { at: "only move his eyeballs" })],
  },
  {
    at: "became the greatest mind reader",
    items: [I("magnifier", 450, 420, 1.8), H("every micro muscle twitch", 1100, 330, { at: "microscopic muscle" }), T("THE BODY NEVER LIES", 1100, 480, { size: 66, color: red, at: "The body can never lie" })],
  },
  {
    at: "So, what separates",
    items: [I("question", 800, 400, 2.2), H("direction of focus", 800, 740, { at: "direction of focus" })],
  },
  {
    at: "A terrible seducer",
    items: [I("person", 400, 460, 1.5), I("thought", 400, 180, 1), T("ANTI-SEDUCER", 1100, 330, { size: 90, color: red }), H("trapped inside their head", 1100, 470, { at: "internal monologue" })],
  },
  {
    at: "On a date",
    items: [H("\"Do I look good?\"", 800, 220, { size: 70, at: "Do I look good" }), H("\"Did I say something stupid?\"", 800, 380, { size: 70, at: "Did I say" }), H("\"How are they judging me?\"", 800, 540, { size: 70, at: "How are they judging" })],
  },
  {
    at: "The stench of this insecurity",
    items: [I("person", 450, 420, 1.6), I("warning", 650, 220, 0.7), A(620, 460, 900, 460, red), I("person", 1150, 420, 1.6), H("uncomfortable", 1150, 700)],
  },
  {
    at: "Conversely, a Master Seducer",
    items: [T("MASTER SEDUCER", 800, 220, { size: 100, color: purple }), I("thought", 450, 520, 1.3), X(450, 520, 110, { at: "turns off the voice" }), T("OUTER-DIRECTED", 1100, 520, { size: 70, color: green, at: "outer-directed" })],
  },
  {
    at: "They absorb their counterpart",
    items: [I("sponge", 400, 420, 1.8), H("what's missing", 1100, 250, { at: "what is missing" }), H("childhood wounds", 1100, 370, { at: "childhood wounds" }), H("the validation you crave", 1100, 490, { at: "validation" })],
  },
  {
    at: "Legendary actor Errol Flynn",
    items: [I("person", 400, 420, 1.7), T("ERROL FLYNN", 1050, 300, { size: 100 }), H("relaxed · confident · open", 1050, 450, { at: "relaxed" })],
  },
  {
    at: "made people feel",
    items: [I("martini", 600, 420, 1.6), I("martini", 1000, 420, 1.6), H("like two martinis", 800, 720)],
  },
  {
    at: "The greatest paradox",
    items: [T("VULNERABILITY", 800, 300, { size: 130, color: purple, at: "vulnerability" }), H("beats acting tough", 800, 480, { at: "acting tough" }), I("shield", 800, 680, 0.8)],
  },
  {
    at: "Insecurity pushes people",
    items: [I("person", 300, 420, 1.2), A(420, 420, 200, 420, red, { bend: 0 }), H("insecurity pushes away", 300, 680, { size: 54 }), I("heart", 1100, 420, 1.6, { at: "authentic vulnerability" }), H("vulnerability pulls in", 1100, 680, { size: 54, color: green })],
  },
  {
    at: "It is a gravity",
    items: [I("planet", 800, 380, 2.2), T("IRRESISTIBLE", 800, 720, { size: 110, color: purple })],
  },
];

// Insight 3: True Mastery
const S04: Beat[] = [
  {
    at: "Yet, all the charm",
    items: [I("mask", 450, 420, 1.8), H("charm without substance", 1100, 330), T("= EMPTY", 1100, 470, { size: 110, color: red, at: "emptiness" })],
  },
  {
    at: "You cannot fake confidence",
    items: [I("mirror", 450, 420, 1.9), H("\"I am confident!\"", 1100, 330, { at: "positive affirmations" }), X(1100, 330, 230, { wait: 10 })],
  },
  {
    at: "Real confidence",
    items: [T("INSIGHT 03", 800, 220, { size: 70, color: blue }), T("TRUE MASTERY", 800, 400, { size: 140 }), U(800, 500, 850, red, { at: "True Mastery" }), I("crown", 800, 680, 1)],
  },
  {
    at: "The human brain evolved",
    items: [I("brain", 450, 420, 1.8), H("we learn by doing", 1100, 330, { at: "physical action" }), H("not just thinking", 1100, 460, { color: blue })],
  },
  {
    at: "When you spend thousands",
    items: [I("clock", 400, 420, 1.6), A(560, 420, 800, 420), I("network", 1100, 420, 1.8, { at: "thickens your neural" }), H("thicker neural pathways", 800, 740)],
  },
  {
    at: "Stevie Wonder",
    items: [I("piano", 450, 420, 2.2), T("STEVIE WONDER", 1100, 300, { size: 90 }), H("not magic", 1100, 440, { at: "mystical magic" })],
  },
  {
    at: "it is the result of tens of thousands",
    items: [N(10_000, 450, 330, { suffix: "s", size: 160, color: blue }), H("of hours", 450, 500), I("hand", 1050, 400, 1.4, { at: "touching the keys" }), N(11, 1300, 330, { size: 120, color: red, at: "11 years old" }), H("years old", 1300, 470)],
  },
  {
    at: "The connection between",
    items: [I("brain", 400, 420, 1.6), A(560, 420, 820, 420, purple, { bend: 0 }), I("hand", 1050, 420, 1.6), H("the oldest engine of intelligence", 800, 740)],
  },
  {
    at: "To reach this level",
    items: [H("\"fun\"", 450, 330, { size: 110, at: "fun" }), H("\"passion\"", 1050, 330, { size: 110, at: "passion" }), T("THE MODERN LIE", 800, 580, { size: 110, color: red })],
  },
  {
    at: "Mastering anything demands",
    items: [I("hourglass", 400, 420, 1.6), H("boredom", 1100, 250, { at: "boredom" }), H("frustration", 1100, 370, { at: "frustration" }), H("repetition", 1100, 490, { at: "repetitive practice" })],
  },
  {
    at: "If you are in your 20s",
    items: [I("coin", 400, 400, 1.2), H("lower salary", 400, 600), T("+", 700, 420, { size: 120 }), I("person", 1000, 420, 1.2, { at: "frontline responsibility" }), I("crown", 1250, 260, 0.6, { at: "from a master" }), H("learn from a master", 1100, 680)],
  },
  {
    at: "Never choose a massive",
    items: [I("money", 400, 420, 1.6), I("gear", 900, 420, 1.2, { at: "little cog" }), X(650, 420, 300, { at: "office politics" }), H("an invisible cog", 800, 720)],
  },
  {
    at: "You must find your",
    items: [T("LIFE'S TASK", 800, 280, { size: 150, color: green }), I("sprout", 800, 600, 1.4), H("connected to you since childhood", 800, 790, { at: "since childhood" })],
  },
  {
    at: "And at the absolute peak",
    items: [I("crown", 800, 380, 2), H("one final, humbling reality", 800, 720)],
  },
  {
    at: "In 2018, Robert Greene",
    items: [N(2018, 450, 300, { from: 2000, plain: true, size: 160, color: red }), I("brain", 450, 580, 1, { at: "severe stroke" }), I("lightning", 600, 580, 0.6), T("A SEVERE STROKE", 1100, 400, { size: 80, color: red }), H("left side paralyzed", 1100, 540, { at: "paralyzing the left" })],
  },
  {
    at: "Overnight, his ability",
    items: [H("hike", 300, 300, { size: 80 }), H("swim", 800, 300, { size: 80, at: "swim" }), H("cut his food", 1300, 300, { size: 80, at: "cut his own food" }), S(300, 300, 180, { at: "forcefully stripped" }), S(800, 300, 200), S(1300, 300, 400), I("wheelchair", 800, 600, 1.2)],
  },
  {
    at: "In the depths",
    items: [I("heart", 450, 420, 1.8), H("acceptance", 1100, 330, { at: "unconditional acceptance" }), T("RADICAL GRATITUDE", 1100, 470, { size: 70, color: green, at: "radical gratitude" })],
  },
  {
    at: "Greene realized",
    items: [I("person", 400, 420, 1.5), H("half-asleep", 400, 680), I("shoe", 1100, 420, 1.5, { at: "tying our shoelaces" }), H("a miracle we ignore", 1100, 680)],
  },
  {
    at: "Confronting his own",
    items: [I("eye", 450, 420, 1.8), H("look reality in the eye", 1100, 330, { at: "stare directly" }), T("FIND BEAUTY", 1100, 470, { size: 100, color: purple, at: "profound beauty" })],
  },
];

// Outro
const S05: Beat[] = [
  {
    at: "Ultimately, human life",
    items: [I("chess", 800, 300, 1.8), T("A GAME OF CHESS", 800, 620, { size: 110 }), U(800, 700, 800, red)],
  },
  {
    at: "a journey where we must",
    items: [I("mask", 300, 380, 1.2), H("own your dark side", 300, 600), I("heart", 800, 380, 1.2, { at: "seduce the world" }), H("seduce with empathy", 800, 600), I("crown", 1300, 380, 1.2, { at: "true mastery" }), H("walk toward mastery", 1300, 600)],
  },
  {
    at: "all while remembering",
    items: [I("hourglass", 450, 420, 1.8), H("control can vanish", 1100, 330), T("ANY SECOND", 1100, 470, { size: 110, color: red, at: "any second" })],
  },
  {
    at: "If you no longer want",
    items: [H("win the game of life", 800, 150, { size: 80, at: "win the game" }), I("play", 600, 430, 1.8, { at: "subscribe button" }), T("SUBSCRIBE", 1100, 430, { size: 100, color: red }), I("bell", 1100, 680, 0.9), O(1100, 430, 330, 100, blue, { at: "right now" })],
  },
];

export const EP3_SCENES: Record<string, Beat[]> = { S01, S02, S03, S04, S05 };

