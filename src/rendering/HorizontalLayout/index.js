import React from 'react';
import PropTypes from 'prop-types';

import * as style from 'rendering/style';

const HorizontalLayout = ({ connectorPath, transforms, children }) => {
  return <>
    <path style={ style.connectors } d={ connectorPath }/>
    { React.Children.map(children, (child, i) => (
      <g transform={ transforms[i] }>{ child }</g>
    )) }
  </>;
};

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
  let offset = 0;
  return boxes.map(box => {
    try {
      return {
        ...box,
        offsetX: offset,
        offsetY: axisY - box.axisY
      };
    }
    finally {
      offset += box.width + spacing;
    }
  });
};
const calculateChildTransforms = boxes =>
  boxes.map(box => `translate(${ box.offsetX } ${ box.offsetY })`);
const calculateConnectorPath = (boxes, axisY) => {
  let last = boxes[0];
  return boxes.slice(1).map(box => {
    try {
      return `
        M${ last.offsetX + last.axisX2 },${ axisY }
        H${ box.offsetX + box.axisX1 }
      `;
    }
    finally {
      last = box;
    }
  }).join('');
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
  data.props = {
    ...data.props,
    transforms: calculateChildTransforms(offsetBoxes),
    connectorPath: withConnectors
      ? calculateConnectorPath(offsetBoxes, data.box.axisY)
      : undefined
  };

  return data;
};

export default HorizontalLayout;
export { layout };
