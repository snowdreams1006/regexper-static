import React from 'react';
import PropTypes from 'prop-types';

import QuadraticCurve from './quadratic-curve';

import * as style from 'rendering/style';

const radius = 10;

const VerticalLayout = ({
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

VerticalLayout.defaultProps = {
  withConnectors: false,
  spacing: 10
};

VerticalLayout.propTypes = {
  spacing: PropTypes.number,
  withConnectors: PropTypes.bool,
  connectorPath: PropTypes.string,
  transforms: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

const generateOffsetBoxes = (boxes, spacing, containerWidth) => {
  let y = 0;
  return boxes.map(box => {
    try {
      const x = (containerWidth - box.width) / 2;
      return {
        ...box,
        x, y,
        axisX1: x + box.axisX1,
        axisX2: x + box.axisX2,
        axisY: y + box.axisY
      };
    }
    finally {
      y += spacing + box.height;
    }
  });
};
const calculateChildTransforms = boxes =>
  boxes.map(box => `translate(${ box.x } ${ box.y })`);
const linear = (start, end, amount) => start * (1 - amount) + end * amount;
const generateCurve = (start, end) => {
  const curve = new QuadraticCurve();
  const width = Math.abs(start.x - end.x);
  const height = Math.abs(start.y - end.y);
  const direction = {
    x: start.x < end.x ? 1 : -1,
    y: start.y < end.y ? 1 : -1
  };
  const compression = Math.max(0, 1 - height / (2 * radius));
  const curveEnd = linear(radius * 2, width, compression);

  curve.addPoint({
    x: linear(radius, width * 0.25, compression) * direction.x,
    y: 0
  });

  if (compression === 0) {
    curve.addPoint({
      x: radius * direction.x,
      y: radius * direction.y
    });
  }

  curve.addPoint({
    x: linear(radius, width * 0.5, compression) * direction.x,
    y: height / 2 * direction.y
  });

  if (compression === 0) {
    curve.addPoint({
      x: radius * direction.x,
      y: (height - radius) * direction.y
    });
  }

  curve
    .addPoint({
      x: linear(radius, width * 0.75, compression) * direction.x,
      y: height * direction.y
    })
    .addPoint({
      x: curveEnd * direction.x,
      y: height * direction.y
    });

  if (width > curveEnd) {
    curve
      .addPoint({
        x: (width + curveEnd) / 2 * direction.x,
        y: height * direction.y
      })
      .addPoint({
        x: width * direction.x,
        y: height * direction.y
      });
  }

  return `M ${ start.x },${ start.y } ${ curve.toString() }`;
};
const calculateConnectorPath = (boxes, { width, height }) => {
  const connectorY = height / 2;
  const start1 = { x: 0, y: connectorY };
  const start2 = { x: width, y: connectorY };

  return boxes.map(box => `
    ${ generateCurve(start1, { x: box.axisX1, y: box.axisY }) }
    ${ generateCurve(start2, { x: box.axisX2, y: box.axisY }) }
  `).join('');
};
const layout = data => {
  const { withConnectors, spacing } = {
    ...VerticalLayout.defaultProps,
    ...data.props
  };

  const childBoxes = data.children.map(child => child.box);
  const curveAllowance = withConnectors ? radius * 2 : 0;

  data.box = {
    width: Math.max(...(childBoxes.map(box => box.width))) +
           2 * curveAllowance,
    height: childBoxes.reduce((height, box) => height + box.height, 0) +
            (childBoxes.length - 1) * spacing
  };

  const offsetBoxes = generateOffsetBoxes(childBoxes, spacing, data.box.width);
  data.props = {
    ...data.props,
    transforms: calculateChildTransforms(offsetBoxes),
    connectorPath: withConnectors
      ? calculateConnectorPath(offsetBoxes, data.box)
      : undefined
  };

  return data;
};

export default VerticalLayout;
export { layout };
