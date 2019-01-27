import React from 'react';
import PropTypes from 'prop-types';

import { getBBox } from 'layout';

import * as style from './style';

const Box = ({
  theme,
  radius,
  label,
  width,
  height,
  rectTransform,
  labelTransform,
  contentTransform,
  children
}) => {
  const rectProps = {
    style: style[theme],
    width,
    height,
    rx: radius,
    ry: radius,
    transform: rectTransform
  };
  const textProps = {
    transform: labelTransform,
    style: style.infoText
  };

  return <>
    <rect { ...rectProps }></rect>
    { label && <text { ...textProps }>{ label }</text> }
    <g transform={ contentTransform}>
      { children }
    </g>
  </>;
};

Box.defaultProps = {
  padding: 5,
  radius: 3
};

Box.propTypes = {
  theme: PropTypes.string,
  radius: PropTypes.number,
  padding: PropTypes.number,
  label: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  rectTransform: PropTypes.string,
  labelTransform: PropTypes.string,
  contentTransform: PropTypes.string,
  children: PropTypes.node
};

const layout = data => {
  const { label, padding } = {
    ...Box.defaultProps,
    ...data.props
  };
  const childBox = data.children[0].box;
  const labelBox = label ?
    getBBox(<text style={ style.infoText }>{ label }</text>) :
    { width: 0, height: 0 };

  data.box = {
    width: Math.max(childBox.width + 2 * padding, labelBox.width),
    height: childBox.height + 2 * padding + labelBox.height
  };
  data.props = {
    ...data.props,
    width: data.box.width,
    height: childBox.height + 2 * padding,
    rectTransform: `translate(0 ${ labelBox.height })`,
    labelTransform: `translate(0 ${ labelBox.height })`,
    contentTransform: `translate(${ padding } ${ padding + labelBox.height })`
  };
  return data;
};

export default Box;
export { layout };
