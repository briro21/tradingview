const Q = new URLSearchParams(location.search);
const cv = document.getElementById('c'), g = cv.getContext('2d');
await Promise.all([400, 500, 600, 700].map(w => document.fonts.load(`${w} 40px Newsreader`)));
const film = await import('./film.js');
window.DUR = film.DUR;
window.render = t => { g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; film.render(g, t, Q); };
window.READY = true;
