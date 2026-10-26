import { theme } from "../theme";

// Doodle bergaya spidol dalam kotak 100×100 (pusat 50,50). Setiap stroke
// digambar berurutan; `fill` diwarnai setelah garisnya selesai.
export type Stroke = { d: string; fill?: string; color?: string; w?: number };

const C = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`;
const R = (x: number, y: number, w: number, h: number) => `M${x} ${y} L${x + w} ${y} L${x + w} ${y + h} L${x} ${y + h} Z`;
const L = (...p: number[]) => `M${p[0]} ${p[1]}` + p.slice(2).reduce((s, v, i) => s + (i % 2 ? ` ${v}` : ` L${v}`), "");
const E = (cx: number, cy: number, rx: number, ry: number, deg = 0) => {
  const a = (deg * Math.PI) / 180;
  const pts: string[] = [];
  for (let i = 0; i <= 48; i++) {
    const t = (i / 48) * Math.PI * 2;
    const x = Math.cos(t) * rx;
    const y = Math.sin(t) * ry;
    pts.push(`${i ? "L" : "M"}${(cx + x * Math.cos(a) - y * Math.sin(a)).toFixed(1)} ${(cy + x * Math.sin(a) + y * Math.cos(a)).toFixed(1)}`);
  }
  return pts.join(" ");
};
const rays = (cx: number, cy: number, r1: number, r2: number, n: number, off = 0) =>
  Array.from({ length: n }, (_, i) => {
    const a = off + (i / n) * Math.PI * 2;
    return L(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
  }).join(" ");
const gear = (cx: number, cy: number, r1: number, r2: number, n: number) => {
  const pts: string[] = [];
  for (let i = 0; i < n * 4; i++) {
    const a = (i / (n * 4)) * Math.PI * 2;
    const r = i % 4 < 2 ? r2 : r1;
    pts.push(`${i ? "L" : "M"}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  return pts.join(" ") + " Z";
};
const stick = (x: number, y: number, s: number, color: string = theme.ink): Stroke[] => [
  { d: C(x, y - 28 * s, 9 * s), fill: theme.skin, color },
  { d: L(x, y - 19 * s, x, y + 8 * s), color },
  { d: L(x - 15 * s, y - 2 * s, x, y - 10 * s, x + 15 * s, y - 2 * s), color },
  { d: L(x - 11 * s, y + 30 * s, x, y + 8 * s, x + 11 * s, y + 30 * s), color },
];

const { ink, red, blue, green, orange, yellow, purple, pink, teal, gray, skin } = theme;

