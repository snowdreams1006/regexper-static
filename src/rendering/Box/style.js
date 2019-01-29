import {
  green,
  brown,
  tan,
  grey,
  blue,
  fontFamily,
  fontSizeSmall,
  strokeBase
} from 'rendering/style';

export const literal = {
  fill: blue,
  strokeWidth: '1px',
  stroke: brown
};
export const escape = {
  fill: green,
  strokeWidth: '1px',
  stroke: brown
};
export const charClass = {
  fill: tan
};
export const capture = {
  fillOpacity: 0,
  ...strokeBase,
  stroke: grey,
  strokeDasharray: '6,2'
};
export const anchor = {
  fill: brown
};
export const infoText = {
  fontSize: fontSizeSmall,
  fontFamily: fontFamily,
  dominantBaseline: 'text-before-edge'
};
