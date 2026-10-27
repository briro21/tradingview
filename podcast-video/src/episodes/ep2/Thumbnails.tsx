import React from "react";
import { theme } from "../../theme";
import { Badge, Frame, Icon, Marker, RedBox } from "../../Thumbnails";

// Thumbnail Episode 2 (1280×720).

/** D: insider yang melepas $2 juta demi memperingatkan kita. */
export const ThumbD: React.FC = () => (
  <Frame>
    <Icon name="money" x={1080} y={200} size={280} rotate={-6} />
    <svg width={300} height={250} style={{ position: "absolute", left: 930, top: 75 }}>
      <path d="M25 25 L275 225 M275 25 L25 225" stroke={theme.red} strokeWidth={22} strokeLinecap="round" />
    </svg>
    <Icon name="person" x={900} y={470} size={240} />
    <div style={{ position: "absolute", left: 60, top: 70 }}>
      <Marker size={110}>HE QUIT</Marker>
      <Marker size={118} color={theme.red} style={{ marginTop: 14 }}>
        $2,000,000
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 50 }}>
      <RedBox size={110}>TO WARN US</RedBox>
    </div>
    <Badge style={{ right: 50, bottom: 50 }}>Ex-OpenAI insider</Badge>
  </Frame>
);

/** E: 70% kemungkinan bencana. */
export const ThumbE: React.FC = () => (
  <Frame>
    <Icon name="skull" x={1010} y={300} size={420} />
    <Icon name="warning" x={1200} y={110} size={150} rotate={10} />
    <div style={{ position: "absolute", left: 60, top: 30 }}>
      <Marker size={300} color={theme.red}>
        70%
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 50 }}>
      <Marker size={84}>CHANCE OF</Marker>
      <RedBox size={94} style={{ marginTop: 10 }}>
        CATASTROPHE?
      </RedBox>
    </div>
    <Badge style={{ right: 50, bottom: 40 }}>AI 2027, animated</Badge>
  </Frame>
);

/** F: Plan A atau Plan D. */
export const ThumbF: React.FC = () => (
  <Frame>
    <div style={{ position: "absolute", left: 90, top: 80, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <Icon name="skull" x={160} y={110} size={220} />
      <div style={{ height: 230 }} />
      <Marker size={100} color={theme.red}>
        PLAN D
      </Marker>
    </div>
    <Marker size={90} style={{ position: "absolute", left: 590, top: 200 }}>
      or
    </Marker>
    <div style={{ position: "absolute", right: 90, top: 80, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <Icon name="city" x={160} y={110} size={230} />
      <div style={{ height: 230 }} />
      <Marker size={100} color={theme.green}>
        PLAN A
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 50, textAlign: "center" }}>
      <RedBox size={100}>THE ONLY WAY OUT</RedBox>
    </div>
    <Badge style={{ left: 40, top: 30 }}>AI 2027</Badge>
  </Frame>
);
