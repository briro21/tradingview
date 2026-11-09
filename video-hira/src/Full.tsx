import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, staticFile, interpolate, spring, random, useCurrentFrame, useVideoConfig} from 'remotion';
import full from './full.json';
import {Rewind} from './Scenes2D';
import {Grain, Vignette, Dust, LowerThird} from './fx';
import {FPS} from './Root';

type Spec = {k: string; n?: any; m?: string; fx?: string; z?: number; c?: string};
const fr = (s: number) => Math.max(1, Math.round(s * FPS));
const FONT = 'Impact, "Arial Black", "DejaVu Sans", sans-serif';
const has = (fx: string, tag: string) => fx.split(',').some((t) => t === tag || t.startsWith(tag + ':'));
const arg = (fx: string, tag: string) => (fx.split(',').find((t) => t.startsWith(tag + ':')) || '').slice(tag.length + 1);

const Black = () => <AbsoluteFill style={{background: '#000'}} />;

// ---- overlays -------------------------------------------------------------
const Overlays: React.FC<{fx: string}> = ({fx}) => {
  const f = useCurrentFrame();
  const {durationInFrames: D} = useVideoConfig();
  const p = f / D;
  const o: React.ReactNode[] = [];
  if (has(fx, 'dust')) o.push(<Dust key="d" n={36} color="255,225,180" seed={'d' + D} speed={0.3} size={2.5} />);
  if (has(fx, 'smoke')) o.push(<AbsoluteFill key="sm" style={{background: `radial-gradient(ellipse at ${30 + 40 * p}% 80%, rgba(220,200,180,.28), transparent 60%)`, mixBlendMode: 'screen'}} />);
  if (has(fx, 'heat')) o.push(<AbsoluteFill key="h" style={{background: 'linear-gradient(180deg, rgba(255,190,120,.18), transparent 50%)', mixBlendMode: 'screen'}} />);
  if (has(fx, 'red') || has(fx, 'redgrade')) o.push(<AbsoluteFill key="r" style={{background: 'rgba(160,10,10,.32)', mixBlendMode: 'multiply'}} />);
  if (has(fx, 'gold')) o.push(<AbsoluteFill key="g" style={{background: 'radial-gradient(ellipse at 50% 40%, rgba(255,190,90,.28), transparent 70%)', mixBlendMode: 'screen'}} />);
  if (has(fx, 'blue')) o.push(<AbsoluteFill key="b" style={{background: 'rgba(60,90,170,.18)', mixBlendMode: 'multiply'}} />);
  if (has(fx, 'vig')) o.push(<Vignette key="v" strength={0.8} color="0,0,0" />);
  if (has(fx, 'soft')) o.push(<AbsoluteFill key="so" style={{backdropFilter: 'blur(1.5px)', background: 'rgba(255,235,210,.1)'}} />);
  if (has(fx, 'flick')) o.push(<AbsoluteFill key="fl" style={{background: '#000', opacity: 0.12 + 0.1 * Math.sin(f * 1.7) + 0.08 * random('fl' + f)}} />);
  if (has(fx, 'fire')) o.push(<AbsoluteFill key="fi" style={{background: `radial-gradient(ellipse at 50% 100%, rgba(255,120,30,${0.2 + 0.12 * Math.sin(f * 0.9) + 0.06 * random('fi' + f)}), transparent 65%)`, mixBlendMode: 'screen'}} />);
  if (has(fx, 'rays')) o.push(<AbsoluteFill key="ra" style={{background: `conic-gradient(from ${200 + p * 8}deg at 50% 30%, transparent 0 8%, rgba(255,230,170,.22) 10%, transparent 13%, rgba(255,230,170,.16) 17%, transparent 21%, rgba(255,230,170,.22) 26%, transparent 30%, transparent 100%)`, mixBlendMode: 'screen'}} />);
  if (has(fx, 'flare')) o.push(<AbsoluteFill key="fa" style={{background: `radial-gradient(circle at ${15 + 30 * p}% 12%, rgba(255,240,200,.55), transparent 14%)`, mixBlendMode: 'screen'}} />);
  if (has(fx, 'tunnel') || has(fx, 'tunnel2')) {
    const k = has(fx, 'tunnel2') ? 0.25 : 0.1; const inner = interpolate(p, [0, 1], [70, 8 + k * 40]);
    o.push(<AbsoluteFill key="tu" style={{background: `radial-gradient(ellipse at center, transparent ${inner}%, rgba(0,0,0,.98) ${inner + 28}%)`}} />);
  }
  if (has(fx, 'stars')) o.push(<AbsoluteFill key="st" style={{opacity: 0.55 + 0.3 * Math.sin(f / 7), background: 'radial-gradient(circle at 20% 30%, #fff 0 1px, transparent 2px), radial-gradient(circle at 70% 20%, #fff 0 1.5px, transparent 3px), radial-gradient(circle at 55% 50%, #ffe 0 1px, transparent 2px)', mixBlendMode: 'screen'}} />);
  if (has(fx, 'starsout')) o.push(<AbsoluteFill key="so2" style={{background: '#000', opacity: interpolate(p, [0.4, 0.55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}} />);
  if (has(fx, 'embers')) o.push(<Dust key="em" n={50} color="255,150,60" seed="em" speed={1.2} size={3} />);
  if (has(fx, 'letterbox')) o.push(<AbsoluteFill key="lb" style={{borderTop: `${interpolate(f, [0, 8], [200, 0], {extrapolateRight: 'clamp'})}px solid #000`, borderBottom: `${interpolate(f, [0, 8], [200, 0], {extrapolateRight: 'clamp'})}px solid #000`}} />);
  if (has(fx, 'flash')) o.push(<AbsoluteFill key="f1" style={{background: '#fff', opacity: interpolate(f, [0, 7], [0.95, 0], {extrapolateRight: 'clamp'})}} />);
  if (has(fx, 'flashgold')) o.push(<AbsoluteFill key="f2" style={{background: '#ffd98a', opacity: interpolate(f, [0, 9], [0.95, 0], {extrapolateRight: 'clamp'})}} />);
  if (has(fx, 'flashoff')) o.push(<AbsoluteFill key="f3" style={{background: '#000', opacity: interpolate(f, [0, 5], [0.9, 0], {extrapolateRight: 'clamp'})}} />);
  if (has(fx, 'burst')) o.push(<AbsoluteFill key="bu" style={{background: `radial-gradient(circle at 50% 55%, rgba(255,235,170,${interpolate(p, [0, 0.4, 1], [0, 0.9, 0.2])}) 0, transparent ${interpolate(p, [0, 1], [5, 85])}%)`, mixBlendMode: 'screen'}} />);
  if (has(fx, 'lightning') || has(fx, 'lightning2')) {
    const ph = f % 45; const on = ph < 2 || (ph > 4 && ph < 6);
    o.push(<AbsoluteFill key="li" style={{background: '#bcd4ff', opacity: on ? 0.8 : 0, mixBlendMode: 'screen'}} />);
  }
  if (has(fx, 'dream')) o.push(<AbsoluteFill key="dr" style={{background: 'rgba(140,180,255,.2)', mixBlendMode: 'screen'}} />);
  if (has(fx, 'lower')) { const [t, s] = arg(fx, 'lower').split('|'); o.push(<LowerThird key="lt" title={t} sub={s} at={14} />); }
  return <>{o}</>;
};

// ---- stills ---------------------------------------------------------------
const Still: React.FC<{name: string; m: string; z: number; fx: string; flip?: boolean}> = ({name, m, z, fx, flip}) => {
  const f = useCurrentFrame();
  const {durationInFrames: D} = useVideoConfig();
  const p = f / D;
  const ease = p * p * (3 - 2 * p);
  let sc = 1.0, tx = 0, ty = 0;
  if (m === 'zi') sc = 1 + z * ease; if (m === 'zo') sc = 1 + z * (1 - ease);
  if (m === 'pl') { sc = 1 + z; tx = interpolate(ease, [0, 1], [z * 50, -z * 50]); }
  if (m === 'pr') { sc = 1 + z; tx = interpolate(ease, [0, 1], [-z * 50, z * 50]); }
  if (m === 'pu') { sc = 1 + z; ty = interpolate(ease, [0, 1], [z * 50, -z * 50]); }
  if (m === 'pd') { sc = 1 + z; ty = interpolate(ease, [0, 1], [-z * 50, z * 50]); }
  const shk = has(fx, 'shake3') ? 26 : has(fx, 'shake2') ? 12 : has(fx, 'shake1') ? 4 : 0;
  const sx = (random('sx' + f) - 0.5) * shk, sy = (random('sy' + f) - 0.5) * shk;
  const bob = has(fx, 'bob') ? Math.sin(f * 0.55) * 7 : 0;
  const pulse = has(fx, 'pulse') ? 1 + 0.035 * Math.max(0, Math.sin(f / FPS * 2 * Math.PI * 2.3)) ** 3 : 1;
  const wob = has(fx, 'wobble') ? Math.sin(f * 0.5) * 18 : 0;
  const blur = has(fx, 'blur') ? 2 + 2 * Math.sin(f * 0.4) : 0;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
      <AbsoluteFill style={{transform: `translate(${sx + wob}px, ${sy + bob}px) scale(${sc * pulse}) translate(${tx}px, ${ty}px)${flip ? ' scaleX(-1)' : ''}`, filter: `blur(${blur}px)`}}>
        <Img src={staticFile(`stills/${name}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <Overlays fx={fx} />
      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
};

const Clip: React.FC<{src: string; fx: string; dur: number}> = ({src, fx, dur}) => {
  const f = useCurrentFrame();
  const clipLen = src.includes('oldman') ? 4.25 : src.includes('pilgrims') ? 6.2 : 5.5;
  const rate = Math.max(0.5, Math.min(2, clipLen / dur));
  const z = has(fx, 'zoom3') ? 2.4 : has(fx, 'zoom2') ? 1.5 : 1;
  const sc = 1 + (z - 1) * (f / fr(dur));
  const crop = has(fx, 'zoom3') ? 'translateY(8%)' : '';
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${sc}) ${crop}`, filter: has(fx, 'redgrade') ? 'sepia(1) saturate(4) hue-rotate(-35deg) brightness(.8)' : undefined}}>
        <OffthreadVideo src={staticFile(src)} muted playbackRate={rate} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <Overlays fx={fx} />
      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
};

// ---- cards ----------------------------------------------------------------
const Bg: React.FC<{name?: string; dim?: number; blur?: number}> = ({name, dim = 0.65, blur = 3}) => (
  <AbsoluteFill style={{background: '#050508'}}>
    {name && <AbsoluteFill style={{filter: `blur(${blur}px)`, opacity: 1 - dim}}><Img src={staticFile(`stills/${name}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></AbsoluteFill>}
  </AbsoluteFill>
);
const Slam: React.FC<{text: string; size?: number; color?: string; glow?: string; sub?: string; delay?: number}> = ({text, size = 160, color = '#fff', glow = 'rgba(255,180,60,.6)', sub, delay = 0}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const s = spring({frame: f - delay, fps, config: {damping: 10, mass: 0.6}});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: 80}}>
      <div style={{fontFamily: FONT, fontSize: size, color, letterSpacing: 6, lineHeight: 1.05, transform: `scale(${interpolate(s, [0, 1], [2.6, 1])})`, opacity: Math.min(1, s * 2), textShadow: `0 0 50px ${glow}`}}>{text}</div>
      {sub && <div style={{fontFamily: 'monospace', fontSize: 40, color: '#e8d8b0', letterSpacing: 14, marginTop: 28, opacity: Math.min(1, s * 2)}}>{sub}</div>}
    </AbsoluteFill>
  );
};
const Calendar: React.FC = () => {
  const f = useCurrentFrame(); const {durationInFrames: D} = useVideoConfig();
  const rot = interpolate(f, [0, D], [0, 330]);
  const months = ['MUHARRAM', 'SAFAR', 'RABI I', 'RABI II', 'JUMADA I', 'JUMADA II', 'RAJAB', 'SHABAN', 'RAMADAN', 'SHAWWAL', 'DHU QIDAH', 'DHU HIJJAH'];
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'relative', width: 760, height: 760, transform: `rotate(${rot}deg)`}}>
        <svg width="760" height="760" viewBox="-380 -380 760 760"><circle r="360" fill="none" stroke="#e8c070" strokeWidth="3" /><circle r="250" fill="none" stroke="#e8c07088" strokeWidth="2" />
          {months.map((m, i) => { const a = (i / 12) * Math.PI * 2; return <g key={i}><line x1={Math.cos(a) * 250} y1={Math.sin(a) * 250} x2={Math.cos(a) * 360} y2={Math.sin(a) * 360} stroke="#e8c070" strokeWidth="2" />
            <text x={Math.cos(a + 0.26) * 305} y={Math.sin(a + 0.26) * 305} fill={i === 8 ? '#ffffff' : '#e8c070'} fontSize="22" fontFamily="monospace" textAnchor="middle" transform={`rotate(${(a + 0.26) * 180 / Math.PI + 90} ${Math.cos(a + 0.26) * 305} ${Math.sin(a + 0.26) * 305})`}>{m}</text></g>; })}</svg>
      </div>
    </AbsoluteFill>
  );
};
const Calli: React.FC = () => {
  const f = useCurrentFrame(); const s = spring({frame: f, fps: FPS, config: {damping: 20}});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <div style={{fontFamily: '"DejaVu Sans","Noto Naskh Arabic","Amiri",sans-serif', fontSize: 190, color: '#ffe3a0', direction: 'rtl', transform: `scale(${0.9 + 0.1 * s}) translateY(${Math.sin(f / 18) * 8}px)`, opacity: s,
        textShadow: '0 0 30px #ffb84a, 0 0 90px #ff9a1a, 0 6px 0 #7a4a10'}}>اِقْرَأْ بِاسْمِ رَبِّكَ</div>
      <div style={{fontFamily: 'monospace', fontSize: 36, color: '#ffe3a0', letterSpacing: 10, marginTop: 40, opacity: s}}>READ IN THE NAME OF YOUR LORD</div>
    </AbsoluteFill>
  );
};
const List: React.FC = () => {
  const f = useCurrentFrame();
  const items = ['LAWS', 'RULES ABOUT PRAYER', 'STORIES OF PAST PROPHETS'];
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 26}}>
      {items.map((t, i) => { const a = interpolate(f, [i * 18, i * 18 + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); const sk = interpolate(f, [i * 18 + 22, i * 18 + 32], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return <div key={i} style={{position: 'relative', fontFamily: FONT, fontSize: 84, color: '#fff', opacity: a, letterSpacing: 5}}>{'NO ' + t}<div style={{position: 'absolute', left: -10, top: '52%', height: 9, width: `${sk}%`, background: '#ff2a2a'}} /></div>; })}
    </AbsoluteFill>
  );
};
const Icons: React.FC = () => {
  const f = useCurrentFrame(); const {durationInFrames: D} = useVideoConfig(); const g = interpolate(f, [D * 0.25, D * 0.7], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 120, flexDirection: 'row', filter: `grayscale(${g}) opacity(${1 - g * 0.8})`}}>
      <svg width="260" height="300" viewBox="0 0 100 115"><path d="M50 8c-22 0-36 18-36 40v52l9-8 9 8 9-8 9 8 9-8 9 8 9-8 9 8V48C86 26 72 8 50 8z" fill="#c8d4ff" /><circle cx="38" cy="45" r="7" fill="#101030" /><circle cx="62" cy="45" r="7" fill="#101030" /><ellipse cx="50" cy="68" rx="9" ry="11" fill="#101030" /></svg>
      <svg width="280" height="280" viewBox="-60 -60 120 120"><circle r="52" fill="none" stroke="#ff8a3a" strokeWidth="4" /><polygon points="0,-44 12,-14 44,-14 18,6 28,38 0,18 -28,38 -18,6 -44,-14 -12,-14" fill="none" stroke="#ff8a3a" strokeWidth="4" /></svg>
    </AbsoluteFill>
  );
};
const Pop: React.FC<{still: string}> = ({still}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = spring({frame: f, fps, config: {damping: 12}});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: 1280, height: 720, transform: `scale(${0.5 + 0.5 * s})`, opacity: s, border: '6px solid #e8c070', boxShadow: '0 0 80px rgba(255,190,90,.45)', background: '#000', position: 'relative'}}>
        <Img src={staticFile(`stills/${still}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1 + 0.06 * (f / 60)})`}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 44, background: '#e8c070', color: '#221', fontFamily: 'monospace', fontSize: 24, display: 'flex', alignItems: 'center', paddingLeft: 16, letterSpacing: 4}}>● MEMORY</div>
      </div>
    </AbsoluteFill>
  );
};
const EndScreen: React.FC = () => {
  const f = useCurrentFrame(); const s = spring({frame: f, fps: FPS, config: {damping: 14}});
  const box = (x: number, y: number, w: number, h: number, label: string) => (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, border: '3px solid #e8c070', borderRadius: 14, background: 'rgba(0,0,0,.35)', color: '#e8c070', fontFamily: 'monospace', fontSize: 26, letterSpacing: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: s}}>{label}</div>);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 90}}><div style={{fontFamily: FONT, fontSize: 96, color: '#fff', letterSpacing: 8, textShadow: '0 0 40px rgba(255,180,60,.6)', opacity: s}}>CHAPTER 2</div>
        <div style={{fontFamily: 'monospace', fontSize: 36, color: '#e8d8b0', letterSpacing: 12, marginTop: 14, opacity: s}}>THE SECOND REVELATION</div></AbsoluteFill>
      {box(180, 340, 760, 428, 'NEXT EPISODE')}{box(1000, 340, 740, 428, 'WATCH NEXT')}{box(760, 820, 400, 120, 'SUBSCRIBE')}
    </AbsoluteFill>
  );
};
const Card: React.FC<{spec: Spec}> = ({spec}) => {
  const c = spec.c || '';
  const pop = c.startsWith('pop:');
  return (
    <AbsoluteFill>
      {c === 'alamin' && <><Bg /><AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, rgba(255,190,90,.25), transparent 60%)'}} /><Slam text="AL-AMIN" size={230} glow="rgba(255,190,90,.8)" sub="THE TRUSTWORTHY" /></>}
      {c === 'calendar' && <><Bg name={spec.n} dim={0.75} /><Calendar /></>}
      {c === 'read' && <><Bg /><Slam text="READ!" size={330} color="#fff" glow="rgba(255,255,255,.7)" /></>}
      {c === 'readred' && <><Bg name={spec.n} dim={0.5} blur={0} /><Slam text="READ!" size={360} color="#fff" glow="rgba(255,20,20,.95)" /></>}
      {c === 'calli' && <><Bg name="cave_gold" dim={0.55} blur={6} /><Calli /></>}
      {c === 'list' && <><Bg /><List /></>}
      {c === 'icons' && <><Bg name={spec.n} dim={0.7} /><Icons /></>}
      {c === 'character' && <><Bg /><Slam text="HIS CHARACTER" size={170} glow="rgba(255,190,90,.7)" /></>}
      {pop && <><Bg name={spec.n} dim={0.8} blur={8} /><Pop still={c.slice(4)} /></>}
      {c === 'fatrah' && <><Bg /><Slam text="THE FATRAH" size={200} color="#f6f6ff" glow="rgba(200,220,255,.9)" /></>}
      {c === 'endscreen' && <><Bg name="cave_moon" dim={0.55} blur={10} /><EndScreen /></>}
      <Overlays fx={spec.fx || ''} />
      <Grain opacity={0.08} />
    </AbsoluteFill>
  );
};

const Multi: React.FC<{spec: Spec; dur: number}> = ({spec, dur}) => {
  const names: string[] = spec.n; const fx = spec.fx || ''; const len = Math.round(fr(dur) / names.length);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {names.map((n, i) => (
        <Sequence key={i} from={i * len} durationInFrames={i === names.length - 1 ? fr(dur) - i * len : len}>
          <Still name={n} m={['zi', 'zo', 'pl', 'pr'][i % 4]} z={0.14} fx={has(fx, 'flashes') ? 'flash' : ''} flip={i % 2 === 1 && n === 'mob'} />
          {has(fx, 'fire') && <Overlays fx="fire" />}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
const Split: React.FC<{spec: Spec}> = ({spec}) => {
  const [a, b] = spec.n; const fx = spec.fx || '';
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{clipPath: 'inset(0 50% 0 0)'}}><Still name={a} m="zi" z={0.12} fx={has(fx, 'dream') ? 'dream' : 'shake1'} /></AbsoluteFill>
      <AbsoluteFill style={{clipPath: 'inset(0 0 0 50%)'}}><Still name={b} m="zi" z={0.12} fx="" /></AbsoluteFill>
      <AbsoluteFill style={{alignItems: 'center'}}><div style={{width: 6, height: '100%', background: '#e8c070', boxShadow: '0 0 24px #e8c070'}} /></AbsoluteFill>
    </AbsoluteFill>
  );
};

const BeatView: React.FC<{spec: Spec; dur: number}> = ({spec, dur}) => {
  switch (spec.k) {
    case 'still': return <Still name={spec.n} m={spec.m || 'zi'} z={spec.z ?? 0.14} fx={spec.fx || ''} />;
    case 'clip': return <Clip src={spec.n} fx={spec.fx || ''} dur={dur} />;
    case 'multi': return <Multi spec={spec} dur={dur} />;
    case 'split': return <Split spec={spec} />;
    case 'card': return <Card spec={spec} />;
    default: return <Black />;
  }
};

export const Full: React.FC = () => {
  const total = Math.ceil(full.total * FPS);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {(full.beats as any[]).map((b) => (
        <Sequence key={b.i} from={fr(b.start)} durationInFrames={fr(b.dur)}>
          <BeatView spec={b.spec} dur={b.dur} />
        </Sequence>
      ))}
      <Audio src={staticFile('full.wav')} />
    </AbsoluteFill>
  );
};
export const FULL_FRAMES = () => Math.ceil(full.total * FPS);
