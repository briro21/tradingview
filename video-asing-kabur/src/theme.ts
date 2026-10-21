import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Font disimpan lokal di public/ supaya render tidak bergantung pada internet.
export const FONT = 'Montserrat';
loadFont({family: FONT, url: staticFile('montserrat-latin-900-normal.woff2'), weight: '900'});

import {createContext, useContext} from 'react';

// Tema latar: 'dark' (biru gelap) atau 'light' (krem terang). Warna aksen sama di keduanya.
export type ThemeName = 'dark' | 'light';
export const THEMES = {
  dark: {bg: '#0b1530', grid: 'rgba(120,150,220,0.08)', muted: '#9fb3e0', line: '#ffffff', text: '#ffffff'},
  light: {bg: '#f5f0e6', grid: 'rgba(20,30,60,0.07)', muted: '#5b6478', line: '#1d2433', text: '#1d2433'},
};
// Tema bawaan untuk video baru.
export const DEFAULT_THEME: ThemeName = 'light';
export const ThemeCtx = createContext<ThemeName>('dark');
export const useTheme = () => THEMES[useContext(ThemeCtx)];

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
