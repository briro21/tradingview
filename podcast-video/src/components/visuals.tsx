import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { useAt } from "./Beats";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Ukuran font agar satu baris muat di layar 1920px.
const fit = (text: string, max: number) => Math.min(max, 1650 / (text.length * 0.62));

const useSpring = (delay = 0, damping = 12) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping } });
};

// Getaran layar singkat mulai dari `at`.
const useShake = (at: number, strength = 18) => {
  const frame = useCurrentFrame();
  const k = interpolate(frame - at, [0, 14], [1, 0], clamp) * (frame >= at ? 1 : 0);
  return `translate(${(random(`sx${frame}`) - 0.5) * strength * k}px, ${(random(`sy${frame}`) - 0.5) * strength * k}px)`;
};

const Label: React.FC<{ children: React.ReactNode; delay?: number; color?: string }> = ({
  children,
  delay = 10,
  color = theme.blue,
}) => {
  const s = useSpring(delay, 14);
  return (
    <div
      style={{
        fontSize: 40,
        fontWeight: 700,
        letterSpacing: 8,
        color,
        textAlign: "center",
        opacity: s,
        transform: `translateY(${(1 - s) * 30}px)`,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Teks kinetik: setiap kata "pop" bergantian. Bungkus kata dengan *bintang*
 * untuk aksen cyan.
 */
export const Kinetic: React.FC<{ lines: string[]; step?: number; max?: number; label?: string }> = ({
  lines,
  step = 4,
  max = 150,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let n = 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
      {lines.map((line, li) => {
        const size = fit(line.replace(/\*/g, ""), max);
        return (
          <div key={li} style={{ display: "flex", gap: size * 0.28, whiteSpace: "nowrap" }}>
            {line.split(" ").map((raw, wi) => {
              const accent = raw.startsWith("*");
              const word = raw.replace(/\*/g, "");
              const s = spring({ frame: frame - n++ * step, fps, config: { damping: 10, mass: 0.7 } });
              return (
                <span
                  key={wi}
                  style={{
                    display: "inline-block",
                    fontSize: size,
                    fontWeight: 900,
                    letterSpacing: -2,
                    color: accent ? theme.cyan : theme.white,
                    textShadow: accent ? `0 0 40px ${theme.cyan}aa` : "0 6px 30px rgba(0,0,0,0.6)",
                    opacity: Math.min(1, s * 1.5),
                    transform: `translateY(${(1 - s) * 80}px) scale(${interpolate(s, [0, 1], [1.6, 1])}) rotate(${(1 - s) * -6}deg)`,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        );
      })}
      {label ? <Label delay={n * step + 6}>{label}</Label> : null}
    </div>
  );
};

/** Angka besar yang menghitung naik, dengan cincin progres. */
export const Counter: React.FC<{
  to: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  plain?: boolean;
  duration?: number;
}> = ({ to, from = 0, prefix = "", suffix = "", label, plain, duration = 45 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [4, 4 + duration], [0, 1], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 3) });
  const value = Math.round(from + (to - from) * p);
  const text = `${prefix}${plain ? value : value.toLocaleString("en-US")}${suffix}`;
  const shake = useShake(4 + duration, 14);
  const pulse = interpolate(frame - 4 - duration, [0, 10], [1.12, 1], clamp);
  const R = 260;
  const C = 2 * Math.PI * R;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 50, transform: shake }}>
      <div style={{ position: "relative", width: R * 2 + 40, height: R * 2 + 40, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <svg width={R * 2 + 40} height={R * 2 + 40} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
          <circle cx={R + 20} cy={R + 20} r={R} fill="none" stroke="#ffffff10" strokeWidth={10} />
          <circle
            cx={R + 20}
            cy={R + 20}
            r={R}
            fill="none"
            stroke={theme.blue}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - p)}
            style={{ filter: `drop-shadow(0 0 12px ${theme.blue})` }}
          />
        </svg>
        <div
          style={{
            position: "relative",
            fontSize: Math.min(200, 1500 / text.length),
            fontWeight: 900,
            color: theme.cyan,
            letterSpacing: -4,
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
            textShadow: `0 0 50px ${theme.cyan}99`,
            transform: `scale(${pulse})`,
          }}
        >
          {text}
        </div>
      </div>
      <Label delay={18}>{label}</Label>
    </div>
  );
};

/** Pembuka bab: nomor raksasa + judul. */
export const Chapter: React.FC<{ num: string; title: string }> = ({ num, title }) => {
  const frame = useCurrentFrame();
  const s = useSpring(0, 14);
  const line = interpolate(frame, [10, 40], [0, 1], clamp);
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          fontSize: 520,
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: `3px ${theme.blue}66`,
          transform: `translate(-50%, -55%) translateX(${(1 - s) * 300 - frame * 0.6}px)`,
          opacity: s,
        }}
      >
        {num}
      </div>
      <Label delay={0} color={theme.cyan}>
        INSIGHT {num}
      </Label>
      <Kinetic lines={[title]} max={130} step={5} />
      <div
        style={{
          width: 900 * line,
          height: 6,
          borderRadius: 3,
          background: `linear-gradient(90deg, ${theme.blue}, ${theme.cyan})`,
          boxShadow: `0 0 24px ${theme.cyan}`,
        }}
      />
    </div>
  );
};

/** Dua sisi: kiri muncul dulu, kanan "menghantam" dan kiri meredup. */
export const Versus: React.FC<{
  left: string;
  right: string;
  leftLabel?: string;
  rightLabel?: string;
  rightAt?: number;
}> = ({ left, right, leftLabel, rightLabel, rightAt = 30 }) => {
  const frame = useCurrentFrame();
  const l = useSpring(0);
  const r = useSpring(rightAt, 9);
  const dim = interpolate(frame, [rightAt, rightAt + 10], [1, 0.35], clamp);
  const strike = interpolate(frame, [rightAt + 4, rightAt + 16], [0, 1], clamp);
  const shake = useShake(rightAt + 2, 24);
  const card = (color: string): React.CSSProperties => ({
    width: 700,
    minHeight: 300,
    padding: 40,
    borderRadius: 28,
    border: `3px solid ${color}`,
    background: `${color}12`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    textAlign: "center",
    position: "relative",
  });
  const big = (t: string, color: string): React.CSSProperties => ({
    fontSize: Math.min(84, 1100 / t.length),
    fontWeight: 900,
    lineHeight: 1.1,
    color,
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 50, transform: shake }}>
      <div style={{ ...card(theme.text), opacity: l * dim, transform: `translateX(${(1 - l) * -200}px)` }}>
        {leftLabel ? <div style={{ fontSize: 30, letterSpacing: 6, color: theme.text }}>{leftLabel}</div> : null}
        <div style={big(left, theme.white)}>{left}</div>
        <div
          style={{
            position: "absolute",
            left: 30,
            top: "50%",
            height: 8,
            width: `${strike * 90}%`,
            backgroundColor: theme.cyan,
            transform: "rotate(-8deg)",
            boxShadow: `0 0 20px ${theme.cyan}`,
          }}
        />
      </div>
      <div
        style={{
          fontSize: 60,
          fontWeight: 900,
          color: theme.blue,
          transform: `scale(${l * (1 + Math.sin(frame / 5) * 0.08)})`,
          textShadow: `0 0 30px ${theme.blue}`,
        }}
      >
        VS
      </div>
      <div
        style={{
          ...card(theme.cyan),
          opacity: r,
          transform: `scale(${interpolate(r, [0, 1], [1.8, 1])})`,
          boxShadow: `0 0 ${60 * r}px ${theme.cyan}55`,
        }}
      >
        {rightLabel ? <div style={{ fontSize: 30, letterSpacing: 6, color: theme.cyan }}>{rightLabel}</div> : null}
        <div style={big(right, theme.cyan)}>{right}</div>
      </div>
    </div>
  );
};

/** Daftar yang dicoret satu per satu, lalu dicap. */
export const StrikeList: React.FC<{ items: string[]; stamp: string; gap?: number }> = ({ items, stamp, gap = 12 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stampAt = 20 + items.length * gap + 10;
  const st = useSpring(stampAt, 8);
  const shake = useShake(stampAt + 2, 22);
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 22, transform: shake }}>
      {items.map((item, i) => {
        const s = spring({ frame: frame - i * gap, fps, config: { damping: 12 } });
        const strike = interpolate(frame, [20 + i * gap, 30 + i * gap], [0, 1], clamp);
        return (
          <div key={item} style={{ position: "relative", opacity: s, transform: `translateX(${(1 - s) * 200}px)` }}>
            <div style={{ fontSize: 100, fontWeight: 900, color: strike > 0.5 ? `${theme.text}77` : theme.white }}>{item}</div>
            <div
              style={{
                position: "absolute",
                left: -20,
                top: "52%",
                height: 10,
                width: `calc(${strike * 100}% + 40px)`,
                backgroundColor: theme.cyan,
                boxShadow: `0 0 20px ${theme.cyan}`,
              }}
            />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          padding: "16px 48px",
          border: `8px solid ${theme.cyan}`,
          borderRadius: 18,
          color: theme.cyan,
          fontSize: 110,
          fontWeight: 900,
          letterSpacing: 6,
          whiteSpace: "nowrap",
          backgroundColor: "#121212dd",
          opacity: st,
          transform: `translate(-50%, -50%) rotate(-12deg) scale(${interpolate(st, [0, 1], [3, 1])})`,
          boxShadow: `0 0 60px ${theme.cyan}66`,
        }}
      >
        {stamp}
      </div>
    </div>
  );
};

/** Teks dengan efek glitch RGB-split. */
export const Glitch: React.FC<{ text: string; label?: string; max?: number }> = ({ text, label, max = 200 }) => {
  const frame = useCurrentFrame();
  const s = useSpring(0, 10);
  const burst = frame < 18 || frame % 47 < 5;
  const j = (k: string) => (burst ? (random(`${k}${frame}`) - 0.5) * 40 : 0);
  const size = fit(text, max);
  const layer = (color: string, dx: number, dy: number): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    color,
    transform: `translate(${dx}px, ${dy}px)`,
    mixBlendMode: "screen",
    clipPath: burst ? `inset(${random(`c${color}${frame}`) * 60}% 0 ${random(`d${color}${frame}`) * 30}% 0)` : undefined,
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
      <div
        style={{
          position: "relative",
          fontSize: size,
          fontWeight: 900,
          letterSpacing: -2,
          whiteSpace: "nowrap",
          transform: `scale(${interpolate(s, [0, 1], [1.4, 1])}) skewX(${j("k") * 0.3}deg)`,
          opacity: s,
        }}
      >
        <span style={{ color: theme.white, textShadow: `0 0 40px ${theme.cyan}66` }}>{text}</span>
        <span style={layer(theme.cyan, j("a"), j("b") * 0.3)}>{text}</span>
        <span style={layer(theme.blue, j("c"), j("d") * 0.3)}>{text}</span>
      </div>
      {label ? <Label delay={14}>{label}</Label> : null}
    </div>
  );
};

