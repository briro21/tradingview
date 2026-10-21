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
import {timeline as dana} from './danantara/storyboard';
import danaCaptions from './danantara/captions.json';
import danaLines from './danantara/lines.json';
import danaMeta from './danantara/meta.json';
import {timeline as birate} from './bi-rate-7/storyboard';
import birateCaptions from './bi-rate-7/captions.json';
import birateLines from './bi-rate-7/lines.json';
import birateMeta from './bi-rate-7/meta.json';
import {timeline as bank} from './bank-bangkrut/storyboard';
import bankCaptions from './bank-bangkrut/captions.json';
import bankLines from './bank-bangkrut/lines.json';
import bankMeta from './bank-bangkrut/meta.json';
import {ThumbData} from './Thumb';
import {Cue, durationOf, LineT, makeL, Seg, WhatIf} from './WhatIf';

// Daftar video batch. Tambah video baru: buat folder <slug>/ (naskah → storyboard + meta) lalu daftarkan di sini.
export type Video = {slug: string; lines: LineT[]; captions: Cue[]; timeline: (L: (i: number, d?: number) => number) => Seg[]; thumbs: ThumbData};

export const VIDEOS: Video[] = [
  {slug: 'arb-7', lines: arbLines, captions: arbCaptions, timeline: arb, thumbs: arbMeta.thumbs},
  {slug: 'emas-3-juta', lines: emasLines, captions: emasCaptions, timeline: emas, thumbs: emasMeta.thumbs},
  {slug: 'msci-standalone', lines: msciLines, captions: msciCaptions, timeline: msci, thumbs: msciMeta.thumbs},
  {slug: 'danantara', lines: danaLines, captions: danaCaptions, timeline: dana, thumbs: danaMeta.thumbs},
  {slug: 'bi-rate-7', lines: birateLines, captions: birateCaptions, timeline: birate, thumbs: birateMeta.thumbs},
  {slug: 'bank-bangkrut', lines: bankLines, captions: bankCaptions, timeline: bank, thumbs: bankMeta.thumbs},
];

// Komposisi hanya menerima slug (props Remotion harus bisa di-JSON-kan); storyboard dicari di sini.
export const WhatIfBySlug: React.FC<{slug: string}> = ({slug}) => {
  const v = VIDEOS.find((x) => x.slug === slug)!;
  return <WhatIf timeline={v.timeline(makeL(v.lines))} captions={v.captions} audio={`vo_${v.slug}.mp3`} duration={durationOf(v.lines)} />;
};
