import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { getLength, getPointAtLength } from "@remotion/paths";
import { theme } from "../theme";
import { SceneId } from "../timeline";
import { findPhrase, TIMING } from "../timing";
import { ICONS } from "./icons";

// ---------- tipe ----------

type Base = { at?: string; wait?: number; dur?: number };
export type Item = Base &
  (
    | { k: "icon"; name: string; x: number; y: number; s?: number }
    | { k: "text"; text: string; x: number; y: number; size?: number; color?: string; font?: "marker" | "hand" }
    | { k: "count"; to: number; from?: number; prefix?: string; suffix?: string; plain?: boolean; x: number; y: number; size?: number; color?: string }
    | { k: "path"; d: string; color?: string; w?: number }
  );
export type Beat = { at: string; items: Item[] };

// Panel = satu "halaman" 1600×900 di papan; kamera berpindah antar panel.
export const PANEL_W = 1600;
export const PANEL_H = 900;
const GAP_X = 1850;
const GAP_Y = 1150;
const COLS = 4;
const LEAD = 14; // kamera mulai bergerak sedikit sebelum kata diucapkan
const MOVE = 18; // lama perpindahan kamera
const ICON_PX = 2.2; // 1 unit ikon = 2.2px pada skala 1
const STROKE = 7;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ---------- penjadwalan ----------

type Seg = { d: string; len: number; color: string; w: number; fill?: string };
type Sched = { item: Item; start: number; dur: number; segs: Seg[]; total: number; k: number; ox: number; oy: number };

const textWidth = (text: string, size: number, font: "marker" | "hand") => text.length * size * (font === "marker" ? 0.6 : 0.42);

const segsOf = (item: Item): { segs: Seg[]; k: number; ox: number; oy: number } => {
  if (item.k === "icon") {
    const k = (item.s ?? 1) * ICON_PX;
    const strokes = ICONS[item.name];
    if (!strokes) throw new Error(`Unknown icon: ${item.name}`);
    return {
      k,
      ox: item.x - 50 * k,
      oy: item.y - 50 * k,
      segs: strokes.map((s) => ({ d: s.d, len: getLength(s.d), color: s.color ?? theme.ink, w: s.w ?? 1, fill: s.fill })),
    };
  }
  if (item.k === "path") {
    return { k: 1, ox: 0, oy: 0, segs: [{ d: item.d, len: getLength(item.d), color: item.color ?? theme.red, w: item.w ?? 1 }] };
  }
  return { k: 1, ox: 0, oy: 0, segs: [] };
};

const autoDur = (item: Item, total: number, k: number) => {
  if (item.k === "icon") return Math.round(Math.min(42, Math.max(14, (total * k) / 50)));
  if (item.k === "path") return Math.round(Math.min(22, Math.max(8, total / 55)));
  const text = item.k === "text" ? item.text : `${item.prefix ?? ""}${item.to.toLocaleString("en-US")}${item.suffix ?? ""}`;
  return Math.round(Math.min(45, Math.max(10, text.length * 1.4)));
};

const schedule = (items: Item[], atFrame: (phrase: string) => number, avail: number): Sched[] => {
  let cursor = MOVE;
  const out = items.map((item) => {
    const g = segsOf(item);
    const total = g.segs.reduce((a, s) => a + s.len, 0);
    const start = item.at ? Math.max(cursor, atFrame(item.at)) : cursor + (item.wait ?? 0);
    const dur = item.dur ?? autoDur(item, total, g.k);
    cursor = start + dur + 3;
    return { item, start, dur, total, ...g };
  });
  // Kalau tidak muat di durasi beat, padatkan item yang tidak terikat frasa.
  const end = cursor;
  if (end > avail - 8 && avail > MOVE + 20) {
    const f = (avail - 8 - MOVE) / (end - MOVE);
    let c = MOVE;
    for (const s of out) {
      const dur = Math.max(6, Math.round(s.dur * f));
      s.start = s.item.at ? Math.max(c, atFrame(s.item.at)) : c + Math.round((s.item.wait ?? 0) * f);
      s.dur = dur;
      c = s.start + dur + 1;
    }
  }
  return out;
};

// ---------- render ----------

