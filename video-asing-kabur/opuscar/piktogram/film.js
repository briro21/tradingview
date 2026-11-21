// Pictogram Motion cards (OpusCar style "pictogram-motion", engine.js from the library, MIT) for the pesangon video.
// ?scene=austria → narration lines 29–31; ?scene=reaksi → lines 52–54. t = 0 at the first line of each.
// One card per narration beat: a huge title + a second line + mono HUD on the left, one pictogram on a sun disc on the right.
(function () {
  const { W, H, PAL, CREAM, INK, E, clamp, lerp, inv, mix, disc, seg, ring, poly, rrect } = G;
  const SCENE = new URLSearchParams(location.search).get('scene') || 'austria';
  const ACC = '#D0573A';   // the film's shared accent

  // ───────── pictograms (stage frame: origin = disc centre, unit = disc radius R) ─────────
  const P = {};
  P.flag = (c, R, p, col, far) => {           // a flag on a pole, three bands
    seg(c, [-.45 * R, .75 * R], [-.45 * R, -.75 * R], .06 * R, col);
    const w = .95 * R * E.oExp(p * 1.4), wav = k => Math.sin(k * 3 + p * 6) * .03 * R;
    for (let k = 0; k < 3; k++) poly(c, [[-.42 * R, -.7 * R + k * .2 * R], [-.42 * R + w, -.7 * R + k * .2 * R + wav(1)], [-.42 * R + w, -.5 * R + k * .2 * R + wav(1)], [-.42 * R, -.5 * R + k * .2 * R]], k === 1 ? CREAM : ACC);
    rrect(c, -.62 * R, .72 * R, .34 * R, .1 * R, .05 * R, col);
    c.save(); c.font = `900 ${.3 * R}px "Inter Tight"`; c.fillStyle = col; c.globalAlpha = clamp(p * 2 - .6); c.fillText('2003', .05 * R, .5 * R); c.restore();
  };
  P.coinJar = (c, R, p, col, far, t) => {     // a wage card drops a coin into a jar, every month
    rrect(c, -.75 * R, -.55 * R, .7 * R, .42 * R, .06 * R, far);                     // wage slip
    seg(c, [-.66 * R, -.42 * R], [-.2 * R, -.42 * R], .05 * R, col); seg(c, [-.66 * R, -.28 * R], [-.36 * R, -.28 * R], .05 * R, col);
    rrect(c, .02 * R, -.15 * R, .62 * R, .75 * R, .12 * R, col);                     // jar
    rrect(c, .08 * R, -.25 * R, .5 * R, .12 * R, .05 * R, far);
    const n = Math.min(5, Math.floor(p * 6));
    for (let k = 0; k < n; k++) rrect(c, .12 * R, .42 * R - k * .11 * R, .42 * R, .08 * R, .04 * R, G.UMB);
    const u = (p * 6) % 1, y = lerp(-.5 * R, .3 * R - n * .11 * R, E.i3(u)), x = lerp(-.1 * R, .33 * R, E.o3(u));
    if (n < 5) disc(c, x, y, .09 * R, G.UMB);
  };
  P.calendar = (c, R, p, col, far) => {        // month grid; month 2 lit; a person beside an account card
    rrect(c, -.8 * R, -.6 * R, .95 * R, .9 * R, .08 * R, col);
    rrect(c, -.8 * R, -.6 * R, .95 * R, .2 * R, .08 * R, far);
    for (let k = 0; k < 12; k++) { const x = -.72 * R + (k % 4) * .22 * R, y = -.32 * R + Math.floor(k / 4) * .2 * R; rrect(c, x, y, .16 * R, .14 * R, .03 * R, k === 1 && p > .35 ? G.UMB : far); }
    // person
    disc(c, .48 * R, -.42 * R, .12 * R, col); seg(c, [.48 * R, -.25 * R], [.48 * R, .12 * R], .14 * R, col);
    seg(c, [.43 * R, .12 * R], [.38 * R, .55 * R], .1 * R, col); seg(c, [.53 * R, .12 * R], [.58 * R, .55 * R], .1 * R, col);
    const a = E.oExp(clamp(p * 2 - .7));
    rrect(c, .25 * R, .2 * R - (1 - a) * .2 * R, .46 * R, .3 * R, .05 * R, G.UMB); seg(c, [.32 * R, .3 * R], [.6 * R, .3 * R], .04 * R, INK);
  };
  P.growBars = (c, R, p, col, far) => {        // the balance grows bar by bar
    for (let k = 0; k < 6; k++) { const h = (.15 + k * .17) * R * E.oExp(clamp(p * 3 - k * .3)); rrect(c, -.75 * R + k * .26 * R, .65 * R - h, .18 * R, h, .09 * R, k === 5 ? G.UMB : col); }
    seg(c, [-.8 * R, .7 * R], [.85 * R, .7 * R], .05 * R, far);
  };
  P.move = (c, R, p, col, far) => {            // a worker carries the balance from one building to the next
    const bld = (x, cc) => { rrect(c, x - .25 * R, -.35 * R, .5 * R, .9 * R, .05 * R, cc); for (let k = 0; k < 3; k++) rrect(c, x - .15 * R, -.25 * R + k * .25 * R, .3 * R, .12 * R, .03 * R, mix(cc, CREAM, .35)); };
    bld(-.6 * R, far); bld(.6 * R, col);
    const x = lerp(-.3 * R, .3 * R, E.io3(clamp(p * 1.4 - .1))), ph = p * 18;
    disc(c, x, -.15 * R, .09 * R, CREAM); seg(c, [x, -.03 * R], [x, .25 * R], .11 * R, CREAM);
    seg(c, [x, .25 * R], [x - .08 * R + Math.sin(ph) * .06 * R, .52 * R], .08 * R, CREAM); seg(c, [x, .25 * R], [x + .08 * R - Math.sin(ph) * .06 * R, .52 * R], .08 * R, CREAM);
    disc(c, x + .16 * R, .08 * R, .1 * R, G.UMB);
  };
  P.eye = (c, R, p, col, far) => {             // a balance card you can look at any time
    rrect(c, -.75 * R, -.3 * R, 1.1 * R, .66 * R, .08 * R, col);
    c.save(); c.font = `900 ${.22 * R}px "Inter Tight"`; c.fillStyle = INK; c.fillText('SALDO', -.65 * R, -.08 * R); c.fillStyle = G.UMB; c.fillText('€ ✓', -.65 * R, .22 * R); c.restore();
    const a = E.oExp(clamp(p * 2 - .3)); ring(c, .42 * R, .38 * R, .26 * R * a, .09 * R, CREAM); seg(c, [.6 * R, .56 * R], [.6 * R + .22 * R * a, .56 * R + .22 * R * a], .11 * R, CREAM);
  };
  P.invoice = (c, R, p, col, far) => {         // a new bill on the company's desk
    rrect(c, -.5 * R, -.7 * R, .85 * R, 1.25 * R, .06 * R, col);
    for (let k = 0; k < 4; k++) seg(c, [-.36 * R, -.48 * R + k * .2 * R], [(k === 3 ? -.05 : .2) * R, -.48 * R + k * .2 * R], .06 * R, far);
    const a = E.oBack(clamp(p * 2 - .3)); disc(c, .42 * R, .38 * R, .3 * R * a, ACC);
    seg(c, [.42 * R, .26 * R], [.42 * R, .5 * R], .07 * R * a, CREAM); seg(c, [.3 * R, .38 * R], [.54 * R, .38 * R], .07 * R * a, CREAM);
  };
  P.scale = (c, R, p, col, far) => {           // the balance tips, then is levelled again
    const tilt = Math.sin(clamp(p * 1.5) * Math.PI) * .32 * (1 - clamp(p * 2 - 1.2));
    seg(c, [0, -.55 * R], [0, .6 * R], .08 * R, col); rrect(c, -.35 * R, .58 * R, .7 * R, .1 * R, .05 * R, col);
    c.save(); c.translate(0, -.55 * R); c.rotate(tilt);
    seg(c, [-.7 * R, 0], [.7 * R, 0], .07 * R, col);
    for (const [s, cc, lab] of [[-1, ACC, '+'], [1, far, '']]) { c.save(); c.translate(s * .7 * R, 0); c.rotate(-tilt); seg(c, [0, 0], [0, .3 * R], .03 * R, col); poly(c, [[-.25 * R, .3 * R], [.25 * R, .3 * R], [.15 * R, .45 * R], [-.15 * R, .45 * R]], cc); if (lab) { c.font = `900 ${.3 * R}px "Inter Tight"`; c.fillStyle = CREAM; c.textAlign = 'center'; c.fillText(lab, 0, .28 * R); } c.restore(); }
    c.restore(); disc(c, 0, -.55 * R, .07 * R, col);
  };
  P.payHold = (c, R, p, col, far) => {         // the raise arrow stops at a bar
    const a = E.oExp(clamp(p * 2)), top = lerp(.5, -.15, a) * R;
    seg(c, [-.1 * R, .6 * R], [-.1 * R, top], .16 * R, col); poly(c, [[-.32 * R, top], [.12 * R, top], [-.1 * R, top - .25 * R]], col);
    const b = E.oBack(clamp(p * 2.4 - .9)); rrect(c, -.5 * R, -.52 * R, 1.0 * R * b, .14 * R, .07 * R, ACC);
    c.save(); c.font = `900 ${.32 * R}px "Inter Tight"`; c.fillStyle = far; c.fillText('Rp', .25 * R, .45 * R); c.restore();
  };
  P.hire = (c, R, p, col, far) => {            // a door with one chair waiting, a magnifier on the applicant
    rrect(c, -.75 * R, -.6 * R, .5 * R, 1.2 * R, .05 * R, far); disc(c, -.35 * R, .05 * R, .04 * R, col);
    const x = lerp(.6 * R, .25 * R, E.o3(clamp(p * 2)));
    disc(c, x, -.25 * R, .1 * R, col); seg(c, [x, -.1 * R], [x, .25 * R], .13 * R, col); seg(c, [x - .05 * R, .25 * R], [x - .08 * R, .58 * R], .09 * R, col); seg(c, [x + .05 * R, .25 * R], [x + .08 * R, .58 * R], .09 * R, col);
    const a = E.oBack(clamp(p * 2.2 - .8)); ring(c, x - .05 * R, -.05 * R, .3 * R * a, .07 * R, ACC); seg(c, [x + .17 * R, .17 * R], [x + .17 * R + .2 * R * a, .17 * R + .2 * R * a], .09 * R, ACC);
  };
  P.contract = (c, R, p, col, far) => {        // a contract sheet with an end date, a badge from another company
    rrect(c, -.75 * R, -.65 * R, .8 * R, 1.15 * R, .06 * R, col);
    for (let k = 0; k < 4; k++) seg(c, [-.62 * R, -.45 * R + k * .18 * R], [-.15 * R, -.45 * R + k * .18 * R], .05 * R, far);
    const a = E.oBack(clamp(p * 2 - .2)); disc(c, -.35 * R, .3 * R, .14 * R * a, ACC); seg(c, [-.35 * R, .3 * R], [-.35 * R, .21 * R], .04 * R, CREAM); seg(c, [-.35 * R, .3 * R], [-.29 * R, .34 * R], .04 * R, CREAM);
    const b = E.oExp(clamp(p * 2 - .7)), x = .45 * R;
    disc(c, x, -.25 * R, .12 * R * b, col); seg(c, [x, -.08 * R], [x, .3 * R * b], .15 * R * b, col);
    rrect(c, x - .14 * R, .02 * R, .28 * R * b, .18 * R * b, .03 * R, G.UMB);
  };
  P.labour = (c, R, p, col, far) => {          // a shirt and a shoe on a thin margin line
    const a = E.oExp(clamp(p * 2));
    poly(c, [[-.75 * R, -.45 * R], [-.5 * R, -.6 * R], [-.35 * R, -.5 * R], [-.2 * R, -.6 * R], [.05 * R, -.45 * R], [-.05 * R, -.3 * R], [-.15 * R, -.35 * R], [-.15 * R, .15 * R], [-.55 * R, .15 * R], [-.55 * R, -.35 * R], [-.65 * R, -.3 * R]].map(([x, y]) => [x, y + (1 - a) * .4 * R]), col);
    const b = E.oExp(clamp(p * 2 - .4));
    poly(c, [[.15 * R, -.1 * R], [.35 * R, -.1 * R], [.4 * R, .02 * R], [.75 * R, .1 * R], [.78 * R, .2 * R], [.15 * R, .2 * R]].map(([x, y]) => [x + (1 - b) * .4 * R, y]), col);
    rrect(c, .15 * R, .2 * R, .63 * R, .06 * R, .03 * R, far);
    const m = E.oExp(clamp(p * 2.5 - 1.2)); seg(c, [-.8 * R, .5 * R], [-.8 * R + 1.6 * R * m, .5 * R], .03 * R, ACC);
    c.save(); c.globalAlpha = m; c.font = `500 ${.1 * R}px "DM Mono"`; c.fillStyle = CREAM; c.fillText('MARGIN TIPIS', -.8 * R, .66 * R); c.restore();
  };


  // ── UMP 2027 pictograms ──
  P.slip = (c, R, p, col, far) => {            // a pay slip with the new minimum wage
    rrect(c, -.55 * R, -.72 * R, 1.1 * R, 1.4 * R, .06 * R, col);
    rrect(c, -.55 * R, -.72 * R, 1.1 * R, .28 * R, .06 * R, far);
    c.save(); c.font = `900 ${.16 * R}px "Inter Tight"`; c.fillStyle = CREAM; c.fillText('SLIP GAJI', -.45 * R, -.52 * R); c.restore();
    for (let k = 0; k < 3; k++) seg(c, [-.42 * R, -.25 * R + k * .17 * R], [.15 * R, -.25 * R + k * .17 * R], .05 * R, far);
    const a = E.oBack(clamp(p * 2 - .2)); rrect(c, -.45 * R, .3 * R, .9 * R * a, .26 * R, .05 * R, G.UMB);
    c.save(); c.globalAlpha = clamp(a); c.font = `900 ${.2 * R}px "Inter Tight"`; c.fillStyle = INK; c.fillText('Rp6.136.941', -.4 * R, .5 * R); c.restore();
  };
  P.upCoins = (c, R, p, col, far) => {         // coins stack up, an arrow rises
    const n = Math.min(6, Math.floor(p * 9));
    for (let k = 0; k < n; k++) rrect(c, -.55 * R, .5 * R - k * .16 * R, .55 * R, .12 * R, .06 * R, ACC);
    const a = E.oExp(clamp(p * 1.6)), top = lerp(.5, -.6, a) * R;
    seg(c, [.4 * R, .6 * R], [.4 * R, top], .16 * R, col); poly(c, [[.18 * R, top + .05 * R], [.62 * R, top + .05 * R], [.4 * R, top - .22 * R]], col);
  };
  P.island = (c, R, p, col, far) => {          // sun over the sea, a generic island
    const a = E.oExp(clamp(p * 2)); disc(c, .25 * R, -.25 * R, .3 * R * a, G.UMB);
    poly(c, [[-.8 * R, .2 * R], [-.3 * R, -.05 * R], [.1 * R, .2 * R]], col);
    for (let k = 0; k < 3; k++) { c.save(); c.translate(0, .32 * R + k * .16 * R + Math.sin(p * 8 + k) * .02 * R); c.beginPath(); for (let x = -.85; x <= .85; x += .05) c.lineTo(x * R, Math.sin(x * 9 + p * 6) * .03 * R); c.strokeStyle = k ? far : col; c.lineWidth = .06 * R; c.lineCap = 'round'; c.stroke(); c.restore(); }
  };
  P.pin = (c, R, p, col, far) => {             // a map pin dropping onto a region
    const a = E.oBack(clamp(p * 2)), y = lerp(-1.2, -.25, a) * R;
    poly(c, [[-.7 * R, .55 * R], [-.2 * R, .25 * R], [.3 * R, .45 * R], [.75 * R, .2 * R], [.75 * R, .62 * R], [-.7 * R, .7 * R]], far);
    disc(c, 0, y - .12 * R, .3 * R, col); poly(c, [[-.26 * R, y], [.26 * R, y], [0, y + .38 * R]], col); disc(c, 0, y - .12 * R, .12 * R, G.UMB);
  };
  P.tug = (c, R, p, col, far) => {             // two sides pull on the same wage
    const sw = Math.sin(p * 10) * .04 * R;
    seg(c, [-.75 * R + sw, .05 * R], [.75 * R + sw, .05 * R], .04 * R, col);
    for (const [s, cc] of [[-1, col], [1, far]]) { const x = s * .62 * R + sw; disc(c, x, -.35 * R, .1 * R, cc); seg(c, [x, -.22 * R], [x - s * .08 * R, .2 * R], .13 * R, cc); seg(c, [x - s * .08 * R, .2 * R], [x - s * .2 * R, .55 * R], .09 * R, cc); seg(c, [x - s * .08 * R, .2 * R], [x + s * .08 * R, .55 * R], .09 * R, cc); seg(c, [x, -.1 * R], [x - s * .2 * R, .05 * R], .07 * R, cc); }
    disc(c, sw, .05 * R, .16 * R, G.UMB); c.save(); c.font = `900 ${.14 * R}px "Inter Tight"`; c.fillStyle = INK; c.textAlign = 'center'; c.fillText('Rp', sw, .1 * R); c.restore();
  };
  P.twoBars = (c, R, p, col, far) => {         // new and old wages both adjusted
    const a = E.oExp(clamp(p * 2)), b = E.oExp(clamp(p * 2 - .5));
    rrect(c, -.6 * R, .6 * R - (.45 + .25 * a) * R, .45 * R, (.45 + .25 * a) * R, .08 * R, col);
    rrect(c, .1 * R, .6 * R - (.75 + .2 * b) * R, .45 * R, (.75 + .2 * b) * R, .08 * R, G.UMB);
    seg(c, [-.75 * R, .65 * R], [.75 * R, .65 * R], .05 * R, far);
    c.save(); c.font = `500 ${.1 * R}px "DM Mono"`; c.fillStyle = CREAM; c.fillText('BARU', -.58 * R, .82 * R); c.fillText('LAMA', .12 * R, .82 * R); c.restore();
  };
  P.twoArrows = (c, R, p, col, far) => {       // labour cost rises from two sides
    rrect(c, -.3 * R, -.1 * R, .6 * R, .6 * R, .06 * R, col);
    c.save(); c.font = `900 ${.18 * R}px "Inter Tight"`; c.fillStyle = CREAM; c.textAlign = 'center'; c.fillText('BIAYA', 0, .25 * R); c.restore();
    const a = E.oExp(clamp(p * 2)), b = E.oExp(clamp(p * 2 - .4));
    seg(c, [-.85 * R, -.55 * R], [lerp(-.85, -.38, a) * R, lerp(-.55, -.18, a) * R], .1 * R, G.UMB);
    seg(c, [.85 * R, -.55 * R], [lerp(.85, .38, b) * R, lerp(-.55, -.18, b) * R], .1 * R, ACC);
    c.save(); c.font = `500 ${.1 * R}px "DM Mono"`; c.fillStyle = col; c.fillText('UMP', -.85 * R, -.65 * R); c.textAlign = 'right'; c.fillText('PESANGON', .85 * R, -.65 * R); c.restore();
  };

  // ───────── the two scenes: [start, hue, title, second line, meta, pictogram] ─────────
  const SCENES = {
    umpHook: { dur: 23.45, tag: 'UPAH MINIMUM 2027', cards: [
      [0, 'coral', 'JAKARTA', 'UMP 2027: Rp6.136.941', 'MULAI JANUARI', 'slip'],
      [6.29, 'yellow', '+RP407 RB', 'naik 7,1% dari 2026', 'KENAIKAN', 'upCoins'],
      [10.53, 'teal', 'BALI +42%', 'dari Rp3,2 juta ke Rp4,6 juta', 'TERTINGGI', 'island'],
      [13.88, 'sky', 'JABAR +29%', 'menjadi Rp3 juta', 'JAWA BARAT', 'pin'],
      [17.46, 'navy', 'DITOLAK', 'buruh menolak, pengusaha keberatan', 'DUA PIHAK', 'tug'],
    ] },
    umpSkenario: { dur: 49.69, tag: 'SETELAH UMP NAIK', cards: [
      [0, 'teal', 'PATUH', 'gaji baru & lama disesuaikan', 'SKENARIO 1', 'twoBars'],
      [11.43, 'navy', 'TAHAN BIAYA', 'Apindo ingatkan soal efisiensi', 'SKENARIO 2', 'scale'],
      [18.14, 'sky', 'KONTRAK & MESIN', 'rekrutmen lebih sedikit', 'SKENARIO 2', 'contract'],
      [24.15, 'coral', 'PADAT KARYA', 'tekstil & alas kaki paling rentan', 'SKENARIO 2', 'labour'],
      [30.2, 'yellow', 'DUA ARAH', 'UMP naik + dana cadangan pesangon', 'BIAYA PEKERJA', 'twoArrows'],
      [39.38, 'ink', 'BISA BERUBAH', 'gugatan & upah sektoral masih dibahas', 'SKENARIO 3', 'tug'],
    ] },
    austria: { dur: 24.99, tag: 'BELAJAR DARI AUSTRIA', cards: [
      [0, 'coral', 'AUSTRIA', 'sistem pesangon baru sejak 2003', 'ABFERTIGUNG NEU', 'flag'],
      [4.3, 'yellow', '1,53%', 'dari gaji, disetor tiap bulan', 'OLEH PERUSAHAAN', 'coinJar'],
      [9.4, 'teal', 'BULAN KE-2', 'mulai disetor, atas nama pekerja', 'REKENING PRIBADI', 'calendar'],
      [13.97, 'sky', 'SALDO NAIK', 'terus bertambah', 'SETIAP BULAN', 'growBars'],
      [17.36, 'navy', 'PINDAH KERJA', 'saldonya ikut, tidak hilang', 'SALDO TETAP ADA', 'move'],
      [20.68, 'ink', 'TAHU HAKNYA', 'tanpa menunggu bangkrut', 'BISA DICEK', 'eye'],
    ] },
    reaksi: { dur: 27.44, tag: 'SKENARIO 3 · KEMUNGKINAN', cards: [
      [0, 'coral', 'BIAYA BARU', 'setoran baru bagi perusahaan', 'SKENARIO 3', 'invoice'],
      [3.26, 'navy', 'DISEIMBANGKAN', 'perusahaan mencari cara', 'BIAYA NAIK', 'scale'],
      [8.25, 'yellow', 'GAJI DITAHAN', 'kenaikan gaji bisa ditahan', 'KEMUNGKINAN 1', 'payHold'],
      [11.46, 'teal', 'REKRUT HATI-HATI', 'perekrutan lebih selektif', 'KEMUNGKINAN 2', 'hire'],
      [14.81, 'sky', 'KONTRAK', 'lebih banyak kontrak & alih daya', 'KEMUNGKINAN 3', 'contract'],
      [18.24, 'coral', 'PADAT KARYA', 'tekstil & alas kaki paling terasa', 'MARGIN TIPIS', 'labour'],
    ] },
  };
  const S = SCENES[SCENE], N = S.cards.length;
  const cardAt = t => { let i = 0; while (i < N - 1 && t >= S.cards[i + 1][0]) i++; return i; };
  const cardEnd = i => i < N - 1 ? S.cards[i + 1][0] : S.dur;

  const bufs = [G.canvas(), G.canvas()];
  function fitFont(c, text, maxW, px) { c.font = G.F.en(900, px); const w = c.measureText(text).width; return w > maxW ? Math.floor(px * maxW / w) : px; }
  function drawCard(c, i, t) {
    const [t0, hk, title, line2, meta, pic] = S.cards[i], Pl = PAL[hk], u = t - t0, fg = Pl.fg;
    const pat = G.pattern(hk, 11 + i * 7, { spread: .32, density: .45, set: hk === 'yellow' || hk === 'coral' ? 'sun' : 'rain' });
    G.drawPattern(c, pat, j => (j % 2 ? 1 : -1) * (u * 26 + j * 37));
    // left column wash so the type sits on a quiet ground
    c.fillStyle = G.rgba(Pl.t[1], .72); c.fillRect(0, 0, 980, H);
    // stage: sun disc + light sweep + the pictogram, assembled in sliding bands
    const cx = 1430, cy = 480, R = 330, a = E.oExp(clamp(u / .45));
    disc(c, cx, cy, R * a, Pl.t[3]);
    c.save(); c.beginPath(); c.arc(cx, cy, R * a, 0, Math.PI * 2); c.clip();
    c.fillStyle = 'rgba(255,255,255,.07)'; c.beginPath(); c.moveTo(cx - R + u * 40 % 400, cy - R); c.lineTo(cx - R + 160 + u * 40 % 400, cy - R); c.lineTo(cx - R - 200 + u * 40 % 400, cy + R); c.lineTo(cx - R - 360 + u * 40 % 400, cy + R); c.fill();
    c.restore();
    const BANDS = 6, pin = clamp((u - .12) / .5);
    for (let b = 0; b < BANDS; b++) {
      const off = (1 - E.oExp(clamp(pin * 1.6 - b * .1))) * 600 * (b % 2 ? 1 : -1);
      c.save(); c.beginPath(); c.rect(cx - R * 1.2, cy - R + b * 2 * R / BANDS, R * 2.4, 2 * R / BANDS + 1); c.clip();
      c.translate(cx + off, cy); P[pic](c, R * .82, clamp((u - .3) / Math.max(1.2, (cardEnd(i) - t0) * .7)), hk === 'ink' ? CREAM : (hk === 'yellow' || hk === 'sky' ? INK : CREAM), Pl.t[1], t);
      c.restore();
    }
    // type: title slides up, then the second line, then the tag; HUD in the corners
    const X = 130, px = fitFont(c, title, 800, 200);
    G.maskText(c, title, X, 560, G.F.en(900, px), fg, u / .5, { ls: '-4px' });
    G.maskText(c, line2, X + 4, 640, G.F.en(700, 46), fg, (u - .1) / .5);
    G.typeText(c, meta, X + 4, 230, G.F.mono(24), fg, (u - .05) / .5, { ls: '4px' });
    G.hair(c, X + 4, 250, 360, fg, E.oExp(clamp((u - .05) / .5)), 2);
    G.typeText(c, S.tag, X + 4, 140, G.F.mono(20), G.rgba(fg, .7) === undefined ? fg : fg, 1, { ls: '3px' });
    // progress ticks: N ticks, current tall
    for (let k = 0; k < N; k++) { const on = k === i, done = k < i; c.fillStyle = on ? fg : G.rgba(fg.length === 7 ? fg : CREAM, done ? .55 : .22); c.fillRect(X + 4 + k * 34, on ? 694 : 702, 24, on ? 22 : 8); }
    G.typeText(c, String(i + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0'), X + 4 + N * 34 + 14, 716, G.F.mono(22), fg, 1, { ls: '3px' });
  }
  // grid transition: the next card's rows slide in from alternating sides over ~0.35 s
  window.render = function (t) {
    const c = document.getElementById('c').getContext('2d');
    const i = cardAt(t), t0 = S.cards[i][0], tr = i > 0 ? clamp((t - t0) / .38) : 1;
    if (tr >= 1) { c.setTransform(1, 0, 0, 1, 0, 0); drawCard(c, i, t); return; }
    const A = bufs[0].getContext('2d'), B = bufs[1].getContext('2d');
    drawCard(A, i - 1, t); drawCard(B, i, t);
    c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(bufs[0], 0, 0);
    const rows = 6, rh = H / rows;
    for (let r = 0; r < rows; r++) {
      const e = E.ioExp(clamp(tr * 1.5 - r * .08)), dx = (1 - e) * W * (r % 2 ? 1 : -1);
      c.drawImage(bufs[1], 0, r * rh, W, rh + 1, dx, r * rh, W, rh + 1);
    }
  };
  window.DUR = S.dur;
})();
