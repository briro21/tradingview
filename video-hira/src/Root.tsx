import React from 'react';
import {Composition} from 'remotion';
import {Pilot} from './Pilot';
import tl from './timeline.json';
export const FPS = 30;
export const Root: React.FC = () => (
  <Composition id="Pilot" component={Pilot} durationInFrames={Math.ceil(tl.total * FPS)} fps={FPS} width={1920} height={1080} />
);
