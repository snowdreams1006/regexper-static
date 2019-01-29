import React from 'react';
import PropTypes from 'prop-types';

import { getBBox } from 'layout';

import * as style from './style';

const Text = ({ quoted, theme, children }) => {
  return <text style={{ ...style.text, ...style[theme] }}>
    { quoted ? <>
      <tspan style={ style.quote }>&ldquo;</tspan>
      <tspan>{ children }</tspan>
      <tspan style={ style.quote }>&rdquo;</tspan>
    </> : children }
  </text>;
};

Text.propTypes = {
  quoted: PropTypes.bool,
  theme: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

const layout = data => {
  const { width, height } = getBBox(
    <Text { ...data.props }>{ data.children }</Text>);

  data.box = { width, height };
  return data;
};

export default Text;
export { layout };
