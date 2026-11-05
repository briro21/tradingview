import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig, Easing, spring} from 'remotion';
import {Dust, Grain, Vignette, Shake} from './fx';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// 0: HOOK — pitch-black cave, cold side light, faceless; "NOT HUMAN"
export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: D, fps} = useVideoConfig();
  const zoom = interpolate(f, [0, D], [1, 1.25]);
  const beam = 0.5 + 0.15 * Math.sin(f / 7);
  const hit = Math.round(D - 2.0 * fps);
  const s = spring({frame: f - hit, fps, config: {damping: 9, mass: 0.6}});
  const pulse = 1 + 0.03 * Math.max(0, Math.sin((f / fps) * 2 * Math.PI * 2));
  return (
    <AbsoluteFill style={{background: '#020409'}}>
      <Shake amp={f > hit ? 10 * Math.max(0, 1 - (f - hit) / 15) : 1.5}>
        <AbsoluteFill style={{transform: `scale(${zoom * pulse})`}}>
          {/* cave walls */}
          <svg width="100%" height="100%" viewBox="0 0 1920 1080">
            <defs>
              <linearGradient id="side" x1="0" x2="1"><stop offset="0" stopColor="#6f9be0" stopOpacity={beam} /><stop offset=".55" stopColor="#0a1426" stopOpacity="0" /></linearGradient>
              <radialGradient id="rock" cx=".3" cy=".5" r=".7"><stop offset="0" stopColor="#1d2a3f" /><stop offset="1" stopColor="#020409" /></radialGradient>
            </defs>
            <rect width="1920" height="1080" fill="url(#rock)" />
            <path d="M0 0 L520 0 L430 180 L560 420 L380 700 L520 1080 L0 1080Z" fill="#05080f" />
            <path d="M1920 0 L1380 0 L1500 260 L1330 520 L1560 800 L1420 1080 L1920 1080Z" fill="#03060c" />
            {/* hunched faceless silhouette, hands to throat area */}
            <g transform="translate(960 640)">
              <path d="M-230 440 C-220 160 -140 40 -70 0 C-90 -60 -95 -150 -40 -200 C0 -230 50 -220 80 -180 C120 -130 110 -50 70 0 C150 40 230 170 240 440Z" fill="#000" />
              <path d="M-230 440 C-220 160 -140 40 -70 0 C-90 -60 -95 -150 -40 -200" stroke="#7fa8e8" strokeOpacity={beam} strokeWidth="5" fill="none" />
            </g>
            <rect width="1920" height="1080" fill="url(#side)" style={{mixBlendMode: 'screen'}} />
            {/* volumetric shaft */}
            <polygon points="0,120 0,420 1100,760 1100,640" fill="#8fb4ff" opacity={0.07 + 0.03 * Math.sin(f / 9)} />
          </svg>
          <Dust n={90} color="170,200,255" seed="hook" speed={0.6} size={3} />
        </AbsoluteFill>
      </Shake>
      <Vignette strength={0.97} />
      {f > hit && (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontFamily: 'Impact, "Arial Black", sans-serif', fontSize: 260, color: '#f4f6ff', letterSpacing: 10, transform: `scale(${interpolate(s, [0, 1], [3, 1])})`, opacity: Math.min(1, s * 2),
            textShadow: '0 0 40px rgba(140,180,255,.5)', WebkitMaskImage: 'repeating-linear-gradient(115deg,#000 0 38px,transparent 38px 41px,#000 41px 90px,transparent 90px 92px)'}}>NOT HUMAN</div>
        </AbsoluteFill>
      )}
      <Grain opacity={0.12} />
    </AbsoluteFill>
  );
};

// simplified Arabian peninsula outline (lon/lat → px)
const PEN: [number, number][] = [[35, 29.5], [36.5, 27], [38.8, 23.5], [39.8, 21], [41.5, 18], [42.8, 15.5], [43.5, 12.7], [45, 12.8], [48.5, 14], [52, 15.6], [55, 17.2], [57, 18.8], [59.8, 22.5], [58.6, 23.6], [56.4, 24.8], [56, 26.2], [54, 24.2], [51.6, 24.4], [51, 26], [50, 26.6], [48.5, 28.5], [47.6, 30], [44.5, 32], [39, 32.2], [37, 31.5]];
const proj = ([lo, la]: [number, number]) => [(lo - 47) * 52 + 960, (24 - la) * 52 + 540];
const CITIES: [number, number][] = [[39.8, 21.4], [39.6, 24.5], [40.4, 21.3], [44.2, 15.4], [36.3, 33.5], [35.2, 31.8], [44.4, 33.3], [50.6, 26.2], [46.7, 24.7], [43.9, 26.3], [58.4, 23.6], [45, 12.8], [38.1, 24.1], [31.2, 30], [52, 15.6]];