// Tangan memegang spidol; ujung spidol tepat di (x, y).
const Hand: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => {
  const k = { stroke: theme.ink, strokeWidth: 4, strokeLinejoin: "round" as const };
  return (
    <g transform={`translate(${x} ${y}) scale(1.25)`}>
      <path d="M215 205 L290 135 L380 225 L305 300 Z" fill="#37474F" {...k} />
      <path d="M8 2 L212 202 L200 214 L-4 14 Z" fill="#FAFAFA" {...k} />
      <path d="M8 2 L40 34 L28 46 L-4 14 Z" fill={color} {...k} />
      <path d="M-2 -2 L12 2 L2 12 Z" fill={color} {...k} />
      <path d="M118 52 C168 34 252 86 262 160 C268 214 212 256 158 246 C114 238 92 196 96 154 C98 118 102 76 118 52 Z" fill={theme.skin} {...k} />
      <path d="M42 22 C64 2 126 30 146 62 C156 82 134 94 118 82 C96 66 72 56 52 46 C36 38 30 30 42 22 Z" fill={theme.skin} {...k} />
      <path d="M58 72 C74 56 106 72 116 94 C120 110 98 116 88 104 C78 94 62 88 58 72 Z" fill={theme.skin} {...k} />
      <path d="M100 120 C82 128 84 150 104 152 M108 160 C92 170 98 190 118 188 M126 196 C114 210 124 226 142 220" fill="none" {...k} />
      <path d="M150 90 C170 100 182 118 186 138" fill="none" stroke={theme.ink} strokeWidth={3} opacity={0.5} />
    </g>
  );
};

const Panel: React.FC<{ t: number; sched: Sched[]; id: string; frame: number }> = ({ t, sched, id, frame }) => {
  let tip: { x: number; y: number; color: string } | null = null;
  const draws = sched.map((s, i) => {
    const p = interpolate(t, [s.start, s.start + s.dur], [0, 1], clamp);
    if (t < s.start) return null;
    const active = t <= s.start + s.dur + 4;
    const { item } = s;

    if (item.k === "text" || item.k === "count") {
      const size = item.size ?? 90;
      const font = item.k === "text" ? (item.font ?? "marker") : "marker";
      const color = item.color ?? theme.ink;
      let str: string;
      if (item.k === "text") str = item.text;
      else {
        const from = item.from ?? 0;
        const c = interpolate(t, [s.start + s.dur * 0.4, s.start + s.dur + 30], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
        const fmt = (v: number) => (item.plain ? String(v) : v.toLocaleString("en-US"));
        str = `${item.prefix ?? ""}${fmt(Math.round(from + (item.to - from) * c))}${item.suffix ?? ""}`;
      }
      const full = item.k === "count" ? `${item.prefix ?? ""}${item.plain ? item.to : item.to.toLocaleString("en-US")}${item.suffix ?? ""}` : str;
      const w = textWidth(full, size, font) * 1.15;
      const x0 = item.x - w / 2;
      if (active) tip = { x: x0 + w * p, y: item.y + size * 0.25, color };
      return (
        <g key={i}>
          <clipPath id={`${id}-c${i}`}>
            <rect x={x0 - 40} y={item.y - size} width={p >= 1 ? 99999 : w * p + 40} height={size * 2} />
          </clipPath>
          <text
            x={item.x}
            y={item.y}
            clipPath={`url(#${id}-c${i})`}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={font === "marker" ? theme.marker : theme.hand}
            fontSize={size}
            fill={color}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {str}
          </text>
        </g>
      );
    }

    let acc = 0;
    const drawn = p * s.total;
    const paths = s.segs.map((seg, j) => {
      const sp = Math.min(1, Math.max(0, (drawn - acc) / seg.len));
      if (active && sp > 0 && sp < 1) {
        const pt = getPointAtLength(seg.d, seg.len * sp);
        tip = { x: s.ox + pt.x * s.k, y: s.oy + pt.y * s.k, color: seg.color };
      }
      acc += seg.len;
      const fillT = seg.fill ? interpolate(t, [s.start + (acc / s.total) * s.dur, s.start + (acc / s.total) * s.dur + 8], [0, 1], clamp) : 0;
      return (
        <g key={j}>
          {seg.fill ? <path d={seg.d} fill={seg.fill} opacity={fillT * 0.95} stroke="none" /> : null}
          <path
            d={seg.d}
            fill="none"
            stroke={seg.color}
            strokeWidth={(STROKE * seg.w) / s.k}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - sp}
          />
        </g>
      );
    });
    if (active && p >= 1 && !tip) {
      const last = s.segs[s.segs.length - 1];
      const pt = getPointAtLength(last.d, last.len);
      tip = { x: s.ox + pt.x * s.k, y: s.oy + pt.y * s.k, color: last.color };
    }
    return (
      <g key={i} transform={`translate(${s.ox} ${s.oy}) scale(${s.k})`}>
        {paths}
      </g>
    );
  });

  const seed = Math.floor(frame / 6) % 5; // garis "bergetar" seperti animasi tangan
  const t2 = tip as { x: number; y: number; color: string } | null;
  return (
    <svg width={PANEL_W} height={PANEL_H} style={{ overflow: "visible" }}>
      <defs>
        <filter id={`${id}-wob`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves={2} seed={seed} />
          <feDisplacementMap in="SourceGraphic" scale={4} />
        </filter>
      </defs>
      <g filter={`url(#${id}-wob)`}>{draws}</g>
      {t2 ? <Hand x={t2.x} y={t2.y} color={t2.color} /> : null}
    </svg>
  );
};

const panelPos = (i: number) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  return { x: (row % 2 ? COLS - 1 - col : col) * GAP_X, y: row * GAP_Y };
};