/** Inti bercahaya dengan cincin orbit berputar. */
export const Orbit: React.FC<{ core: string; label?: string }> = ({ core, label }) => {
  const frame = useCurrentFrame();
  const s = useSpring(0, 12);
  const pulse = 1 + Math.sin(frame / 6) * 0.04;
  const rings = [
    { rx: 420, ry: 130, rot: 20, speed: 1.2 },
    { rx: 380, ry: 110, rot: -35, speed: -0.9 },
    { rx: 460, ry: 90, rot: 75, speed: 0.7 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ position: "relative", width: 1000, height: 520, transform: `scale(${s})` }}>
        <svg width={1000} height={520} style={{ position: "absolute", inset: 0 }}>
          {rings.map((r, i) => {
            const a = (frame * r.speed * Math.PI) / 90;
            return (
              <g key={i} transform={`translate(500 260) rotate(${r.rot})`}>
                <ellipse rx={r.rx} ry={r.ry} fill="none" stroke={`${theme.blue}88`} strokeWidth={3} />
                <circle cx={Math.cos(a) * r.rx} cy={Math.sin(a) * r.ry} r={12} fill={theme.cyan} style={{ filter: `drop-shadow(0 0 10px ${theme.cyan})` }} />
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 340,
            height: 340,
            borderRadius: "50%",
            transform: `translate(-50%, -50%) scale(${pulse})`,
            background: `radial-gradient(circle, ${theme.cyan}55, ${theme.blue}33 60%, transparent 72%)`,
            border: `4px solid ${theme.cyan}`,
            boxShadow: `0 0 80px ${theme.cyan}88, inset 0 0 60px ${theme.cyan}44`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontSize: Math.min(64, 560 / core.length),
            fontWeight: 900,
            color: theme.white,
            padding: 30,
          }}
        >
          {core}
        </div>
      </div>
      {label ? <Label delay={16}>{label}</Label> : null}
    </div>
  );
};

/** Garis waktu yang node-nya menyala saat frasa diucapkan. */
export const Timeline: React.FC<{ items: { at: string; top: string; bottom: string }[] }> = ({ items }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useAt();
  const times = items.map((it, i) => (i === 0 ? 6 : at(it.at)));
  const W = 1200;
  const step = W / (items.length - 1);
  const reach = interpolate(
    frame,
    times.map((t) => t),
    times.map((_, i) => i * step),
    clamp
  );
  return (
    <div style={{ position: "relative", width: W, height: 420, marginLeft: 0 }}>
      <div style={{ position: "absolute", top: 200, left: 0, width: W, height: 6, backgroundColor: "#ffffff18" }} />
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          width: reach,
          height: 6,
          background: `linear-gradient(90deg, ${theme.blue}, ${theme.cyan})`,
          boxShadow: `0 0 20px ${theme.cyan}`,
        }}
      />
      {items.map((it, i) => {
        const s = spring({ frame: frame - times[i], fps, config: { damping: 9 } });
        const last = i === items.length - 1;
        return (
          <div key={i} style={{ position: "absolute", left: i * step, top: 0, width: 0, display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 500, opacity: s }}>
              <div style={{ height: 150, display: "flex", alignItems: "flex-end", fontSize: 70, fontWeight: 900, color: last ? theme.cyan : theme.white, paddingBottom: 20 }}>
                {it.top}
              </div>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: last ? theme.cyan : theme.blue,
                  boxShadow: `0 0 ${30 * s}px ${last ? theme.cyan : theme.blue}`,
                  transform: `scale(${s})`,
                }}
              />
              <div style={{ marginTop: 26, fontSize: 40, color: theme.text, textAlign: "center" }}>{it.bottom}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Kata-kata muncul makin cepat, dengan cincin yang berputar makin kencang. */
export const Accelerate: React.FC<{ items: string[]; ats?: string[] }> = ({ items, ats }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useAt();
  const times = ats ? ats.map((a, i) => (i === 0 ? 4 : at(a))) : items.map((_, i) => [4, 26, 40, 50][i] ?? 50 + i * 6);
  const angle = frame * frame * 0.08;
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <svg width={760} height={760} style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) rotate(${angle}deg)`, opacity: 0.6 }}>
        <circle cx={380} cy={380} r={340} fill="none" stroke={theme.blue} strokeWidth={6} strokeDasharray="40 30" />
        <circle cx={380} cy={380} r={300} fill="none" stroke={`${theme.cyan}66`} strokeWidth={3} strokeDasharray="8 20" />
      </svg>
      {items.map((it, i) => {
        const s = spring({ frame: frame - times[i], fps, config: { damping: 9 } });
        const size = 90 + i * 30;
        return (
          <div
            key={it}
            style={{
              fontSize: fit(it, size),
              fontWeight: 900,
              whiteSpace: "nowrap",
              color: i === items.length - 1 ? theme.cyan : theme.white,
              textShadow: i === items.length - 1 ? `0 0 40px ${theme.cyan}` : "none",
              opacity: s,
              transform: `scale(${interpolate(s, [0, 1], [2, 1])})`,
            }}
          >
            {it}
          </div>
        );
      })}
    </div>
  );
};

const CHARS = "01アイウエオ<>{}#=+*";

/** Hujan kode di belakang teks utama. */
export const CodeRain: React.FC<{ text: string; label?: string }> = ({ text, label }) => {
  const frame = useCurrentFrame();
  const cols = 34;
  return (
    <div style={{ position: "relative", width: 1700, height: 700, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", maskImage: "radial-gradient(ellipse, black 30%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse, black 30%, transparent 75%)" }}>
        {Array.from({ length: cols }, (_, c) => {
          const speed = 6 + random(`rs${c}`) * 10;
          const y = ((frame * speed + random(`ry${c}`) * 900) % 1400) - 700;
          return (
            <div key={c} style={{ position: "absolute", left: c * 50, top: y, fontFamily: "monospace", fontSize: 30, lineHeight: "34px", color: theme.cyan, opacity: 0.5, width: 30, textAlign: "center" }}>
              {Array.from({ length: 20 }, (_, r) => (
                <div key={r} style={{ opacity: r / 20 }}>
                  {CHARS[Math.floor(random(`ch${c}-${r}-${Math.floor(frame / 4)}`) * CHARS.length)]}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div style={{ position: "relative", padding: "30px 60px", backgroundColor: "#121212cc", borderRadius: 24, border: `2px solid ${theme.cyan}55` }}>
        <Glitch text={text} label={label} max={120} />
      </div>
    </div>
  );
};

/** Kubus "black box" berputar 3D. */
export const BlackBox: React.FC<{ label: string }> = ({ label }) => {
  const frame = useCurrentFrame();
  const s = useSpring(0, 12);
  const size = 340;
  const face = (t: string): React.CSSProperties => ({
    position: "absolute",
    width: size,
    height: size,
    border: `4px solid ${theme.cyan}`,
    background: "#0b1220ee",
    boxShadow: `inset 0 0 60px ${theme.blue}88`,
    transform: t,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 200,
    fontWeight: 900,
    color: theme.cyan,
  });
  const h = size / 2;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 70 }}>
      <div style={{ width: size, height: size, perspective: 1400, transform: `scale(${s})` }}>
        <div style={{ width: size, height: size, position: "relative", transformStyle: "preserve-3d", transform: `rotateX(${-20 + Math.sin(frame / 30) * 10}deg) rotateY(${frame * 1.2}deg)` }}>
          <div style={face(`translateZ(${h}px)`)}>?</div>
          <div style={face(`rotateY(180deg) translateZ(${h}px)`)}>?</div>
          <div style={face(`rotateY(90deg) translateZ(${h}px)`)}>?</div>
          <div style={face(`rotateY(-90deg) translateZ(${h}px)`)}>?</div>
          <div style={face(`rotateX(90deg) translateZ(${h}px)`)} />
          <div style={face(`rotateX(-90deg) translateZ(${h}px)`)} />
        </div>
      </div>
      <Label delay={12} color={theme.cyan}>
        {label}
      </Label>
    </div>
  );
};

/** Tombol power ditekan... dan gagal. */
export const PowerButton: React.FC<{ label: string; result?: string }> = ({ label, result = "NO RESPONSE" }) => {
  const frame = useCurrentFrame();
  const s = useSpring(0, 12);
  const press = frame > 24 && frame < 32 ? 0.88 : 1;
  const flicker = frame > 32 ? (random(`f${Math.floor(frame / 3)}`) > 0.3 ? 1 : 0.3) : 1;
  const r = useSpring(40, 10);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
      <Label delay={0}>{label}</Label>
      <svg width={360} height={360} viewBox="0 0 100 100" style={{ transform: `scale(${s * press})`, opacity: flicker, filter: `drop-shadow(0 0 20px ${theme.cyan})` }}>
        <circle cx={50} cy={50} r={46} fill="#0b1220" stroke={theme.cyan} strokeWidth={3} />
        <path d="M 34 34 A 22 22 0 1 0 66 34" fill="none" stroke={theme.cyan} strokeWidth={6} strokeLinecap="round" />
        <line x1={50} y1={22} x2={50} y2={50} stroke={theme.cyan} strokeWidth={6} strokeLinecap="round" />
      </svg>
      <div style={{ fontSize: 80, fontWeight: 900, color: theme.white, opacity: r, transform: `scale(${interpolate(r, [0, 1], [1.6, 1])})` }}>{result}</div>
    </div>
  );
};

/** Grafik jurang kapabilitas vs keamanan AI. */
export const GapChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const W = 1400;
  const H = 560;
  const capability = (x: number) => H - (Math.pow(x, 3.2) * (H - 40) + 20);
  const safety = (x: number) => H - (20 + x * 70);
  const progress = interpolate(frame, [10, Math.min(durationInFrames * 0.7, 240)], [0, 1], clamp);
  const path = (fn: (x: number) => number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 80 * progress; i++) {
      const x = i / 80;
      pts.push(`${i === 0 ? "M" : "L"}${(x * W).toFixed(1)},${fn(x).toFixed(1)}`);
    }
    return pts.join(" ");
  };
  const x = progress;
  const labels = interpolate(progress, [0.85, 1], [0, 1], clamp);
  return (
    <svg width={W + 140} height={H + 40} style={{ overflow: "visible" }}>
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={0} x2={W} y1={(H / 5) * i} y2={(H / 5) * i} stroke="#ffffff0d" strokeWidth={2} />
      ))}
      <line x1={0} y1={H} x2={W} y2={H} stroke="#334155" strokeWidth={3} />
      <path d={path(capability)} fill="none" stroke={theme.cyan} strokeWidth={9} style={{ filter: `drop-shadow(0 0 12px ${theme.cyan})` }} />
      <path d={path(safety)} fill="none" stroke={theme.text} strokeWidth={6} strokeDasharray="16 12" />
      <circle cx={x * W} cy={capability(x)} r={14} fill={theme.cyan} />
      <circle cx={x * W} cy={safety(x)} r={10} fill={theme.text} />
      <rect x={x * W - 4} y={capability(x)} width={8} height={Math.max(0, safety(x) - capability(x))} fill={`${theme.blue}55`} />
      <g style={{ opacity: labels }} fontFamily={theme.font} fontWeight={800} fontSize={40}>
        <text x={W - 30} y={capability(1) + 10} fill={theme.cyan} textAnchor="end">AI CAPABILITY</text>
        <text x={W - 30} y={safety(1) - 24} fill={theme.text} textAnchor="end">AI SAFETY</text>
        <text x={W + 30} y={(capability(1) + safety(1)) / 2} fill={theme.blue} fontSize={56}>GAP</text>
      </g>
    </svg>
  );
};

/** Grid miliaran simulasi; opsional menyorot satu "base reality" + peluangnya. */
export const SimGrid: React.FC<{ odds?: boolean; label?: string }> = ({ odds, label }) => {
  const frame = useCurrentFrame();
  const COLS = 36;
  const ROWS = 11;
  const BASE = 203;
  const visible = interpolate(frame, [4, 50], [0, COLS * ROWS], clamp);
  const value = Math.round(interpolate(frame, [50, 100], [1, 1_000_000_000], { ...clamp, easing: (x) => x * x * x }));
  const pick = odds ? interpolate(frame, [40, 60], [0, 1], clamp) : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 26px)`, gap: 10, transform: `perspective(1200px) rotateX(${20 - frame * 0.05}deg)` }}>
        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const isBase = i === BASE && odds;
          const flick = random(`g${i}-${Math.floor(frame / 6)}`) > 0.85;
          return (
            <div
              key={i}
              style={{
                width: 26,
                height: 26,
                borderRadius: 6,
                backgroundColor: isBase ? theme.cyan : flick ? theme.blue : "#1e3a8a",
                boxShadow: isBase ? `0 0 ${40 * pick}px ${theme.cyan}` : "none",
                opacity: i < visible ? (odds && !isBase ? 1 - pick * 0.6 : 1) : 0,
                transform: `scale(${isBase ? 1 + pick * 0.6 : i < visible ? 1 : 0})`,
              }}
            />
          );
        })}
      </div>
      {odds ? (
        <div style={{ fontSize: 120, fontWeight: 900, color: theme.white, fontVariantNumeric: "tabular-nums", opacity: interpolate(frame, [45, 55], [0, 1], clamp) }}>
          <span style={{ color: theme.cyan }}>1</span> in {value.toLocaleString("en-US")}
        </div>
      ) : null}
      {label ? <Label delay={20}>{label}</Label> : null}
    </div>
  );
};

