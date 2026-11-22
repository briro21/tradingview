import { Item } from "./Board";

// Rich scene items for the motion engine (epN-reel/film.js), after Lemo-Opuscar styles:
// BARS / LINE = Data Storytelling (paper + pencil), SHEET = Spreadsheet film, FLOW = concept
// diagram, TIMELINE = Visual Investigation clock. Each row can carry its own `at` phrase so the
// mark lands on the word that says it. Only the motion engine draws these (not the Remotion board).

export type Row = { label: string; value?: number; text?: string; at?: string; hi?: boolean; color?: "red" | "amber" | "lime" | "blue" };
type Common = { title?: string; note?: string; noteAt?: string; at?: string };

const item = (o: object): Item => ({ x: 800, y: 450, ...o }) as unknown as Item;

/** Horizontal bars that grow on their words; `hi` bar in red with a pencil ring + note. */
export const BARS = (title: string, rows: Row[], o: Common & { unit?: string } = {}): Item => item({ k: "bars", title, rows, ...o });
/** A line through points (left to right), each landing on its word. */
export const LINE = (title: string, rows: Row[], o: Common = {}): Item => item({ k: "line", title, rows, ...o });
/** A spreadsheet: formula typed in the bar, cells filling row by row, conditional colours. */
export const SHEET = (title: string, rows: Row[], o: Common & { formula?: string } = {}): Item => item({ k: "sheet", title, rows, ...o });
/** Nodes around a centre; arrows draw in and money dots flow (dir "in"), or a closed loop. */
export const FLOW = (center: string, rows: Row[], o: Common & { dir?: "in" | "loop"; amount?: string } = {}): Item => item({ k: "flow", title: center, rows, ...o });
/** Dated cards on one clock; `hi` card pulses red. */
export const TIMELINE = (title: string, rows: Row[], o: Common = {}): Item => item({ k: "timeline", title, rows, ...o });
