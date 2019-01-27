import React from 'react';
import PropTypes from 'prop-types';

import { getBBox } from 'layout';

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

const layout = data => {
  const {x, y, width, height } = getBBox(
    <Text { ...data.props }>{ data.children }</Text>);

  data.box = { width, height };
  data.props.transform = `translate(${ -x } ${ -y })`;
  return data;
};

export default Text;
export { layout };
