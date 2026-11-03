import React from "react";
import { theme } from "../../theme";
import { Badge, Frame, Icon, Marker, RedBox } from "../../Thumbnails";

// Thumbnail Episode 4 (1280×720).

/** J: sama dengan frame pertama video (kotak di bawah lantai). */
export const ThumbJ: React.FC = () => (
  <Frame>
    <Icon name="ruin" x={1000} y={260} size={340} />
    <Icon name="planks" x={1000} y={540} size={300} />
    <Icon name="lockbox" x={1000} y={560} size={150} />
    <svg width={260} height={260} style={{ position: "absolute", left: 870, top: 430, overflow: "visible" }}>
      <path d="M130 130 m-125 0 a125 115 0 1 0 250 0 a125 115 0 1 0 -250 0" stroke={theme.red} strokeWidth={10} fill="none" />
    </svg>
    <div style={{ position: "absolute", left: 60, top: 70 }}>
      <Marker size={90}>WHAT WAS</Marker>
      <Marker size={90} style={{ marginTop: 12 }}>
        UNDER THE
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={130}>FLOOR?</RedBox>
    </div>
    <Badge style={{ right: 40, top: 30 }}>abandoned 1912 mansion</Badge>
  </Frame>
);

/** K: sebelum dan sesudah. */
export const ThumbK: React.FC = () => (
  <Frame>
    <Icon name="ruin" x={300} y={250} size={360} />
    <Icon name="mansion" x={980} y={240} size={400} />
    <svg width={200} height={80} style={{ position: "absolute", left: 540, top: 200, overflow: "visible" }}>
      <path d="M10 50 C70 10 130 10 180 40 M160 18 L182 42 L152 56" stroke={theme.green} strokeWidth={10} fill="none" strokeLinecap="round" />
    </svg>
    <Marker size={60} style={{ position: "absolute", left: 200, top: 430 }}>
      100 YEARS
    </Marker>
    <Marker size={60} color={theme.green} style={{ position: "absolute", left: 870, top: 430 }}>
      REBORN
    </Marker>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 50, textAlign: "center" }}>
      <RedBox size={96}>BACK FROM THE DEAD</RedBox>
    </div>
  </Frame>
);

/** L: peta sayap rahasia. */
export const ThumbL: React.FC = () => (
  <Frame>
    <Icon name="secretMap" x={980} y={330} size={480} rotate={4} />
    <Icon name="ghost" x={1170} y={120} size={160} rotate={10} />
    <div style={{ position: "absolute", left: 60, top: 70 }}>
      <Marker size={86}>A SECRET WING</Marker>
      <Marker size={86} style={{ marginTop: 12 }} color={theme.red}>
        NOBODY KNEW
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={100}>HIDDEN 100 YEARS</RedBox>
    </div>
  </Frame>
);
