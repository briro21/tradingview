import {C, FONT} from '../theme';

// Keterangan kecil di pojok, mis. sumber data atau "ilustrasi".
export const Caption: React.FC<{text: string; side?: 'left' | 'right'}> = ({text, side = 'right'}) => (
  <div style={{position: 'absolute', [side]: 60, bottom: 30, fontFamily: FONT, fontWeight: 900, fontSize: 28, color: 'rgba(255,255,255,0.55)'}}>
    {text}
  </div>
);

export const SceneLabel: React.FC<{text: string}> = ({text}) => (
  <div style={{position: 'absolute', top: 50, right: 60, padding: '10px 28px', background: C.red, border: `6px solid ${C.ink}`, borderRadius: 16, fontFamily: FONT, fontWeight: 900, fontSize: 48, color: '#fff'}}>
    {text}
  </div>
);
