import {AbsoluteFill} from 'remotion';
import {Background} from '../components/Background';
import {Character} from '../cinematic/Character';
import {C, FONT, ThemeCtx} from '../theme';

// Data thumbnail per video (di meta.json): 3 varian gaya.
export type ThumbData = {
  v1: {top: string; main: string; badge?: string; emoji: string};
  v2: {kicker: string; main: string; bottom: string; emoji: string};
  v3: {top: string; left: string; right: string; leftEmoji?: string; rightEmoji?: string};
};

const T: React.FC<{text: string; size: number; color?: string; style?: React.CSSProperties}> = ({text, size, color = '#fff', style}) => (
  <div style={{fontFamily: FONT, fontWeight: 900, fontSize: size, color, lineHeight: 0.95, whiteSpace: 'pre-line', WebkitTextStroke: `${size / 14}px ${C.ink}`, paintOrder: 'stroke fill', textShadow: `0 ${size / 12}px 0 ${C.ink}`, ...style}}>
    {text}
  </div>
);

export const Thumb: React.FC<{data: ThumbData; variant: 1 | 2 | 3}> = ({data, variant}) => (
  <ThemeCtx.Provider value="dark">
    <AbsoluteFill style={{overflow: 'hidden'}}>
      {variant === 1 && (
        <>
          <Background glow="rgba(255,75,62,0.5)" glowX="72%" glowY="58%" />
          <div style={{position: 'absolute', left: -20, top: 200}}>
            <Character pose="headInHands" face="kaget" jacket={C.blue} rim="#ff8a7a" height={600} />
          </div>
          <div style={{position: 'absolute', left: 700, top: 270, fontSize: 330, lineHeight: 1, transform: 'rotate(-6deg)', filter: 'drop-shadow(0 12px 0 #050505)'}}>{data.v1.emoji}</div>
          <T text={data.v1.top} size={110} style={{position: 'absolute', left: 40, top: 24}} />
          <T text={data.v1.main} size={140} color={C.red} style={{position: 'absolute', left: 40, top: 130}} />
          {data.v1.badge && (
            <div style={{position: 'absolute', right: 40, bottom: 50, background: C.yellow, border: `8px solid ${C.ink}`, borderRadius: 18, padding: '6px 22px', transform: 'rotate(-4deg)'}}>
              <T text={data.v1.badge} size={64} color={C.ink} style={{WebkitTextStroke: 0, textShadow: 'none'}} />
            </div>
          )}
        </>
      )}
      {variant === 2 && (
        <>
          <Background glow="rgba(255,150,60,0.5)" glowX="70%" glowY="60%" />
          <div style={{position: 'absolute', left: -40, top: 150}}>
            <Character pose="stand" face="serius" jacket={C.blue} rim="#ffb26b" height={720} glowEye />
          </div>
          <div style={{position: 'absolute', left: 680, top: 270, fontSize: 300, lineHeight: 1, filter: 'drop-shadow(0 0 40px rgba(255,200,80,0.7))'}}>{data.v2.emoji}</div>
          <T text={data.v2.kicker} size={84} color={C.yellow} style={{position: 'absolute', right: 40, top: 30, textAlign: 'right'}} />
          <T text={data.v2.main} size={104} style={{position: 'absolute', right: 40, top: 120, textAlign: 'right'}} />
          <T text={data.v2.bottom} size={90} color={C.red} style={{position: 'absolute', right: 40, bottom: 40, textAlign: 'right'}} />
        </>
      )}
      {variant === 3 && (
        <AbsoluteFill style={{background: 'linear-gradient(90deg, #5a1218 0 50%, #0f4d2a 50% 100%)'}}>
          <div style={{position: 'absolute', left: 636, top: 0, bottom: 0, width: 8, background: C.ink}} />
          <div style={{position: 'absolute', left: 140, top: 260}}>
            <Character pose="headInHands" face="sedih" jacket={C.red} rim="#ff8a7a" height={480} />
          </div>
          <div style={{position: 'absolute', left: 800, top: 260}}>
            <Character pose="cheer" face="senang" jacket={C.green} rim="#9effc0" height={480} />
          </div>
          {data.v3.leftEmoji && <div style={{position: 'absolute', left: 420, top: 440, fontSize: 120}}>{data.v3.leftEmoji}</div>}
          {data.v3.rightEmoji && <div style={{position: 'absolute', left: 1060, top: 440, fontSize: 120}}>{data.v3.rightEmoji}</div>}
          <T text={data.v3.left} size={Math.min(96, 740 / data.v3.left.length)} color={C.red} style={{position: 'absolute', left: 40, top: 140, width: 560, textAlign: 'center'}} />
          <T text={data.v3.right} size={Math.min(96, 740 / data.v3.right.length)} color={C.green} style={{position: 'absolute', left: 680, top: 140, width: 560, textAlign: 'center'}} />
          <T text={data.v3.top} size={78} style={{position: 'absolute', left: 0, right: 0, top: 24, textAlign: 'center'}} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  </ThemeCtx.Provider>
);
