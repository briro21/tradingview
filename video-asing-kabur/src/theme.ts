import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Font disimpan lokal di public/ supaya render tidak bergantung pada internet.
export const FONT = 'Montserrat';
loadFont({family: FONT, url: staticFile('montserrat-latin-900-normal.woff2'), weight: '900'});

export const C = {
  bg: '#0b1530',
  grid: 'rgba(120,150,220,0.08)',
  white: '#ffffff',
  red: '#ff4b3e',
  green: '#3ecf6b',
  yellow: '#ffc93c',
  orange: '#ffb26b',
  blue: '#3b7be0',
  ink: '#050505',
};
