import React from "react";
import { theme } from "../../theme";
import { Badge, Frame, Icon, Marker, RedBox } from "../../Thumbnails";

// Thumbnail video Joscha Bach (1280×720). Diupload sebagai episode ke-4 channel.
// Setiap thumbnail membawa strip "3-HR PODCAST → 10 MIN" agar langsung terbaca
// sebagai ringkasan podcast (pola yang mendatangkan trafik di episode 1).

/** Mikrofon podcast kecil (ikon headset di kit bergaya kacamata VR). */
const Mic: React.FC = () => (
  <svg width={44} height={60} viewBox="0 0 44 60" style={{ overflow: "visible" }}>
    <rect x={12} y={2} width={20} height={34} rx={10} fill={theme.red} stroke="#FFFFFF" strokeWidth={4} />
    <path d="M5 26 C5 44 39 44 39 26" fill="none" stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" />
    <path d="M22 41 L22 54 M12 56 L32 56" fill="none" stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" />
  </svg>
);

/** Strip hitam di kiri atas: ikon headset + "3-HR PODCAST → 10 MIN". */
const PodcastStrip: React.FC = () => (
  <div
    style={{
      position: "absolute",
      left: 40,
      top: 34,
      display: "flex",
      alignItems: "center",
      gap: 14,
      backgroundColor: theme.ink,
      padding: "8px 26px 6px 22px",
      borderRadius: 14,
      transform: "rotate(-1.5deg)",
      boxShadow: `6px 6px 0 ${theme.red}`,
    }}
  >
    <Mic />
    <Marker size={52} color="#FFFFFF">
      3-HR PODCAST
    </Marker>
    <Marker size={52} color={theme.yellow}>
      → 10 MIN
    </Marker>
  </div>
);

/** M: sama dengan frame pertama video. */
export const ThumbM: React.FC = () => (
  <Frame>
    <Icon name="skullDark" x={1040} y={330} size={370} />
    <PodcastStrip />
    <div style={{ position: "absolute", left: 60, top: 175 }}>
      <Marker size={84}>YOU HAVE</Marker>
      <Marker size={84} style={{ marginTop: 12 }}>
        NEVER SEEN
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={104}>THE REAL WORLD</RedBox>
    </div>
    <Badge style={{ right: 40, top: 40 }}>Joscha Bach × Lex Fridman</Badge>
  </Frame>
);

/** N: kebahagiaan adalah kue. */
export const ThumbN: React.FC = () => (
  <Frame>
    <Icon name="cookie" x={1010} y={400} size={400} rotate={-8} />
    <Icon name="brain" x={1160} y={200} size={150} rotate={12} />
    <PodcastStrip />
    <div style={{ position: "absolute", left: 60, top: 175 }}>
      <Marker size={92}>HAPPINESS</Marker>
      <Marker size={92} style={{ marginTop: 12 }}>
        IS A
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={130}>COOKIE</RedBox>
    </div>
    <Badge style={{ right: 40, top: 40 }}>Joscha Bach × Lex Fridman</Badge>
  </Frame>
);

/** O: media sosial sebagai otak global yang kejang. */
export const ThumbO: React.FC = () => (
  <Frame>
    <Icon name="network" x={1010} y={360} size={350} />
    <Icon name="bird" x={1010} y={360} size={160} />
    <Icon name="lightning" x={1180} y={210} size={140} rotate={14} />
    <PodcastStrip />
    <div style={{ position: "absolute", left: 60, top: 175 }}>
      <Marker size={80}>THE GLOBAL BRAIN</Marker>
      <Marker size={80} style={{ marginTop: 12 }} color={theme.red}>
        IS SICK
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={96}>PERMANENT SEIZURE</RedBox>
    </div>
    <Badge style={{ right: 40, top: 40 }}>Joscha Bach × Lex Fridman</Badge>
  </Frame>
);