export const GlobeNodes: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: D} = useVideoConfig();
  const z = interpolate(f, [0, 14, D], [3.2, 1.25, 1.0], {...clamp, easing: Easing.out(Easing.cubic)});
  const blur = interpolate(f, [0, 12], [16, 0], clamp);
  const mecca = proj([39.8, 21.4]);
  const path = PEN.map(proj).map((p) => p.join(',')).join(' ');
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0d1b33, #02060f 75%)'}}>
      <AbsoluteFill style={{transform: `scale(${z})`, transformOrigin: `${mecca[0]}px ${mecca[1]}px`, filter: `blur(${blur}px)`}}>
        <svg width="1920" height="1080">
          {new Array(24).fill(0).map((_, i) => <line key={i} x1={i * 80} y1={0} x2={i * 80} y2={1080} stroke="#1c3b6b" strokeOpacity=".25" />)}
          {new Array(14).fill(0).map((_, i) => <line key={'h' + i} x1={0} y1={i * 80} x2={1920} y2={i * 80} stroke="#1c3b6b" strokeOpacity=".25" />)}
          <polygon points={path} fill="#122544" stroke="#3a6fb8" strokeWidth={2} />
          {CITIES.map((c, i) => {
            const p = proj(c); const t0 = 10 + i * 4;
            const k = interpolate(f, [t0, t0 + 14], [0, 1], clamp);
            return (
              <g key={i}>
                <line x1={mecca[0]} y1={mecca[1]} x2={mecca[0] + (p[0] - mecca[0]) * k} y2={mecca[1] + (p[1] - mecca[1]) * k} stroke="#ffc552" strokeWidth={2.5} strokeOpacity={0.8} />
                <circle cx={p[0]} cy={p[1]} r={7 * k} fill="#ffd36e" />
                <circle cx={p[0]} cy={p[1]} r={(10 + ((f - t0) % 30)) * k} fill="none" stroke="#ffc552" strokeOpacity={k * (1 - ((f - t0) % 30) / 30)} />
              </g>
            );
          })}
          <circle cx={mecca[0]} cy={mecca[1]} r={14 + 3 * Math.sin(f / 4)} fill="#fff1c2" />
          <circle cx={mecca[0]} cy={mecca[1]} r={60} fill="#ffc552" opacity={0.18} />
        </svg>
      </AbsoluteFill>
      <Vignette strength={0.8} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};

