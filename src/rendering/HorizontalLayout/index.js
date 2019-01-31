import React from 'react';
import PropTypes from 'prop-types';

import * as style from 'rendering/style';

const HorizontalLayout = ({
  withConnectors,
  connectorPath,
  transforms,
  children
}) => <>
  { withConnectors && <path style={ style.connectors } d={ connectorPath }/> }
  { React.Children.map(children, (child, i) => (
    <g transform={ transforms[i] }>{ child }</g>
  )) }
</>;

HorizontalLayout.defaultProps = {
  withConnectors: false,
  spacing: 10
};

HorizontalLayout.propTypes = {
  spacing: PropTypes.number,
  withConnectors: PropTypes.bool,
  connectorPath: PropTypes.string,
  transforms: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

const generateOffsetBoxes = (boxes, axisY, spacing) => {
  let x = 0;
  return boxes.map(box => {
    try {
      const y = axisY - box.axisY;
      return {
        ...box,
        x, y,
        axisX1: x + box.axisX1,
        axisX2: x + box.axisX2,
        axisY: y + box.axisY
      };
    }
    finally {
      x += box.width + spacing;
    }
  });
};
const calculateChildTransforms = boxes =>
  boxes.map(box => `translate(${ box.x } ${ box.y })`);
const calculateConnectorPath = boxes => {
  let last = boxes[0];
  return boxes.slice(1).map(box => {
    try {
      return `M${ last.axisX2 },${ box.axisY } H${ box.axisX1 }`;
    }
    finally {
      last = box;
    }
  }).join('\n');
};
const layout = data => {
  const { withConnectors, spacing } = {
    ...HorizontalLayout.defaultProps,
    ...data.props
  };
  const childBoxes = data.children.map(child => child.box);

  data.box = {
    width: childBoxes.reduce((width, box) => width + box.width, 0) +
           (childBoxes.length - 1) * spacing,
    height: Math.max(...(childBoxes.map(box => box.axisY))) +
            Math.max(...(childBoxes.map(box => box.height - box.axisY))),
    axisY: Math.max(...(childBoxes.map(box => box.axisY)))
  };

  const offsetBoxes = generateOffsetBoxes(childBoxes, data.box.axisY, spacing);
  data.box.axisX1 = offsetBoxes[0].axisX1;
  data.box.axisX2 = offsetBoxes[offsetBoxes.length - 1].axisX2;
  data.props = {
    ...data.props,
    transforms: calculateChildTransforms(offsetBoxes),
    connectorPath: withConnectors
      ? calculateConnectorPath(offsetBoxes)
      : undefined
  };

  return data;
};

export default HorizontalLayout;
export { layout };
