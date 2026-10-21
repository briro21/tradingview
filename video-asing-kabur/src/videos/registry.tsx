import {timeline as arb} from './arb-7/storyboard';
import arbCaptions from './arb-7/captions.json';
import arbLines from './arb-7/lines.json';
import arbMeta from './arb-7/meta.json';
import {timeline as emas} from './emas-3-juta/storyboard';
import emasCaptions from './emas-3-juta/captions.json';
import emasLines from './emas-3-juta/lines.json';
import emasMeta from './emas-3-juta/meta.json';
import {timeline as msci} from './msci-standalone/storyboard';
import msciCaptions from './msci-standalone/captions.json';
import msciLines from './msci-standalone/lines.json';
import msciMeta from './msci-standalone/meta.json';
import {ThumbData} from './Thumb';
import {Cue, LineT, Seg} from './WhatIf';

// Daftar video batch. Tambah video baru: buat folder <slug>/ (naskah → storyboard + meta) lalu daftarkan di sini.
export type Video = {slug: string; lines: LineT[]; captions: Cue[]; timeline: (L: (i: number, d?: number) => number) => Seg[]; thumbs: ThumbData};

export const VIDEOS: Video[] = [
  {slug: 'arb-7', lines: arbLines, captions: arbCaptions, timeline: arb, thumbs: arbMeta.thumbs},
  {slug: 'emas-3-juta', lines: emasLines, captions: emasCaptions, timeline: emas, thumbs: emasMeta.thumbs},
  {slug: 'msci-standalone', lines: msciLines, captions: msciCaptions, timeline: msci, thumbs: msciMeta.thumbs},
];