export const BoardTrack: React.FC<{ scene: SceneId; beats: Beat[] }> = ({ scene, beats }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const { words, frames } = TIMING[scene];

  let idx = 0;
  const starts = beats.map((b, i) => {
    const found = findPhrase(words, b.at, idx);
    if (found < 0) throw new Error(`[${scene}] beat phrase not found: "${b.at}"`);
    idx = found + 1;
    return i === 0 ? 0 : Math.max(0, Math.round(words[found][1] * fps) - LEAD);
  });

  const scheds = beats.map((b, i) => {
    const from = starts[i];
    const end = i + 1 < beats.length ? starts[i + 1] : frames;
    const startIdx = Math.max(0, words.findIndex((w) => w[1] * fps >= from));
    const atFrame = (phrase: string) => {
      const j = findPhrase(words, phrase, startIdx);
      if (j < 0) throw new Error(`[${scene}] item phrase not found: "${phrase}"`);
      return Math.round(words[j][1] * fps) - from;
    };
    return schedule(b.items, atFrame, end - from);
  });

  let cur = 0;
  for (let i = 0; i < starts.length; i++) if (frame >= starts[i]) cur = i;
  const local = frame - starts[cur];
  const m = interpolate(local, [0, MOVE], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const a = cur === 0 ? { x: panelPos(0).x + GAP_X, y: 0 } : panelPos(cur - 1);
  const b = panelPos(cur);
  const end = cur + 1 < starts.length ? starts[cur + 1] : frames;
  const drift = interpolate(local, [MOVE, end - starts[cur]], [0, 0.04], clamp);
  const zoom = (1 - 0.22 * Math.sin(Math.PI * m)) * (1 + drift);
  const cx = lerp(a.x, b.x, m) + PANEL_W / 2;
  const cy = lerp(a.y, b.y, m) + PANEL_H / 2;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transformOrigin: "0 0",
          transform: `translate(${width / 2}px, ${height / 2 - 40}px) scale(${zoom}) translate(${-cx}px, ${-cy}px)`,
        }}
      >
        {beats.map((_, i) => {
          if (i > cur || i < cur - 2) return null;
          const p = panelPos(i);
          return (
            <div key={i} style={{ position: "absolute", left: p.x, top: p.y, width: PANEL_W, height: PANEL_H }}>
              <Panel t={frame - starts[i]} sched={scheds[i]} id={`${scene}-${i}`} frame={frame} />
            </div>
          );
        })}
      </div>
      {beats.map((_, i) => (
        <React.Fragment key={i}>
          {i > 0 ? (
            <Sequence from={starts[i]} durationInFrames={20}>
              <Audio src={staticFile("sfx/whoosh.mp3")} volume={0.12} />
            </Sequence>
          ) : null}
        </React.Fragment>
      ))}
    </AbsoluteFill>
  );
};