/** Dua kata saling mendekat lalu menyatu menjadi satu kesimpulan. */
export const Converge: React.FC<{ left: string; right: string; result: string }> = ({ left, right, result }) => {
  const frame = useCurrentFrame();
  const m = interpolate(frame, [6, 45], [0, 1], { ...clamp, easing: (x) => x * x });
  const r = useSpring(46, 9);
  const shake = useShake(46, 26);
  const flash = interpolate(frame, [44, 48, 60], [0, 1, 0], clamp);
  const word = (t: string, dir: number): React.CSSProperties => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    fontSize: 110,
    fontWeight: 900,
    color: dir < 0 ? theme.text : theme.blue,
    whiteSpace: "nowrap",
    opacity: 1 - interpolate(frame, [42, 48], [0, 1], clamp),
    transform: `translate(calc(-50% + ${dir * (1 - m) * 480}px), -50%)`,
  });
  return (
    <div style={{ position: "relative", width: 1600, height: 400, transform: shake }}>
      <div style={word(left, -1)}>{left}</div>
      <div style={word(right, 1)}>{right}</div>
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 600, height: 600, borderRadius: "50%", transform: "translate(-50%, -50%)", background: `radial-gradient(circle, ${theme.cyan}, transparent 60%)`, opacity: flash }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) scale(${interpolate(r, [0, 1], [0.3, 1])})`, opacity: r, whiteSpace: "nowrap" }}>
        <Glitch text={result} max={150} />
      </div>
    </div>
  );
};

/** Avatar host dengan cincin denyut. */
export const Hero: React.FC<{ title: string[] }> = ({ title }) => {
  const frame = useCurrentFrame();
  const s = useSpring(0, 10);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 50 }}>
      <div style={{ position: "relative", width: 300, height: 300, transform: `scale(${s})` }}>
        {[0, 1, 2].map((i) => {
          const p = ((frame + i * 20) % 60) / 60;
          return (
            <div key={i} style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `3px solid ${theme.cyan}`, transform: `scale(${1 + p * 0.8})`, opacity: 1 - p }} />
          );
        })}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `6px solid ${theme.blue}`,
            boxShadow: `0 0 60px ${theme.blue}`,
            background: "linear-gradient(135deg, #1e293b, #0f172a)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 110,
            fontWeight: 900,
            color: theme.white,
          }}
        >
          {/* Ganti dengan foto host: <Img src={staticFile("host.png")} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} /> */}
          AI
        </div>
      </div>
      <Kinetic lines={title} max={110} step={4} />
    </div>
  );
};

/** Tombol subscribe + kursor yang mengklik saat frasa diucapkan. */
export const Subscribe: React.FC<{ clickAt: string }> = ({ clickAt }) => {
  const frame = useCurrentFrame();
  const at = useAt();
  const click = at(clickAt);
  const s = useSpring(0, 9);
  const move = interpolate(frame, [click - 25, click], [0, 1], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 3) });
  const clicked = frame >= click;
  const press = frame >= click && frame < click + 6 ? 0.92 : 1;
  const ripple = interpolate(frame - click, [0, 20], [0, 1], clamp);
  const pulse = 1 + Math.sin(frame / 5) * 0.03;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 60 }}>
      <Kinetic lines={["STAY AHEAD OF", "THE *CURVE*"]} max={120} />
      <div style={{ position: "relative" }}>
        <div
          style={{
            padding: "34px 90px",
            borderRadius: 24,
            backgroundColor: clicked ? "#334155" : theme.blue,
            color: theme.white,
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: 4,
            boxShadow: `0 0 ${clicked ? 20 : 60}px ${theme.blue}`,
            transform: `scale(${s * press * (clicked ? 1 : pulse)})`,
          }}
        >
          {clicked ? "SUBSCRIBED ✓" : "SUBSCRIBE"}
        </div>
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 400, height: 400, borderRadius: "50%", border: `4px solid ${theme.cyan}`, transform: `translate(-50%, -50%) scale(${ripple})`, opacity: frame >= click ? 1 - ripple : 0 }} />
        <svg
          width={70}
          height={70}
          viewBox="0 0 24 24"
          style={{ position: "absolute", left: `${interpolate(move, [0, 1], [140, 60])}%`, top: `${interpolate(move, [0, 1], [260, 55])}%`, transform: `scale(${press})`, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.6))" }}
        >
          <path d="M4 2 L4 20 L9 15 L12 22 L15 21 L12 14 L19 14 Z" fill={theme.white} stroke="#000" strokeWidth={1} />
        </svg>
      </div>
    </div>
  );
};
