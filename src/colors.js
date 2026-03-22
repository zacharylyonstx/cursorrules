'use strict';

// Zero-dependency ANSI color helpers
const esc = (code) => (s) => `\x1b[${code}m${s}\x1b[0m`;

module.exports = {
  bold: esc('1'),
  dim: esc('2'),
  green: esc('32'),
  yellow: esc('33'),
  blue: esc('34'),
  magenta: esc('35'),
  cyan: esc('36'),
  red: esc('31'),
  gray: esc('90'),
  white: esc('37'),
  bgGreen: esc('42;30'),
  bgBlue: esc('44;37'),
  bgYellow: esc('43;30'),
  bgMagenta: esc('45;37'),
  // Symbols
  CHECK: '✔',
  CROSS: '✖',
  ARROW: '→',
  STAR: '★',
  SPARKLE: '✨',
  BOLT: '⚡',
  DOT: '●',
  WARN: '⚠',
};
