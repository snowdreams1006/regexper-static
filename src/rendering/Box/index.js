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
  const labelProps = {
    transform: labelTransform,
    style: style.infoText
  };

  return <>
    <rect { ...rectProps }></rect>
    { label && <text { ...labelProps }>{ label }</text> }
    <g transform={ contentTransform }>
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
  useAnchors: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  rectTransform: PropTypes.string,
  labelTransform: PropTypes.string,
  contentTransform: PropTypes.string,
  children: PropTypes.node
};

const layout = data => {
  const { label, padding, useAnchors } = {
    ...Box.defaultProps,
    ...data.props
  };
  const childBox = data.children[0].box;
  const labelBox = label ?
    getBBox(<text style={ style.infoText }>{ label }</text>) :
    { width: 0, height: 0 };

  const width = Math.max(childBox.width + 2 * padding, labelBox.width);
  const height = childBox.height + 2 * padding;
  const content = {
    x: (width - childBox.width) / 2,
    y: padding + labelBox.height
  };

  data.box = {
    width,
    height: height + labelBox.height,
    axisY: useAnchors
      ? childBox.axisY + content.y
      : height / 2 + labelBox.height,
    axisX1: useAnchors
      ? childBox.axisX1 + content.x
      : 0,
    axisX2: useAnchors
      ? childBox.axisX2 + content.x
      : width
  };
  data.props = {
    ...data.props,
    width,
    height,
    rectTransform: `translate(0 ${ labelBox.height })`,
    labelTransform: `translate(0 ${ -labelBox.y })`,
    contentTransform: `translate(${ content.x } ${ content.y })`
  };
  return data;
};

export default Box;
export { layout };
