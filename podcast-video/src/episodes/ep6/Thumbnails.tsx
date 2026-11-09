import React from "react";
import { theme } from "../../theme";
import { Badge, Frame, Icon, Marker, PodcastStrip, RedBox } from "../../Thumbnails";

// Thumbnail AI & krisis matematika (1280×720), Lex Fridman Podcast #503.

/** P: sama dengan frame pertama video (robot + "AI DROPPED 700 MATH PROOFS"). */
export const ThumbP: React.FC = () => (
  <Frame>
    <Icon name="robot" x={1050} y={400} size={380} />
    <PodcastStrip hours="3.5-HR" />
    <div style={{ position: "absolute", left: 60, top: 165 }}>
      <Marker size={84}>AI DROPPED</Marker>
      <Marker size={130} color={theme.red} style={{ marginTop: 6 }}>
        700
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={96}>MATH PROOFS</RedBox>
    </div>
    <Badge style={{ right: 40, top: 40 }}>Lex Fridman Podcast #503</Badge>
  </Frame>
);

/** Q: soal berhadiah $1 juta (Navier-Stokes) dipecahkan AI. */
export const ThumbQ: React.FC = () => (
  <Frame>
    <Icon name="vortex" x={1030} y={400} size={380} />
    <PodcastStrip hours="3.5-HR" />
    <div style={{ position: "absolute", left: 60, top: 165 }}>
      <Marker size={92}>AI CRACKED A</Marker>
      <Marker size={92} color={theme.green} style={{ marginTop: 12 }}>
        $1M PROBLEM
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={110}>NAVIER-STOKES</RedBox>
    </div>
    <Badge style={{ right: 40, top: 40 }}>Lex Fridman Podcast #503</Badge>
  </Frame>
);

/** R: matematikawan berduka (gunung + helikopter). */
export const ThumbR: React.FC = () => (
  <Frame>
    <Icon name="mountain" x={1020} y={380} size={320} />
    <Icon name="helicopter" x={1150} y={200} size={160} rotate={-8} />
    <PodcastStrip hours="3.5-HR" />
    <div style={{ position: "absolute", left: 60, top: 165 }}>
      <Marker size={84}>MATHEMATICIANS</Marker>
      <Marker size={84} style={{ marginTop: 12 }}>
        ARE
      </Marker>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 60 }}>
      <RedBox size={110}>IN MOURNING</RedBox>
    </div>
    <Badge style={{ right: 40, top: 40 }}>Lex Fridman Podcast #503</Badge>
  </Frame>
);
