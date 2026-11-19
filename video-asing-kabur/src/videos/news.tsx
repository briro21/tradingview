import {AbsoluteFill, interpolate} from 'remotion';
import {Abs, Pop, usePop, useSec} from '../pasar-hijau/lib';
import {fmt, ramp} from '../rupiah/scenes';
import {C, FONT} from '../theme';
import {Thumb, ThumbData} from './Thumb';

// Adegan gaya "explainer berita": ritme cepat, latar kertas/gelap yang selalu hidup, teks menghantam pada kata narasi.
const PAPER = '#f4efe6';
const INK = '#141414';
const DARK = '#10131c';

type Word = {t: string; at: number; color?: string; size?: number};

// Latar yang tidak pernah diam: grid bergeser + kata kunci raksasa samar + bintik grain.
export const Stage: React.FC<{dark?: boolean; mark?: string; children?: React.ReactNode}> = ({dark, mark, children}) => {
  const sec = useSec();
  const line = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
  return (
    <AbsoluteFill style={{background: dark ? DARK : PAPER, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${line} 2px, transparent 2px), linear-gradient(90deg, ${line} 2px, transparent 2px)`,
          backgroundSize: '80px 80px',
          backgroundPosition: `${(sec * 12) % 80}px ${(sec * 6) % 80}px`,
        }}
      />
      {mark ? (
        <div style={{position: 'absolute', left: -200 + ((sec * 25) % 400), top: 360, fontFamily: FONT, fontWeight: 900, fontSize: 420, whiteSpace: 'nowrap', color: dark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.045)', letterSpacing: -10}}>
          {mark} {mark}
        </div>
      ) : null}
      <AbsoluteFill style={{background: dark ? 'radial-gradient(circle at 50% 45%, rgba(255,75,62,0.18), transparent 60%)' : 'radial-gradient(circle at 50% 45%, rgba(255,75,62,0.10), transparent 60%)'}} />
      {children}
    </AbsoluteFill>
  );
};

// Frame 0 = thumbnail (skala 1080p), dengan dorongan kamera pelan dan "napas".
export const Cover: React.FC<{data: ThumbData}> = ({data}) => {
  const sec = useSec();
  const s = 1.5 * (1 + 0.008 * sec + 0.003 * Math.sin(sec * 3));
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 960, top: 540, width: 1280, height: 720, transform: `translate(-50%, -50%) scale(${s})`}}>
        <Thumb data={data} variant={1} />
      </div>
    </AbsoluteFill>
  );
};

// Kata kinetik: tiap kata menghantam di tengah; kata terbaru di chip merah, kata lama naik dan mengecil.
export const Kinetic: React.FC<{words: Word[]; dark?: boolean; mark?: string}> = ({words, dark, mark}) => {
  const sec = useSec();
  const shown = words.filter((w) => sec >= w.at - 0.05);
  const last = shown.length - 1;
  return (
    <Stage dark={dark} mark={mark}>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 18, padding: '0 120px'}}>
        {shown.slice(-4).map((w, k, arr) => {
          const isLast = k === arr.length - 1;
          return <KWord key={`${w.t}-${w.at}`} w={w} active={isLast && last >= 0} dark={dark} />;
        })}
      </AbsoluteFill>
    </Stage>
  );
};

const KWord: React.FC<{w: Word; active: boolean; dark?: boolean}> = ({w, active, dark}) => {
  const p = usePop(w.at, 9);
  const sec = useSec();
  const shake = sec - w.at < 0.25 ? Math.sin((sec - w.at) * 90) * 10 * (1 - (sec - w.at) / 0.25) : 0;
  const base = dark ? '#fff' : INK;
  const color = w.color ?? (active ? '#fff' : base);
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: (w.size ?? 110) * (active ? 1 : 0.62),
        lineHeight: 1.05,
        textAlign: 'center',
        color,
        background: active && !w.color ? C.red : 'transparent',
        padding: active && !w.color ? '6px 28px' : 0,
        borderRadius: 14,
        transform: `translateX(${shake}px) scale(${0.6 + 0.4 * p})`,
        opacity: Math.min(1, p * 1.5) * (active ? 1 : 0.55),
        textTransform: 'uppercase',
        letterSpacing: -1,
      }}
    >
      {w.t}
    </div>
  );
};

// Angka besar yang berputar dari `from` ke `to`.
export const Counter: React.FC<{from: number; to: number; at: number; dur?: number; label: string; prefix?: string; suffix?: string; decimals?: number; color?: string; sub?: Word; dark?: boolean; mark?: string}> = ({
  from,
  to,
  at,
  dur = 1.6,
  label,
  prefix = '',
  suffix = '',
  decimals = 0,
  color = C.red,
  sub,
  dark,
  mark,
}) => {
  const sec = useSec();
  const k = ramp(sec, at, at + dur);
  const v = from + (to - from) * (1 - Math.pow(1 - k, 3));
  const txt = decimals ? v.toFixed(decimals).replace('.', ',') : fmt(Math.round(v));
  const landed = sec > at + dur;
  const pending = sec < at - 0.05;
  const bump = landed ? 1 + 0.06 * Math.max(0, 1 - (sec - at - dur) * 4) : 1;
  return (
    <Stage dark={dark} mark={mark}>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10}}>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 54, color: dark ? '#cfd3dc' : '#555', letterSpacing: 2, textTransform: 'uppercase'}}>{label}</div>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: Math.min(260, 1700 / (prefix.length + txt.length + suffix.length + 1)), color, transform: `scale(${bump})`, letterSpacing: -4}}>
          {pending ? '…' : `${prefix}${txt}${suffix}`}
        </div>
        <div style={{width: 900, height: 14, background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', borderRadius: 7, overflow: 'hidden'}}>
          <div style={{width: `${k * 100}%`, height: '100%', background: color}} />
        </div>
        {sub ? (
          <Pop at={sub.at}>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: sub.size ?? 56, color: sub.color ?? (dark ? '#fff' : INK), marginTop: 26, textAlign: 'center', maxWidth: 1500}}>{sub.t}</div>
          </Pop>
        ) : null}
      </AbsoluteFill>
    </Stage>
  );
};

// Terminal perdagangan yang membeku: jam berjalan lalu berhenti di 08:58:00, banner TRADING HALT menghantam.
export const Halt: React.FC<{at: number; clockFrom?: number}> = ({at, clockFrom = 3}) => {
  const sec = useSec();
  const frozen = sec >= at;
  const tSec = frozen ? 0 : Math.max(0, Math.round((at - sec) * 4));
  const clock = frozen ? '08:58:00' : `08:57:${String(60 - Math.min(59, tSec % 60 || clockFrom)).padStart(2, '0')}`;
  const rows = ['BBCA', 'BBRI', 'BMRI', 'TLKM', 'ASII', 'BBNI', 'AMMN', 'BREN'];
  const p = usePop(at, 8);
  const shake = frozen && sec - at < 0.4 ? Math.sin((sec - at) * 80) * 14 : 0;
  return (
    <AbsoluteFill style={{background: '#06080d', transform: `translateX(${shake}px)`}}>
      <Abs x={160} y={120}>
        <div style={{width: 1600, height: 840, borderRadius: 24, border: '4px solid #263043', background: '#0b0f18', padding: 40, fontFamily: '"Courier New", monospace', color: '#cfd8e6'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 40, fontWeight: 700, color: '#7fb2ff'}}>
            <span>JATS · BURSA EFEK INDONESIA</span>
            <span style={{color: frozen ? C.red : '#7fb2ff'}}>{clock}</span>
          </div>
          {rows.map((r, i) => {
            const chg = -(3 + ((i * 37) % 50) / 10 + (frozen ? 0 : Math.sin(sec * 7 + i) * 0.4));
            return (
              <div key={r} style={{display: 'flex', justifyContent: 'space-between', fontSize: 48, marginTop: 22, opacity: frozen ? 0.35 : 1}}>
                <span>{r}</span>
                <span style={{color: C.red}}>▼ {chg.toFixed(2).replace('.', ',')}%</span>
              </div>
            );
          })}
        </div>
      </Abs>
      {frozen ? (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
          <div style={{transform: `scale(${0.5 + 0.5 * p}) rotate(-4deg)`, background: C.red, color: '#fff', fontFamily: FONT, fontWeight: 900, fontSize: 170, padding: '20px 70px', border: '10px solid #fff', boxShadow: '0 30px 80px rgba(0,0,0,0.6)'}}>
            TRADING HALT
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

// Garis waktu horizontal; tiap titik muncul pada kata narasinya.
export const Timeline: React.FC<{items: {date: string; text: string; at: number; color?: string}[]; title?: Word; dark?: boolean}> = ({items, title, dark}) => {
  const sec = useSec();
  const n = items.length;
  const W = 1640;
  const shown = items.filter((x) => sec >= x.at).length;
  const prog = n <= 1 ? 1 : Math.min(1, Math.max(0, shown - 1) / (n - 1) + ramp(sec, items[Math.min(shown, n - 1)].at - 0.6, items[Math.min(shown, n - 1)].at) / (n - 1));
  return (
    <Stage dark={dark} mark="2026">
      {title ? (
        <Abs x={0} y={110} style={{width: 1920, textAlign: 'center'}}>
          <Pop at={title.at}>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: title.size ?? 80, color: title.color ?? (dark ? '#fff' : INK)}}>{title.t}</div>
          </Pop>
        </Abs>
      ) : null}
      <Abs x={140} y={560}>
        <div style={{position: 'relative', width: W, height: 12, background: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)', borderRadius: 6}}>
          <div style={{width: `${prog * 100}%`, height: '100%', background: C.red, borderRadius: 6}} />
          {items.map((it, i) => {
            const x = n === 1 ? W / 2 : (i / (n - 1)) * W;
            const up = i % 2 === 0;
            return sec >= it.at - 0.05 ? (
              <div key={it.date} style={{position: 'absolute', left: x, top: 6}}>
                <Pop at={it.at}>
                  <div style={{position: 'absolute', left: -22, top: -22, width: 44, height: 44, borderRadius: 22, background: it.color ?? C.red, border: `6px solid ${dark ? DARK : PAPER}`}} />
                  <div style={{position: 'absolute', left: i === 0 && n > 1 ? -40 : i === n - 1 && n > 1 ? -300 : -170, width: 340, top: up ? -250 : 50, textAlign: 'center', fontFamily: FONT, fontWeight: 900}}>
                    <div style={{fontSize: 40, color: it.color ?? C.red}}>{it.date}</div>
                    <div style={{fontSize: 34, color: dark ? '#fff' : INK, lineHeight: 1.15, marginTop: 6}}>{it.text}</div>
                  </div>
                </Pop>
              </div>
            ) : null;
          })}
        </div>
      </Abs>
    </Stage>
  );
};

// Tumpukan headline berita yang menghantam satu per satu.
export const Headlines: React.FC<{items: {src: string; text: string; at: number}[]; dark?: boolean; mark?: string}> = ({items, dark, mark}) => {
  const sec = useSec();
  return (
    <Stage dark={dark} mark={mark}>
      {items.map((h, i) => {
        if (sec < h.at - 0.05) return null;
        const rot = ((i * 37) % 9) - 4;
        return (
          <Abs key={h.text} x={260 + ((i * 97) % 260)} y={150 + i * 175}>
            <Pop at={h.at}>
              <div style={{width: 1300, background: '#fff', border: `5px solid ${INK}`, borderLeft: `22px solid ${C.red}`, padding: '22px 34px', transform: `rotate(${rot * 0.6}deg)`, boxShadow: '0 18px 40px rgba(0,0,0,0.25)', fontFamily: FONT}}>
                <div style={{fontSize: 28, fontWeight: 900, color: C.red, letterSpacing: 2}}>{h.src}</div>
                <div style={{fontSize: 50, fontWeight: 900, color: INK, lineHeight: 1.1, marginTop: 4}}>{h.text}</div>
              </div>
            </Pop>
          </Abs>
        );
      })}
    </Stage>
  );
};

// Batang peringkat (mis. kinerja bursa); batang bertumbuh pada kata narasi.
export const Ranking: React.FC<{rows: {name: string; v: number; at: number; hl?: boolean}[]; title: Word; unit?: string; max?: number; dark?: boolean}> = ({rows, title, unit = '%', max, dark}) => {
  const sec = useSec();
  const m = max ?? Math.max(...rows.map((r) => Math.abs(r.v)));
  return (
    <Stage dark={dark}>
      <Abs x={0} y={110} style={{width: 1920, textAlign: 'center'}}>
        <Pop at={title.at}>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: title.size ?? 76, color: title.color ?? (dark ? '#fff' : INK)}}>{title.t}</div>
        </Pop>
      </Abs>
      {rows.map((r, i) => {
        const k = ramp(sec, r.at, r.at + 1.1);
        const w = (Math.abs(r.v) / m) * 1100 * (1 - Math.pow(1 - k, 3));
        return sec >= r.at - 0.05 ? (
          <Abs key={r.name} x={180} y={300 + i * 170}>
            <div style={{display: 'flex', alignItems: 'center', gap: 30, fontFamily: FONT, fontWeight: 900}}>
              <div style={{width: 360, fontSize: 52, color: dark ? '#fff' : INK, textAlign: 'right'}}>{r.name}</div>
              <div style={{width: w, height: 110, background: r.hl ? C.red : '#9aa3b8', borderRadius: 12}} />
              <div style={{fontSize: 64, color: r.hl ? C.red : dark ? '#cfd3dc' : '#555'}}>
                {(r.v * k).toFixed(r.v % 1 ? 1 : 0).replace('.', ',')}
                {unit}
              </div>
            </div>
          </Abs>
        ) : null;
      })}
    </Stage>
  );
};

// Aliran uang: dana indeks global "mengikuti daftar"; panah koin mengalir masuk/keluar.
export const Flow: React.FC<{at: number; out?: boolean; left: string; right: string; label: Word; dark?: boolean}> = ({at, out, left, right, label, dark}) => {
  const sec = useSec();
  const on = sec >= at;
  return (
    <Stage dark={dark} mark="MSCI">
      {[
        {x: 160, t: left},
        {x: 1240, t: right},
      ].map((b) => (
        <Abs key={b.t} x={b.x} y={380}>
          <div style={{width: 520, height: 300, borderRadius: 30, background: '#fff', border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 58, color: INK, padding: 30, boxShadow: '0 20px 50px rgba(0,0,0,0.2)'}}>{b.t}</div>
        </Abs>
      ))}
      {on
        ? Array.from({length: 7}, (_, i) => {
            const t = ((sec - at) * 0.8 + i / 7) % 1;
            const x = out ? interpolate(t, [0, 1], [700, 1220]) : interpolate(t, [0, 1], [1220, 700]);
            const y = 520 + Math.sin(t * Math.PI) * -120 + (i % 3) * 10;
            return (
              <Abs key={i} x={x} y={y}>
                <div style={{fontSize: 70, opacity: Math.sin(t * Math.PI)}}>💵</div>
              </Abs>
            );
          })
        : null}
      <Abs x={0} y={800} style={{width: 1920, textAlign: 'center'}}>
        <Pop at={label.at}>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: label.size ?? 64, color: label.color ?? (out ? C.red : C.green)}}>{label.t}</div>
        </Pop>
      </Abs>
    </Stage>
  );
};

// Kartu bagian bernomor: slab merah, angka raksasa melayang, judul naik.
export const Part: React.FC<{n: number; title: string; at: number}> = ({n, title, at}) => {
  const sec = useSec();
  const p = usePop(at, 12);
  return (
    <AbsoluteFill style={{background: C.red, overflow: 'hidden'}}>
      <div style={{position: 'absolute', right: -60 + (sec - at) * 30, top: -120, fontFamily: FONT, fontWeight: 900, fontSize: 900, color: 'rgba(255,255,255,0.14)', lineHeight: 1}}>{n}</div>
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 160px'}}>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 60, color: 'rgba(255,255,255,0.85)', letterSpacing: 6, transform: `translateY(${(1 - p) * 40}px)`, opacity: p}}>BAGIAN {n}</div>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 120, color: '#fff', lineHeight: 1.05, maxWidth: 1500, transform: `translateY(${(1 - p) * 80}px)`, opacity: p}}>{title}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Peta Jawa sederhana: Ujung Kulon (barat), Alas Purwo (timur), Anak Krakatau; jalur relokasi digambar dan badak berjalan.
const JAVA = 'M210,536 L260,432 L330,380 L420,393 L520,354 L640,380 L760,419 L880,432 L1000,484 L1120,505 L1240,536 L1360,562 L1480,601 L1600,640 L1700,692 L1725,770 L1680,809 L1560,783 L1440,770 L1320,744 L1200,723 L1080,713 L960,697 L840,679 L720,653 L600,640 L480,614 L360,601 L260,614 L215,601 Z';
export const JavaMap: React.FC<{routeAt?: number; waveAt?: number; title?: Word; labels?: {ujung?: number; alas?: number; krakatau?: number}}> = ({routeAt, waveAt, title, labels = {}}) => {
  const sec = useSec();
  const k = routeAt === undefined ? 0 : ramp(sec, routeAt, routeAt + 3);
  const A = {x: 225, y: 575};
  const B = {x: 1690, y: 690};
  const bx = A.x + (B.x - A.x) * k;
  const by = A.y + (B.y - A.y) * k - Math.sin(k * Math.PI) * 160;
  const pin = (x: number, y: number, name: string, at: number | undefined, color: string, up = true) =>
    at === undefined || sec < at - 0.05 ? null : (
      <Abs key={name} x={x - 200} y={up ? y - 150 : y + 40} style={{width: 400, textAlign: 'center'}}>
        <Pop at={at}>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color, background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, padding: '6px 14px', display: 'inline-block'}}>{name}</div>
        </Pop>
      </Abs>
    );
  return (
    <Stage mark="JAWA">
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <path d={JAVA} fill="#cfe3b4" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <circle cx={150} cy={380} r={22} fill="#7a5a3c" stroke={INK} strokeWidth={5} />
        {waveAt !== undefined && sec >= waveAt
          ? [0, 1, 2].map((i) => {
              const t = ((sec - waveAt) * 0.7 + i / 3) % 1;
              return <circle key={i} cx={150} cy={380} r={30 + t * 220} fill="none" stroke="#3b7be0" strokeWidth={8} opacity={1 - t} />;
            })
          : null}
        {routeAt !== undefined && sec >= routeAt ? (
          <path d={`M${A.x},${A.y} Q${(A.x + B.x) / 2},${A.y - 320} ${B.x},${B.y}`} fill="none" stroke={C.red} strokeWidth={8} opacity={0.9} pathLength={1} strokeDasharray={`${k} 1`} />
        ) : null}
        <circle cx={A.x} cy={A.y} r={18} fill={C.green} stroke={INK} strokeWidth={5} />
        <circle cx={B.x} cy={B.y} r={18} fill={C.yellow} stroke={INK} strokeWidth={5} />
      </svg>
      {routeAt !== undefined && sec >= routeAt ? (
        <Abs x={bx - 50} y={by - 110}>
          <div style={{fontSize: 100, transform: `scaleX(-1) translateY(${Math.sin(sec * 10) * 4}px)`}}>🦏</div>
        </Abs>
      ) : null}
      {pin(A.x + 120, A.y + 60, 'Ujung Kulon', labels.ujung, '#2e7d32', false)}
      {pin(B.x - 120, B.y + 30, 'Alas Purwo', labels.alas, '#b7791f', false)}
      {pin(330, 380, 'Anak Krakatau', labels.krakatau, '#7a5a3c')}
      {title ? (
        <Abs x={0} y={90} style={{width: 1920, textAlign: 'center'}}>
          <Pop at={title.at}>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: title.size ?? 72, color: title.color ?? INK}}>{title.t}</div>
          </Pop>
        </Abs>
      ) : null}
    </Stage>
  );
};