// 2: blind old man — hooded, face in shadow; only beard and clouded eye-glints; candle
export const OldMan: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: D} = useVideoConfig();
  const fl = 0.75 + 0.25 * Math.sin(f * 0.9) * Math.sin(f * 0.37 + 1);
  const z = interpolate(f, [0, D], [1, 1.12]);
  return (
    <AbsoluteFill style={{background: '#0b0603'}}>
      <AbsoluteFill style={{transform: `scale(${z})`}}>
        <svg width="1920" height="1080">
          <defs>
            <radialGradient id="cand" cx="0.62" cy="0.62" r="0.55"><stop offset="0" stopColor="#ff9a3a" stopOpacity={0.55 * fl} /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#cand)" />
          {/* staff */}
          <rect x="620" y="180" width="26" height="900" rx="10" fill="#3a2010" />
          <rect x="620" y="180" width="8" height="900" fill="#c87a3a" opacity={0.5 * fl} />
          {/* cloak */}
          <path d="M700 1080 C690 760 760 520 860 430 C820 330 860 210 960 190 C1060 210 1100 330 1060 430 C1160 520 1230 760 1220 1080Z" fill="#2a1a10" />
          <path d="M1060 430 C1160 520 1230 760 1220 1080" stroke="#e08a3a" strokeOpacity={0.6 * fl} strokeWidth="6" fill="none" />
          {/* hood shadow */}
          <ellipse cx="960" cy="330" rx="85" ry="105" fill="#050302" />
          {/* white beard */}
          <path d="M895 370 C900 470 940 540 960 560 C980 540 1020 470 1025 370 C1000 400 920 400 895 370Z" fill="#d9d2c4" opacity={0.85} />
          {/* milky eye glints */}
          <ellipse cx="932" cy="338" rx="9" ry="3" fill="#b8c4c8" opacity={0.25 + 0.15 * fl} />
          <ellipse cx="988" cy="338" rx="9" ry="3" fill="#b8c4c8" opacity={0.25 + 0.15 * fl} />
          {/* hand on staff */}
          <ellipse cx="633" cy="520" rx="34" ry="26" fill="#8a5a3a" />
          {/* candle */}
          <rect x="1300" y="820" width="40" height="120" fill="#e8d6b0" />
          <ellipse cx="1320" cy={800 - 4 * fl} rx={10} ry={26 * fl} fill="#ffcf6a" />
          <ellipse cx="1320" cy={808} rx={5} ry={12} fill="#fff" />
        </svg>
      </AbsoluteFill>
      {/* smoke at bottom */}
      <AbsoluteFill style={{top: 650}}>
        {new Array(10).fill(0).map((_, i) => (
          <div key={i} style={{position: 'absolute', left: ((random('sm' + i) * 2200 + f * (1 + i % 3)) % 2400) - 300, top: 120 + random('st' + i) * 250 - f * 0.4,
            width: 500, height: 220, borderRadius: '50%', background: 'rgba(180,150,120,.10)', filter: 'blur(40px)'}} />
        ))}
      </AbsoluteFill>
      <Vignette strength={0.9} />
      <Grain opacity={0.1} />
    </AbsoluteFill>
  );
};

// 3: VHS rewind — reprise of previous scenes, red glitch, LOCKED + countdown
export const Rewind: React.FC<{children: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: D, fps} = useVideoConfig();
  const secs = Math.max(0, Math.ceil((D - f) / fps * 37));
  const jitter = (random('rw' + f) - 0.5) * 40;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{filter: 'sepia(1) saturate(6) hue-rotate(-40deg) contrast(1.3) brightness(.7)', transform: `translateX(${jitter}px) skewX(${jitter / 8}deg)`}}>{children}</AbsoluteFill>
      <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, rgba(0,0,0,.35) 0 2px, transparent 2px 4px)'}} />
      {new Array(4).fill(0).map((_, i) => (
        <div key={i} style={{position: 'absolute', left: 0, right: 0, top: random('bar' + i + Math.floor(f / 2)) * 1080, height: 6 + random('bh' + i + f) * 40, background: 'rgba(255,255,255,.18)', mixBlendMode: 'screen'}} />
      ))}
      <div style={{position: 'absolute', top: 60, left: 80, fontFamily: 'monospace', fontSize: 48, color: '#fff', textShadow: '3px 0 red, -3px 0 cyan'}}>◀◀ REW</div>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <div style={{fontFamily: 'monospace', fontSize: 30, color: '#ff8a8a', letterSpacing: 10, opacity: f % 20 < 14 ? 1 : 0.3}}>🔒 ACCESS RESTRICTED</div>
        <div style={{fontFamily: 'Impact, "Arial Black", sans-serif', fontSize: 120, color: '#fff', letterSpacing: 6, margin: '10px 0', textShadow: `${4 + jitter / 6}px 0 #ff1a1a, ${-4 - jitter / 6}px 0 #00e5ff`}}>THE DARK PROPHECY</div>
        <div style={{fontFamily: 'monospace', fontSize: 64, color: '#ff2a2a', border: '4px solid #ff2a2a', padding: '6px 30px', letterSpacing: 14}}>LOCKED</div>
        <div style={{fontFamily: 'monospace', fontSize: 54, color: '#fff', marginTop: 30}}>{`07:${String(Math.floor(secs / 60) % 60).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`}</div>
      </AbsoluteFill>
      <Vignette strength={0.85} color="40,0,0" />
      <Grain opacity={0.2} />
    </AbsoluteFill>
  );
};
