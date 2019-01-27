import React from 'react';
import PropTypes from 'prop-types';

import * as style from './style';

const Text = ({ transform, quoted, children }) => {
  const textProps = {
    style: style.text,
    transform
  };

  return <text { ...textProps }>
    { quoted ? <>
      <tspan style={ style.quote }>&ldquo;</tspan>
      <tspan>{ children }</tspan>
      <tspan style={ style.quote }>&rdquo;</tspan>
    </> : children }
  </text>;
};

Text.propTypes = {
  quoted: PropTypes.bool,
  transform: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Text;
