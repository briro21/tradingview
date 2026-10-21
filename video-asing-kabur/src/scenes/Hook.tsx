import {AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {BigText} from '../components/BigText';
import {Stickman} from '../components/Stickman';
import {C, FONT} from '../theme';

// 0:00–0:10 — "Bayangkan besok pagi... semua investor asing sudah pergi."
const Phone: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 12}});
  const flash = Math.floor(frame / 8) % 2 === 0;
  return (
    <div style={{width: 380, height: 700, borderRadius: 48, background: '#1b1f2b', border: `10px solid ${C.ink}`, padding: 28, transform: `translateY(${(1 - enter) * 600}px) rotate(6deg)`, display: 'flex', flexDirection: 'column', gap: 18}}>
      {['BBCA', 'BBRI', 'TLKM', 'BMRI', 'ASII'].map((s, i) => (
        <div key={s} style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONT, fontWeight: 900, fontSize: 36, color: '#fff'}}>
          <span>{s}</span>
          <span style={{color: C.red}}>-{(6.9 + i * 0.02).toFixed(2)}%</span>
        </div>
      ))}
      <div style={{marginTop: 'auto', padding: 24, borderRadius: 24, textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 64, color: '#fff', background: flash ? C.red : '#8a1f18', border: `6px solid ${C.ink}`, boxShadow: flash ? `0 0 60px ${C.red}` : 'none'}}>
        SELL
      </div>
    </div>
  );
};

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const mood = frame > 150 ? 'kaget' : 'netral';
  const slideIn = interpolate(frame, [0, 20], [-500, 0], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Background glow="rgba(255,178,107,0.35)" glowX="25%" glowY="60%" />
      <div style={{position: 'absolute', left: 120 + slideIn, bottom: -60}}>
        <Stickman mood={mood} size={520} shake={frame > 150} />
      </div>
      <Sequence from={30} layout="none">
        <div style={{position: 'absolute', right: 260, top: 230}}>
          <Phone />
        </div>
      </Sequence>
      <Sequence from={10} durationInFrames={130} layout="none">
        <BigText text="BAYANGKAN..." size={120} style={{position: 'absolute', left: 80, top: 60}} />
      </Sequence>
      <Sequence from={150} layout="none">
        <BigText text="SEMUA ASING" size={130} style={{position: 'absolute', left: 80, top: 50}} />
        <BigText text="SUDAH PERGI." color={C.red} size={130} delay={12} style={{position: 'absolute', left: 80, top: 190}} />
      </Sequence>
    </AbsoluteFill>
  );
};
