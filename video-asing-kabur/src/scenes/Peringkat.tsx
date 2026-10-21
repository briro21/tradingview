import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {BigText} from '../components/BigText';
import {Caption} from '../components/Caption';
import {C, FONT} from '../theme';

// 0:10–0:20 — IHSG -40% YTD, peringkat 35 dari 35 bursa.
const ROWS = [
  {name: 'Bursa #1', v: 0.9},
  {name: 'Bursa #2', v: 0.75},
  {name: 'Bursa #3', v: 0.6},
  {name: '...', v: 0},
  {name: '#35 INDONESIA', v: -1},
];

export const Peringkat: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pct = interpolate(frame, [40, 110], [0, 40.04], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,75,62,0.3)" glowX="72%" glowY="55%" />
      <div style={{position: 'absolute', left: 100, top: 80}}>
        <BigText text="IHSG TAHUN INI" size={90} />
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 190, color: C.red, WebkitTextStroke: `10px ${C.ink}`, paintOrder: 'stroke fill', marginTop: 10}}>
          -{pct.toFixed(2).replace('.', ',')}%
        </div>
        <BigText text="TERBURUK DI DUNIA" size={70} color={C.yellow} delay={115} />
      </div>
      <div style={{position: 'absolute', right: 80, top: 170, width: 640, display: 'flex', flexDirection: 'column', gap: 26}}>
        {ROWS.map((r, i) => {
          const s = spring({frame: frame - 20 - i * 10, fps, config: {damping: 14}});
          const isIdn = r.v < 0;
          return (
            <div key={r.name} style={{opacity: s, transform: `translateX(${(1 - s) * 300}px)`, display: 'flex', alignItems: 'center', gap: 20}}>
              <div style={{width: 270, whiteSpace: 'pre-line', fontFamily: FONT, fontWeight: 900, fontSize: isIdn ? 40 : 34, color: isIdn ? C.red : '#fff'}}>{r.name}</div>
              {r.v !== 0 && (
                <div style={{height: 56, width: Math.abs(r.v) * 330 * s, background: isIdn ? C.red : C.green, border: `5px solid ${C.ink}`, borderRadius: 10, boxShadow: isIdn ? `0 0 40px ${C.red}` : 'none'}} />
              )}
            </div>
          );
        })}
      </div>
      <Caption text="Sumber: Kontan, Okt 2026 — perbandingan 35 bursa (batang = ilustrasi)" />
    </AbsoluteFill>
  );
};
