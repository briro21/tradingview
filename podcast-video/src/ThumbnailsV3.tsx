import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { theme } from "./theme";
import { Icon } from "./Thumbnails";

// Thumbnail v3, mengikuti DNA channel pemenang hasil riset (RESEARCH.md):
// 2–3 kata font condensed tebal, satu wajah beremosi besar + satu objek, latar polos,
// aksen lingkaran/garis merah, tanpa strip "podcast".

const anton = loadAnton().fontFamily;
const { ink, red, yellow, skin } = theme;

type Mood = "worried" | "shocked" | "crying" | "smirk";

/** Wajah doodle ekspresif (bukan potret tamu) sebagai pemancing emosi. */
export const Face: React.FC<{
  mood: Mood;
  x: number;
  y: number;
  size: number;
  hair?: "none" | "short" | "long";
  beard?: boolean;
  glasses?: boolean;
  shirt?: string;
  flip?: boolean;
}> = ({ mood, x, y, size, hair = "short", beard = false, glasses = false, shirt = "#37474F", flip = false }) => {
  const sw = 3.2;
  const brow = mood === "smirk" ? "M30 36 L44 34 M56 33 L71 30" : mood === "shocked" ? "M28 30 C34 24 42 24 46 28 M54 28 C58 24 66 24 72 30" : "M27 38 C33 30 40 26 47 27 M53 27 C60 26 67 30 73 38";
  const eyeR = mood === "shocked" ? 9.5 : mood === "smirk" ? 6.5 : 8.5;
  const pupil = mood === "shocked" ? 2.2 : 3.4;
  const mouth =
    mood === "shocked"
      ? <ellipse cx={50} cy={72} rx={8} ry={10} fill="#5D1F1F" stroke={ink} strokeWidth={sw} />
      : mood === "crying"
        ? <path d="M34 78 C40 64 60 64 66 78 C58 74 42 74 34 78 Z" fill="#5D1F1F" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
        : mood === "smirk"
          ? <path d="M38 72 C46 76 56 74 64 66" fill="none" stroke={ink} strokeWidth={sw} strokeLinecap="round" />
          : <path d="M33 76 C38 69 43 76 48 71 C53 66 57 75 62 70 C64 68 66 70 68 73" fill="none" stroke={ink} strokeWidth={sw + 1} strokeLinecap="round" />;
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 100 125" style={{ position: "absolute", left: x - size / 2, top: y - size / 2, overflow: "visible", transform: flip ? "scaleX(-1)" : undefined }}>
      {/* bahu + baju */}
      <path d="M8 125 C10 100 28 92 50 92 C72 92 90 100 92 125 Z" fill={shirt} stroke={ink} strokeWidth={sw} />
      <path d="M42 92 L50 104 L58 92" fill="#FFFFFF" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      {/* leher + kepala */}
      <path d="M42 84 L42 94 L58 94 L58 84" fill={skin} stroke={ink} strokeWidth={sw} />
      {hair === "long" ? <path d="M16 50 C12 14 88 14 84 50 L84 70 L16 70 Z" fill="#4E342E" stroke={ink} strokeWidth={sw} /> : null}
      <ellipse cx={50} cy={52} rx={33} ry={37} fill={skin} stroke={ink} strokeWidth={sw} />
      {/* telinga */}
      <path d="M17 50 C10 48 10 62 18 62 M83 50 C90 48 90 62 82 62" fill={skin} stroke={ink} strokeWidth={sw} />
      {hair === "short" ? <path d="M17 44 C16 18 34 12 50 13 C68 12 86 20 83 44 C76 34 66 26 50 28 C36 28 24 34 17 44 Z" fill="#4E342E" stroke={ink} strokeWidth={sw} strokeLinejoin="round" /> : null}
      {hair === "none" ? <path d="M28 22 C34 18 40 17 44 18" fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" opacity={0.6} /> : null}
      {beard ? <path d="M18 58 C20 84 36 92 50 92 C64 92 80 84 82 58 C76 70 66 80 50 80 C34 80 24 70 18 58 Z" fill="#5D4037" stroke={ink} strokeWidth={sw} /> : null}
      {/* alis + mata */}
      <path d={brow} fill="none" stroke={ink} strokeWidth={sw + 2.6} strokeLinecap="round" />
      <circle cx={38} cy={45} r={eyeR} fill="#FFFFFF" stroke={ink} strokeWidth={sw} />
      <circle cx={62} cy={45} r={eyeR} fill="#FFFFFF" stroke={ink} strokeWidth={sw} />
      <circle cx={mood === "smirk" ? 40 : 38} cy={46} r={pupil} fill={ink} />
      <circle cx={mood === "smirk" ? 64 : 62} cy={46} r={pupil} fill={ink} />
      {glasses ? <path d="M28 45 a10 9 0 1 0 20 0 a10 9 0 1 0 -20 0 M52 45 a10 9 0 1 0 20 0 a10 9 0 1 0 -20 0 M48 45 L52 45" fill="none" stroke={ink} strokeWidth={sw} /> : null}
      {/* hidung + mulut */}
      <path d="M50 50 C48 56 47 60 51 61" fill="none" stroke={ink} strokeWidth={sw - 0.8} strokeLinecap="round" />
      {mouth}
      {mood === "crying" ? <path d="M34 53 C32 60 30 64 33 68 C36 64 35 60 34 53 Z M66 53 C68 60 70 64 67 68 C64 64 65 60 66 53 Z" fill="#4FC3F7" stroke="#0277BD" strokeWidth={1.5} /> : null}
      {mood === "worried" || mood === "shocked" ? <path d="M84 24 C80 32 80 37 84 39 C88 37 88 32 84 24 Z" fill="#81D4FA" stroke="#0277BD" strokeWidth={1.5} /> : null}
    </svg>
  );
};

