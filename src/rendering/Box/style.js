import {
  green,
  brown,
  tan,
  grey,
  blue,
  strokeBase,
  infoText
} from 'rendering/style';

export { infoText };
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
