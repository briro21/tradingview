import React from "react";
import { theme } from "../../theme";
import { Badge, Frame, Icon, Marker, RedBox } from "../../Thumbnails";

// Thumbnail Episode 3 (1280×720).

/** G: sama dengan frame pertama video (bidak catur, "not a naive saint"). */
export const ThumbG: React.FC = () => (
  <Frame>
    <Icon name="chess" x={1110} y={300} size={400} />
    <div style={{ position: "absolute", left: 60, top: 70 }}>
      <Marker size={84}>MLK WAS</Marker>
      <Marker size={84} style={{ marginTop: 14 }}>
        NOT A NAIVE SAINT
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={130}>A STRATEGIST</RedBox>
    </div>
    <Badge style={{ right: 50, bottom: 40 }}>Robert Greene, animated</Badge>
  </Frame>
);

/** H: topeng, kamu berbohong pada dirimu sendiri. */
export const ThumbH: React.FC = () => (
  <Frame>
    <Icon name="mirror" x={1010} y={340} size={460} />
    <Icon name="mask" x={1010} y={300} size={220} rotate={-8} />
    <div style={{ position: "absolute", left: 60, top: 60 }}>
      <Marker size={92}>"I'M A GOOD</Marker>
      <Marker size={92} style={{ marginTop: 12 }}>
        PERSON"
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <Marker size={80} color={theme.red}>
        YOU'RE LYING
      </Marker>
      <RedBox size={96} style={{ marginTop: 12 }}>
        TO YOURSELF
      </RedBox>
    </div>
    <Badge style={{ right: 50, top: 30 }}>Robert Greene</Badge>
  </Frame>
);

/** I: ahli kekuasaan yang kehilangan kendali atas tubuhnya. */
export const ThumbI: React.FC = () => (
  <Frame>
    <Icon name="crown" x={1000} y={130} size={200} rotate={14} />
    <Icon name="wheelchair" x={1000} y={420} size={400} />
    <div style={{ position: "absolute", left: 60, top: 70 }}>
      <Marker size={86}>THE POWER</Marker>
      <Marker size={86} style={{ marginTop: 12 }}>
        EXPERT
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <Marker size={86}>LOST CONTROL</Marker>
      <RedBox size={100} style={{ marginTop: 12 }}>
        OF HIS BODY
      </RedBox>
    </div>
    <Badge style={{ right: 50, bottom: 40 }}>48 Laws of Power author</Badge>
  </Frame>
);