export const ICONS: Record<string, Stroke[]> = {
  robot: [
    { d: R(28, 16, 44, 34), fill: "#B0BEC5" },
    { d: C(40, 32, 5), fill: teal },
    { d: C(60, 32, 5), fill: teal },
    { d: L(40, 43, 60, 43) },
    { d: L(50, 16, 50, 7) },
    { d: C(50, 5, 3), fill: red },
    { d: R(24, 54, 52, 34), fill: blue },
    { d: C(50, 70, 7), fill: yellow },
    { d: L(24, 60, 10, 78) },
    { d: L(76, 60, 90, 78) },
  ],
  brain: [
    { d: "M50 20 C35 8 14 18 18 38 C6 45 9 66 25 68 C28 84 46 86 50 75 C54 86 72 84 75 68 C91 66 94 45 82 38 C86 18 65 8 50 20 Z", fill: pink },
    { d: L(50, 21, 50, 74) },
    { d: "M30 34 C38 29 41 41 32 47" },
    { d: "M70 34 C62 29 59 41 68 47" },
    { d: "M28 58 C37 53 42 62 35 67" },
    { d: "M72 58 C63 53 58 62 65 67" },
  ],
  globe: [
    { d: C(50, 50, 36), fill: "#90CAF9" },
    { d: "M28 30 C40 22 48 34 40 42 C34 49 24 44 28 30 Z", fill: green },
    { d: "M54 56 C68 50 77 62 67 73 C58 78 50 66 54 56 Z", fill: green },
    { d: "M60 20 C68 22 72 30 66 34 C60 34 56 26 60 20 Z", fill: green },
  ],
  person: stick(50, 50, 1.3),
  crowd: [...stick(25, 55, 0.9, blue), ...stick(50, 45, 1.1, red), ...stick(75, 55, 0.9, green)],
  coin: [
    { d: C(50, 50, 32), fill: yellow },
    { d: C(50, 50, 25) },
    { d: "M59 38 C55 32 41 32 41 41 C41 50 59 49 59 59 C59 68 44 69 40 62" },
    { d: L(50, 28, 50, 72) },
  ],
  money: [
    { d: R(14, 30, 72, 40), fill: "#A5D6A7" },
    { d: R(20, 36, 60, 28) },
    { d: C(50, 50, 9), fill: green },
  ],
  clock: [
    { d: C(50, 50, 36), fill: "#FFFFFF" },
    { d: rays(50, 50, 30, 35, 12) },
    { d: L(50, 50, 50, 26), color: red },
    { d: L(50, 50, 67, 58) },
  ],
  gear: [{ d: gear(50, 50, 28, 38, 9), fill: orange }, { d: C(50, 50, 11), fill: "#FFFFFF" }],
  chip: [
    { d: R(28, 28, 44, 44), fill: "#455A64" },
    { d: R(38, 38, 24, 24), fill: teal },
    { d: [36, 50, 64].map((v) => `${L(v, 28, v, 16)} ${L(v, 72, v, 84)} ${L(28, v, 16, v)} ${L(72, v, 84, v)}`).join(" ") },
  ],
  plug: [
    { d: R(35, 40, 30, 28), fill: gray },
    { d: L(43, 40, 43, 24) },
    { d: L(57, 40, 57, 24) },
    { d: "M50 68 C50 86 72 84 84 94" },
  ],
  power: [{ d: "M33 30 A26 26 0 1 0 67 30", color: red, w: 1.4 }, { d: L(50, 16, 50, 48), color: red, w: 1.4 }],
  virus: [
    { d: rays(50, 50, 22, 36, 8) },
    { d: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => C(50 + Math.cos((i * Math.PI) / 4) * 38, 50 + Math.sin((i * Math.PI) / 4) * 38, 4)).join(" "), fill: red },
    { d: C(50, 50, 22), fill: green },
    { d: `${C(43, 45, 4)} ${C(57, 56, 3)}`, fill: "#1B5E20" },
  ],
  bitcoin: [
    { d: C(50, 50, 34), fill: orange },
    { d: "M42 32 L42 68 M42 32 L56 32 C66 32 66 49 56 49 L42 49 M56 49 C68 49 68 68 56 68 L42 68", color: "#FFFFFF", w: 1.3 },
    { d: "M47 26 L47 32 M53 26 L53 32 M47 68 L47 74 M53 68 L53 74", color: "#FFFFFF", w: 1.3 },
  ],
  server: [
    { d: R(22, 14, 56, 22), fill: "#607D8B" },
    { d: R(22, 39, 56, 22), fill: "#607D8B" },
    { d: R(22, 64, 56, 22), fill: "#607D8B" },
    { d: `${C(32, 25, 3)} ${C(32, 50, 3)} ${C(32, 75, 3)}`, fill: green },
    { d: `${L(45, 25, 68, 25)} ${L(45, 50, 68, 50)} ${L(45, 75, 68, 75)}` },
  ],
  box: [
    { d: "M22 40 L60 40 L60 82 L22 82 Z", fill: "#37474F" },
    { d: "M22 40 L40 22 L78 22 L60 40 Z", fill: "#546E7A" },
    { d: "M60 40 L78 22 L78 64 L60 82 Z", fill: "#263238" },
    { d: "M33 54 C33 45 49 45 49 54 C49 60 41 60 41 67 M41 74 L41 75", color: yellow, w: 1.3 },
  ],
  alien: [
    { d: "M50 14 C24 14 18 44 30 60 C38 74 45 86 50 86 C55 86 62 74 70 60 C82 44 76 14 50 14 Z", fill: "#9CCC65" },
    { d: "M30 44 C37 36 47 41 46 50 C39 55 32 52 30 44 Z", fill: ink },
    { d: "M70 44 C63 36 53 41 54 50 C61 55 68 52 70 44 Z", fill: ink },
    { d: "M44 70 C48 73 52 73 56 70" },
  ],
  dog: [
    { d: "M26 36 L16 14 L40 28", fill: "#8D6E63" },
    { d: "M74 36 L84 14 L60 28", fill: "#8D6E63" },
    { d: C(50, 55, 31), fill: "#D7B98E" },
    { d: `${C(39, 48, 4)} ${C(61, 48, 4)}`, fill: ink },
    { d: "M43 62 C43 57 57 57 57 62 C57 66 43 66 43 62 Z", fill: ink },
    { d: "M50 66 L50 72 M39 73 C45 79 55 79 61 73" },
    { d: "M46 76 C46 86 54 86 54 76", fill: pink },
  ],
  eye: [
    { d: "M12 50 C30 24 70 24 88 50 C70 76 30 76 12 50 Z", fill: "#FFFFFF" },
    { d: C(50, 50, 15), fill: blue },
    { d: C(50, 50, 6), fill: ink },
  ],
  god: [
    { d: rays(50, 58, 40, 50, 14, -Math.PI), color: yellow },
    { d: "M50 10 L88 80 L12 80 Z", fill: "#FFF59D" },
    { d: "M30 58 C40 45 60 45 70 58 C60 70 40 70 30 58 Z", fill: "#FFFFFF" },
    { d: C(50, 58, 7), fill: blue },
  ],
  cliff: [
    { d: "M4 92 L4 48 L46 48 C48 60 44 72 54 92 Z", fill: "#A1887F" },
    { d: "M4 48 L46 48", color: green, w: 1.6 },
    { d: "M70 20 C74 30 66 40 72 50", color: gray },
  ],
  iceberg: [
    { d: "M36 40 L50 16 L64 40", fill: "#E3F2FD" },
    { d: "M24 40 L12 70 L34 94 L72 92 L90 62 L76 40 Z", fill: "#90CAF9" },
    { d: "M2 40 C12 36 20 44 30 40 C40 36 48 44 58 40 C68 36 78 44 98 40", color: blue, w: 1.2 },
  ],
  wheel: [
    { d: C(50, 50, 36), color: "#6D4C41", w: 1.6 },
    { d: rays(50, 50, 7, 34, 8), color: "#6D4C41" },
    { d: C(50, 50, 7), fill: "#8D6E63" },
  ],
  factory: [
    { d: "M10 86 L10 50 L30 40 L30 50 L50 40 L50 50 L70 40 L70 86 Z", fill: "#B0BEC5" },
    { d: R(74, 26, 12, 60), fill: red },
    { d: "M80 20 C74 12 88 8 82 2", color: gray },
    { d: `${R(18, 62, 10, 10)} ${R(38, 62, 10, 10)} ${R(56, 62, 8, 10)}`, fill: yellow },
  ],
  wrench: [
    { d: "M24 82 L54 50 C49 38 58 24 72 26 L64 36 L70 42 L80 34 C82 48 70 57 58 53 L30 86 Z", fill: gray },
  ],
  chef: [
    { d: "M30 60 C14 55 18 30 35 35 C35 16 65 16 65 35 C82 30 86 55 70 60 Z", fill: "#FFFFFF" },
    { d: R(30, 60, 40, 16), fill: "#FFFFFF" },
  ],
  hammer: [{ d: R(46, 40, 9, 50), fill: "#8D6E63" }, { d: R(26, 22, 48, 20), fill: gray }],
  gradcap: [
    { d: "M10 40 L50 22 L90 40 L50 58 Z", fill: "#37474F" },
    { d: "M27 48 L27 66 C40 78 60 78 73 66 L73 48", fill: "#546E7A" },
    { d: L(84, 43, 84, 68), color: yellow },
  ],
  car: [
    { d: "M10 64 L18 46 L34 40 L64 40 L78 50 L90 54 L90 70 L10 70 Z", fill: yellow },
    { d: "M37 44 L62 44 L69 53 L32 53 Z", fill: "#B3E5FC" },
    { d: `${C(30, 72, 9)} ${C(72, 72, 9)}`, fill: ink },
  ],
  rocket: [
    { d: "M50 8 C66 24 66 56 60 72 L40 72 C34 56 34 24 50 8 Z", fill: "#FFFFFF" },
    { d: C(50, 36, 7), fill: blue },
    { d: "M40 54 L27 76 L40 71 Z M60 54 L73 76 L60 71 Z", fill: red },
    { d: "M43 73 L50 94 L57 73", fill: orange },
  ],
  chart: [
    { d: L(14, 12, 14, 86, 88, 86) },
    { d: "M20 78 L38 64 L52 68 L82 22", color: red, w: 1.4 },
    { d: "M70 22 L82 22 L82 34", color: red, w: 1.4 },
  ],
  warning: [{ d: "M50 10 L91 86 L9 86 Z", fill: yellow }, { d: L(50, 36, 50, 62), w: 1.5 }, { d: C(50, 73, 2.5), fill: ink }],
  lock: [
    { d: "M36 46 L36 32 C36 13 64 13 64 32 L64 46" },
    { d: R(26, 46, 48, 38), fill: orange },
    { d: C(50, 62, 5), fill: ink },
  ],
  code: [
    { d: "M35 28 L13 50 L35 72", color: blue, w: 1.5 },
    { d: "M65 28 L87 50 L65 72", color: blue, w: 1.5 },
    { d: L(56, 20, 44, 80), color: purple, w: 1.5 },
  ],
  sprout: [
    { d: "M32 76 L68 76 L62 95 L38 95 Z", fill: orange },
    { d: L(50, 76, 50, 42), color: green, w: 1.3 },
    { d: "M50 60 C35 60 27 48 30 38 C43 38 50 50 50 60 Z", fill: green },
    { d: "M50 48 C65 48 73 36 70 26 C57 26 50 38 50 48 Z", fill: green },
  ],
  flask: [
    { d: "M32 64 L68 64 L79 82 C81 88 77 92 71 92 L29 92 C23 92 19 88 21 82 Z", fill: "#76FF03" },
    { d: "M42 12 L42 40 L21 82 C19 88 23 92 29 92 L71 92 C77 92 81 88 79 82 L58 40 L58 12" },
    { d: L(36, 12, 64, 12) },
    { d: `${C(45, 76, 3)} ${C(56, 70, 2)}`, fill: "#FFFFFF" },
  ],
  book: [
    { d: "M50 24 C40 17 20 17 10 21 L10 80 C20 76 40 76 50 84 C60 76 80 76 90 80 L90 21 C80 17 60 17 50 24 Z", fill: "#FFFFFF" },
    { d: L(50, 24, 50, 84) },
    { d: `${L(18, 36, 42, 36)} ${L(18, 48, 42, 48)} ${L(58, 36, 82, 36)} ${L(58, 48, 82, 48)}`, color: blue },
  ],
  bulb: [
    { d: "M38 62 C18 50 24 12 50 12 C76 12 82 50 62 62 L62 72 L38 72 Z", fill: yellow },
    { d: R(40, 72, 20, 12), fill: gray },
    { d: rays(50, 36, 34, 44, 7, -Math.PI * 0.95), color: orange },
  ],
  gamepad: [
    { d: "M20 38 C8 38 6 76 18 78 C27 80 30 68 36 66 L64 66 C70 68 73 80 82 78 C94 76 92 38 80 38 Z", fill: purple },
    { d: "M30 46 L30 60 M23 53 L37 53", color: "#FFFFFF", w: 1.3 },
    { d: `${C(68, 50, 3.5)} ${C(76, 57, 3.5)}`, fill: yellow },
  ],
  planet: [
    { d: C(50, 50, 26), fill: orange },
    { d: E(50, 50, 44, 11, -15), color: purple, w: 1.3 },
  ],
  monitor: [
    { d: R(10, 14, 80, 54), fill: "#263238" },
    { d: C(50, 41, 16), fill: "#90CAF9" },
    { d: "M40 34 C46 30 50 38 46 42 Z M52 46 C58 44 60 50 56 52 Z", fill: green },
    { d: `${L(50, 68, 50, 80)} ${L(34, 82, 66, 82)}` },
  ],
  atom: [
    { d: E(50, 50, 40, 13, 0), color: blue },
    { d: E(50, 50, 40, 13, 60), color: blue },
    { d: E(50, 50, 40, 13, -60), color: blue },
    { d: C(50, 50, 7), fill: red },
  ],
  infinity: [{ d: "M50 50 C40 32 16 32 16 50 C16 68 40 68 50 50 C60 32 84 32 84 50 C84 68 60 68 50 50 Z", color: purple, w: 1.6 }],
  question: [{ d: "M33 30 C33 8 67 8 67 30 C67 46 50 46 50 62", color: red, w: 1.8 }, { d: C(50, 78, 3), fill: red, color: red }],
  hourglass: [
    { d: "M36 76 L64 76 L68 86 L32 86 Z", fill: yellow },
    { d: "M26 14 L74 14 M26 86 L74 86 M32 14 C32 40 50 44 50 50 C50 56 32 60 32 86 M68 14 C68 40 50 44 50 50 C50 56 68 60 68 86" },
  ],
  bell: [
    { d: "M30 70 C30 30 35 22 50 22 C65 22 70 30 70 70 L78 76 L22 76 Z", fill: yellow },
    { d: C(50, 82, 5), fill: orange },
    { d: C(50, 17, 4) },
  ],
  play: [{ d: "M22 24 L78 24 C86 24 90 28 90 36 L90 64 C90 72 86 76 78 76 L22 76 C14 76 10 72 10 64 L10 36 C10 28 14 24 22 24 Z", fill: red }, { d: "M42 38 L42 62 L63 50 Z", fill: "#FFFFFF" }],
  briefcase: [
    { d: "M38 34 L38 24 L62 24 L62 34" },
    { d: R(14, 34, 72, 48), fill: "#8D6E63" },
    { d: L(14, 54, 86, 54) },
    { d: R(45, 50, 10, 9), fill: yellow },
  ],
  temple: [
    { d: "M12 42 L50 16 L88 42 Z", fill: "#FFE0B2" },
    { d: `${L(24, 44, 24, 82)} ${L(42, 44, 42, 82)} ${L(58, 44, 58, 82)} ${L(76, 44, 76, 82)}` },
    { d: R(10, 82, 80, 8), fill: "#FFE0B2" },
  ],
  scroll: [
    { d: R(24, 18, 52, 64), fill: "#FFECB3" },
    { d: `${C(24, 22, 5)} ${C(76, 78, 5)}`, fill: "#FFE082" },
    { d: `${L(32, 32, 68, 32)} ${L(32, 44, 68, 44)} ${L(32, 56, 68, 56)} ${L(32, 68, 56, 68)}`, color: "#8D6E63" },
  ],
  sofa: [
    { d: "M14 54 C14 44 24 44 24 54 L24 62 L76 62 L76 54 C76 44 86 44 86 54 L86 76 L14 76 Z", fill: red },
    { d: R(24, 36, 52, 26), fill: "#EF9A9A" },
    { d: `${L(20, 76, 20, 84)} ${L(80, 76, 80, 84)}` },
  ],
  lightning: [{ d: "M56 8 L28 56 L48 56 L40 92 L74 40 L54 40 L62 8 Z", fill: yellow }],
  network: [
    { d: `${L(20, 25, 50, 50, 80, 22)} ${L(50, 50, 25, 78)} ${L(50, 50, 78, 76)} ${L(20, 25, 25, 78)} ${L(80, 22, 78, 76)}`, color: gray },
    { d: `${C(20, 25, 7)} ${C(80, 22, 7)} ${C(25, 78, 7)} ${C(78, 76, 7)}`, fill: teal },
    { d: C(50, 50, 10), fill: purple },
  ],
  skull: [
    { d: "M24 50 C24 18 76 18 76 50 C76 62 69 66 66 72 L34 72 C31 66 24 62 24 50 Z", fill: "#FFFFFF" },
    { d: `${C(39, 50, 7)} ${C(61, 50, 7)}`, fill: ink },
    { d: `${L(42, 72, 42, 82)} ${L(50, 72, 50, 82)} ${L(58, 72, 58, 82)} ${L(36, 82, 64, 82)}` },
  ],
  crown: [{ d: "M14 72 L20 30 L37 50 L50 20 L63 50 L80 30 L86 72 Z", fill: yellow }, { d: `${C(30, 64, 3)} ${C(50, 62, 3)} ${C(70, 64, 3)}`, fill: red }],
  magnifier: [{ d: L(60, 60, 86, 86), w: 2.2 }, { d: C(42, 42, 24), fill: "#E1F5FE" }],
  shield: [{ d: "M50 10 L83 22 C83 55 71 76 50 89 C29 76 17 55 17 22 Z", fill: green }, { d: "M34 50 L46 62 L67 37", color: "#FFFFFF", w: 1.6 }],
  shieldBroken: [
    { d: "M50 10 L83 22 C83 55 71 76 50 89 C29 76 17 55 17 22 Z", fill: "#CFD8DC" },
    { d: "M50 10 L43 34 L57 50 L45 68 L50 89", color: red, w: 1.5 },
  ],
  house: [
    { d: "M22 44 L22 86 L78 86 L78 44", fill: "#FFCC80" },
    { d: "M12 50 L50 18 L88 50", color: red, w: 1.4 },
    { d: R(42, 62, 16, 24), fill: "#8D6E63" },
  ],
  dna: [
    { d: "M35 10 C70 30 30 70 65 90", color: blue, w: 1.3 },
    { d: "M65 10 C30 30 70 70 35 90", color: red, w: 1.3 },
    { d: `${L(42, 20, 58, 20)} ${L(46, 40, 54, 40)} ${L(42, 60, 58, 60)} ${L(46, 80, 54, 80)}`, color: gray },
  ],
  arrowUp: [{ d: "M50 90 L50 15 M28 38 L50 14 L72 38", color: red, w: 1.8 }],
  hand: [{ d: "M30 90 L30 50 C30 44 38 44 38 50 L38 30 C38 24 46 24 46 30 L46 26 C46 20 54 20 54 26 L54 30 C54 24 62 24 62 30 L62 40 C62 34 70 34 70 40 L70 70 C70 82 62 90 52 90 Z", fill: skin }],
  heart: [{ d: "M50 84 C20 62 10 44 22 30 C32 20 46 24 50 36 C54 24 68 20 78 30 C90 44 80 62 50 84 Z", fill: red }],
  stop: [{ d: "M35 12 L65 12 L88 35 L88 65 L65 88 L35 88 L12 65 L12 35 Z", fill: red }, { d: L(30, 50, 70, 50), color: "#FFFFFF", w: 2 }],
  dice: [{ d: R(20, 20, 60, 60), fill: "#FFFFFF" }, { d: `${C(35, 35, 5)} ${C(50, 50, 5)} ${C(65, 65, 5)}`, fill: ink }],
};

export const iconNames = Object.keys(ICONS);
