import React from "react";
import { AbsoluteFill } from "remotion";
import { theme } from "./theme";
import { Paper } from "./board/Paper";
import { ICONS } from "./board/icons";

// Thumbnail 1280×720 bergaya whiteboard. Motif daftar pekerjaan yang dicoret
// mengikuti thumbnail episode asli agar penontonnya langsung mengenali topiknya.

export const Icon: React.FC<{ name: string; x: number; y: number; size: number; rotate?: number }> = ({ name, x, y, size, rotate = 0 }) => {
  const k = size / 100;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "absolute", left: x - size / 2, top: y - size / 2, transform: `rotate(${rotate}deg)`, overflow: "visible" }}>
      {ICONS[name].map((s, i) => (
        <g key={i}>
          {s.fill ? <path d={s.d} fill={s.fill} /> : null}
          <path d={s.d} fill="none" stroke={s.color ?? theme.ink} strokeWidth={(7 * (s.w ?? 1)) / k} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  );
};

export const Marker: React.FC<{ children: React.ReactNode; size: number; color?: string; style?: React.CSSProperties }> = ({ children, size, color = theme.ink, style }) => (
  <div style={{ fontFamily: theme.marker, fontSize: size, color, lineHeight: 1, whiteSpace: "nowrap", ...style }}>{children}</div>
);

// Kotak merah dengan teks putih, seperti label di thumbnail asli.
export const RedBox: React.FC<{ children: React.ReactNode; size: number; style?: React.CSSProperties }> = ({ children, size, style }) => (
  <div
    style={{
      display: "inline-block",
      backgroundColor: theme.red,
      color: "#FFFFFF",
      fontFamily: theme.marker,
      fontSize: size,
      lineHeight: 1,
      padding: "14px 26px 10px",
      transform: "rotate(-2deg)",
      border: `5px solid ${theme.ink}`,
      boxShadow: `8px 8px 0 ${theme.ink}`,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      position: "absolute",
      fontFamily: theme.hand,
      fontSize: 38,
      color: theme.ink,
      backgroundColor: theme.yellow,
      padding: "4px 18px",
      border: `3px solid ${theme.ink}`,
      borderRadius: 10,
      transform: "rotate(-3deg)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill>
    <Paper />
    {children}
    <AbsoluteFill style={{ border: `10px solid ${theme.ink}` }} />
  </AbsoluteFill>
);

export const Strike: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w + 40} height={40} style={{ position: "absolute", left: -20, top: "50%", marginTop: -20, overflow: "visible" }}>
    <path d={`M4 26 C${w * 0.3} 14 ${w * 0.7} 22 ${w + 36} 10`} stroke={theme.red} strokeWidth={11} fill="none" strokeLinecap="round" />
  </svg>
);

/** A: daftar pekerjaan dicoret (gema thumbnail asli) + robot. */
export const ThumbA: React.FC = () => {
  const jobs = ["PLUMBER", "CHEF", "PROFESSOR"];
  return (
    <Frame>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 34,
          width: 440,
          padding: "22px 36px",
          backgroundColor: "#FFFFFF",
          border: `5px solid ${theme.ink}`,
          borderRadius: 14,
          transform: "rotate(-3deg)",
          boxShadow: "10px 12px 0 rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {jobs.map((j) => (
          <div key={j} style={{ position: "relative", alignSelf: "flex-start" }}>
            <Marker size={60}>{j}</Marker>
            <Strike w={j.length * 60 * 0.66} />
          </div>
        ))}
        <Marker size={60} color={theme.gray}>
          YOU?
        </Marker>
      </div>
      <Icon name="robot" x={1000} y={260} size={400} />
      <div style={{ position: "absolute", left: 60, bottom: 46 }}>
        <Marker size={112}>NO JOBS BY</Marker>
        <RedBox size={124} style={{ marginTop: 10 }}>2030?</RedBox>
      </div>
      <Badge style={{ right: 50, bottom: 60 }}>Roman Yampolskiy · animated</Badge>
    </Frame>
  );
};

/** B: tidak bisa dimatikan. */
export const ThumbB: React.FC = () => (
  <Frame>
    <Icon name="robot" x={930} y={330} size={500} />
    <Icon name="plug" x={420} y={250} size={320} rotate={-12} />
    <svg width={340} height={340} style={{ position: "absolute", left: 250, top: 80 }}>
      <path d="M30 30 L310 310 M310 30 L30 310" stroke={theme.red} strokeWidth={26} strokeLinecap="round" />
    </svg>
    <div style={{ position: "absolute", left: 60, bottom: 50 }}>
      <Marker size={104}>YOU CAN'T</Marker>
      <RedBox size={118} style={{ marginTop: 10 }}>TURN IT OFF</RedBox>
    </div>
    <Badge style={{ left: 50, top: 34 }}>AI Safety Expert, in 7 min</Badge>
  </Frame>
);

/** C: simulasi. */
export const ThumbC: React.FC = () => (
  <Frame>
    <Icon name="monitor" x={900} y={300} size={560} />
    <Icon name="god" x={1150} y={110} size={190} />
    <Icon name="question" x={560} y={160} size={190} rotate={-10} />
    <div style={{ position: "absolute", left: 60, top: 60 }}>
      <Marker size={92} style={{ marginBottom: 12 }}>
        1 IN A
      </Marker>
      <Marker size={92} color={theme.red}>
        BILLION
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 50 }}>
      <Marker size={100}>WE LIVE IN A</Marker>
      <RedBox size={100} style={{ marginTop: 10 }}>SIMULATION?</RedBox>
    </div>
    <Badge style={{ right: 50, bottom: 40 }}>Diary Of A CEO, animated</Badge>
  </Frame>
);
