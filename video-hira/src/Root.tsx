import React from 'react';
import {Composition} from 'remotion';
import {Pilot} from './Pilot';
import {Film} from './Film';
import {HookFilm} from './HookFilm';
import {Full} from './Full';
import full from './full.json';
import hk from './hook_timeline.json';
import tl from './timeline.json';
export const FPS = 30;
export const Root: React.FC = () => (
  <>
  <Composition id="Film" component={Film} durationInFrames={Math.ceil(tl.total * FPS)} fps={FPS} width={1920} height={1080} />
  <Composition id="Hook" component={HookFilm} durationInFrames={Math.ceil(hk.total * FPS)} fps={FPS} width={1920} height={1080} />
  <Composition id="Full" component={Full} durationInFrames={Math.ceil(full.total * FPS)} fps={FPS} width={1920} height={1080} />
  <Composition id="Pilot" component={Pilot} durationInFrames={Math.ceil(tl.total * FPS)} fps={FPS} width={1920} height={1080} />
  </>
);