/** Teks condensed tebal (Anton). */
export const Big: React.FC<{ children: React.ReactNode; size: number; color?: string; style?: React.CSSProperties }> = ({ children, size, color = ink, style }) => (
  <div style={{ fontFamily: anton, fontSize: size, color, lineHeight: 0.98, textTransform: "uppercase", whiteSpace: "nowrap", letterSpacing: 1, ...style }}>{children}</div>
);

/** Coretan garis bawah merah. */
export const Scribble: React.FC<{ x: number; y: number; w: number; color?: string }> = ({ x, y, w, color = red }) => (
  <svg width={w} height={30} viewBox={`0 0 ${w} 30`} style={{ position: "absolute", left: x, top: y, overflow: "visible" }}>
    <path d={`M4 18 C${w * 0.3} 8 ${w * 0.6} 26 ${w - 4} 10`} fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" />
  </svg>
);

/** Lingkaran merah gaya spidol. */
export const RedCircle: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: "absolute", left: x - w / 2, top: y - h / 2, overflow: "visible" }}>
    <path d={`M${w * 0.55} 6 C${w * 0.95} 4 ${w} ${h * 0.5} ${w * 0.9} ${h * 0.8} C${w * 0.75} ${h} ${w * 0.2} ${h} ${w * 0.06} ${h * 0.72} C-4 ${h * 0.4} ${w * 0.15} 8 ${w * 0.6} 12`} fill="none" stroke={red} strokeWidth={9} strokeLinecap="round" />
  </svg>
);

/** Potret kartun narasumber (dibuat dari foto episode asli, lihat scripts/cartoon_guest.py). */
export const Guest: React.FC<{ n: number; height?: number; left?: number }> = ({ n, height = 800, left = -40 }) => (
  <Img src={staticFile(`thumbs/guest${n}.png`)} style={{ position: "absolute", left, bottom: -40, height }} />
);

