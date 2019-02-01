import React from 'react';
import PropTypes from 'prop-types';

import getBBox from 'rendering/getbbox';

import * as style from 'rendering/style';

const radius = 10;
const arrowSize = 5;

const Loop = ({
  label,
  labelTransform,
  contentTransform,
  loopPaths,
  children
}) => {
  const labelProps = {
    transform: labelTransform,
    style: style.infoText
  };

  return <>
    <path style={ style.connectors } d={ loopPaths }/>
    { label && <text { ...labelProps }>{ label }</text> }
    <g transform={ contentTransform }>
      { children }
    </g>
  </>;
};

Loop.propTypes = {
  label: PropTypes.string,
  greedy: PropTypes.bool,
  skip: PropTypes.bool,
  repeat: PropTypes.bool,
  labelTransform: PropTypes.string,
  contentTransform: PropTypes.string,
  loopPaths: PropTypes.string,
  children: PropTypes.node.isRequired
};

const generateOffsetBox = (box, { skip, repeat }) => {
  let x = 0;
  let y = 0;

  if (skip) {
    x = 1.5 * radius;
    y = radius;
  } else if (repeat) {
    x = radius;
  }

  return {
    ...box,
    x, y,
    axisX1: x + box.axisX1,
    axisX2: x + box.axisX2,
    axisY: y + box.axisY
  };
};
const skipPath = (box, greedy) => {
  const vert = Math.max(0, box.axisY - box.y - radius);
  const horiz = box.width - radius;

  return `
    M 0,${ box.axisY }
    q ${ radius },0 ${ radius },${ -radius }
    v ${ -vert }
    q 0,${ -radius } ${ radius },${ -radius }
    h ${ horiz }
    q ${ radius },0 ${ radius },${ radius }
    v ${ vert }
    q 0,${ radius } ${ radius },${ radius }
  ` + (greedy ? '' : `
    M ${ radius },${ box.axisY - 1.5 * radius }
    l ${ arrowSize },${ arrowSize }
    z
    l ${ -arrowSize },${ arrowSize }
  `);
};
const repeatPath = (box, greedy) => {
  const vert = box.y + box.height - box.axisY - radius;

  return `
    M ${ box.x },${ box.axisY }
    q ${ -radius },0 ${ -radius },${ radius }
    v ${ vert }
    q 0,${ radius } ${ radius },${ radius }
    h ${ box.width }
    q ${ radius },0 ${ radius },${ -radius }
    v ${ -vert }
    q 0,${ -radius } ${ -radius },${ -radius }
  ` + (greedy ? `
    m ${ radius },${ 1.5 * radius }
    l ${ arrowSize },${ -arrowSize }
    z
    l ${ -arrowSize },${ -arrowSize }
  ` : '');
};
const layout = data => {
  const { label, greedy, skip, repeat } = data.props || {};
  const childBox = generateOffsetBox(data.children[0].box, { skip, repeat });
  const labelBox = label ?
    getBBox(<text style={ style.infoText }>{ label }</text>) :
    { width: 0, height: 0 };
  const width = childBox.width + childBox.x * 2;
  const height = childBox.height + labelBox.height +
    (skip ? 10 : 0) + (repeat ? 10 : 0);

  data.box = {
    width,
    height,
    axisY: childBox.axisY,
    axisX1: childBox.axisX1,
    axisX2: childBox.axisX2
  };

  data.props = {
    ...data.props,
    labelTransform: `translate(${ width - labelBox.width } ${ height })`,
    contentTransform: `translate(${ childBox.x } ${ childBox.y })`,
    loopPaths: [
      skip && skipPath(childBox, greedy),
      repeat && repeatPath(childBox, greedy)
    ].filter(Boolean).join('')
  };

  return data;
};

export default Loop;
export { layout };
