import { theme } from "../theme";
import { Item } from "./Board";

// Helper ringkas untuk menyusun isi panel (koordinat panel 1600×900, pusat x=800).
type Opt = { at?: string; wait?: number; dur?: number };

export const T = (text: string, x: number, y: number, o: Opt & { size?: number; color?: string; font?: "marker" | "hand" } = {}): Item => ({
  k: "text",
  text,
  x,
  y,
  ...o,
});
export const H = (text: string, x: number, y: number, o: Opt & { size?: number; color?: string } = {}): Item =>
  T(text, x, y, { font: "hand", size: 64, ...o });
export const I = (name: string, x: number, y: number, s = 1, o: Opt = {}): Item => ({ k: "icon", name, x, y, s, ...o });
export const N = (
  to: number,
  x: number,
  y: number,
  o: Opt & { from?: number; prefix?: string; suffix?: string; plain?: boolean; size?: number; color?: string } = {}
): Item => ({ k: "count", to, x, y, ...o });

export const U = (x: number, y: number, w: number, color: string = theme.red, o: Opt = {}): Item => ({
  k: "path",
  d: `M${x - w / 2} ${y} C${x - w / 6} ${y + 10} ${x + w / 6} ${y - 8} ${x + w / 2} ${y + 4}`,
  color,
  w: 1.1,
  ...o,
});
export const S = (x: number, y: number, w: number, o: Opt = {}): Item => ({
  k: "path",
  d: `M${x - w / 2} ${y + 10} L${x + w / 2} ${y - 10}`,
  color: theme.red,
  w: 1.4,
  ...o,
});
export const X = (x: number, y: number, r: number, o: Opt = {}): Item => ({
  k: "path",
  d: `M${x - r} ${y - r} L${x + r} ${y + r} M${x + r} ${y - r} L${x - r} ${y + r}`,
  color: theme.red,
  w: 1.6,
  ...o,
});
export const O = (x: number, y: number, rx: number, ry: number, color: string = theme.red, o: Opt = {}): Item => {
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = -0.3 + (i / 60) * (Math.PI * 2 + 0.6);
    const r = 1 + 0.04 * Math.sin(t * 3);
    pts.push(`${i ? "L" : "M"}${(x + Math.cos(t) * rx * r).toFixed(1)} ${(y + Math.sin(t) * ry * r * (1 + i / 600)).toFixed(1)}`);
  }
  return { k: "path", d: pts.join(" "), color, w: 1.1, ...o };
};
export const A = (x1: number, y1: number, x2: number, y2: number, color: string = theme.ink, o: Opt & { bend?: number } = {}): Item => {
  const bend = o.bend ?? 0.2;
  const mx = (x1 + x2) / 2 - (y2 - y1) * bend;
  const my = (y1 + y2) / 2 + (x2 - x1) * bend;
  const ang = Math.atan2(y2 - my, x2 - mx);
  const h = 28;
  const h1 = `${x2 - h * Math.cos(ang - 0.45)} ${y2 - h * Math.sin(ang - 0.45)}`;
  const h2 = `${x2 - h * Math.cos(ang + 0.45)} ${y2 - h * Math.sin(ang + 0.45)}`;
  return { k: "path", d: `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2} M${h1} L${x2} ${y2} L${h2}`, color, w: 1, ...o };
};