const Bg: React.FC<{ dark?: boolean; glow?: string; children: React.ReactNode }> = ({ dark, glow = red, children }) => (
  <AbsoluteFill style={{ backgroundColor: dark ? "#111111" : "#F3F1EA" }}>
    <AbsoluteFill style={{ background: `radial-gradient(circle at 330px 420px, ${glow}${dark ? "99" : "40"} 0px, transparent 380px)` }} />
    {children}
    <AbsoluteFill style={{ boxShadow: dark ? "inset 0 0 160px #000" : "inset 0 0 120px rgba(0,0,0,0.12)" }} />
  </AbsoluteFill>
);

// ---------- Thumbnail v3 per video ----------

/** Ep1 Roman Yampolskiy: 99% pengangguran. */
export const V3Ep1: React.FC = () => (
  <Bg dark>
    <Guest n={1} />
    <Icon name="robot" x={560} y={250} size={170} rotate={10} />
    <div style={{ position: "absolute", right: 60, top: 150, textAlign: "right" }}>
      <Big size={230} color={red}>99%</Big>
      <Big size={120} color="#FFFFFF" style={{ marginTop: 10 }}>JOBLESS</Big>
    </div>
  </Bg>
);

/** Ep2 Daniel Kokotajlo: menolak $2 juta untuk memperingatkan. */
export const V3Ep2: React.FC = () => (
  <Bg>
    <Guest n={2} />
    <Icon name="money" x={580} y={230} size={170} rotate={-12} />
    <div style={{ position: "absolute", right: 60, top: 140, textAlign: "right" }}>
      <Big size={110}>HE GAVE UP</Big>
      <Big size={230} color={red} style={{ marginTop: 8 }}>$2M</Big>
    </div>
    <RedCircle x={1050} y={385} w={440} h={250} />
  </Bg>
);

/** Ep3 Robert Greene: sisi gelap. */
export const V3Ep3: React.FC = () => (
  <Bg dark>
    <Guest n={3} />
    <Icon name="mask" x={610} y={230} size={200} rotate={-10} />
    <div style={{ position: "absolute", right: 60, top: 170, textAlign: "right" }}>
      <Big size={120} color="#FFFFFF">YOUR</Big>
      <Big size={160} color={red} style={{ marginTop: 6 }}>DARK SIDE</Big>
    </div>
  </Bg>
);

/** Ep4 (upload) Joscha Bach: dunia nyata tidak pernah kamu lihat. */
export const V3Ep4: React.FC = () => (
  <Bg dark glow={theme.purple}>
    <Guest n={4} />
    <Icon name="brain" x={590} y={220} size={180} rotate={10} />
    <div style={{ position: "absolute", right: 60, top: 170, textAlign: "right" }}>
      <Big size={130} color="#FFFFFF">IT'S NOT</Big>
      <Big size={190} color={yellow} style={{ marginTop: 6 }}>REAL</Big>
    </div>
  </Bg>
);

/** Ep5 (upload) AI & matematika: 700 bukti dalam satu malam. */
export const V3Ep5: React.FC = () => (
  <Bg>
    <Guest n={5} />
    <Icon name="robot" x={720} y={600} size={150} rotate={-8} />
    <div style={{ position: "absolute", right: 60, top: 130, textAlign: "right" }}>
      <Big size={230} color={red}>700</Big>
      <Big size={120} style={{ marginTop: 6 }}>PROOFS</Big>
      <Big size={78} style={{ marginTop: 10 }}>IN ONE NIGHT</Big>
    </div>
    <Scribble x={860} y={630} w={360} />
  </Bg>
);

/** Ep6 (upload) Robert Pape: 8 minggu paling berbahaya. */
export const V3Ep6: React.FC = () => (
  <Bg dark>
    <Guest n={6} />
    <Icon name="bomb" x={580} y={230} size={170} rotate={-10} />
    <div style={{ position: "absolute", right: 60, top: 140, textAlign: "right" }}>
      <Big size={110} color="#FFFFFF">THE NEXT</Big>
      <Big size={180} color={red} style={{ marginTop: 6 }}>8 WEEKS</Big>
    </div>
    <Scribble x={860} y={560} w={370} color={yellow} />
  </Bg>
);
