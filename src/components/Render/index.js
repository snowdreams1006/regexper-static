import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import nodeTypes from 'rendering/types';

import style from './style.module.css';

const debugBox = {
  fill: 'transparent',
  stroke: 'red',
  strokeWidth: '1px',
  strokeDasharray: '2,2',
  opacity: 0.5
};
const debugPin = {
  fill: 'red',
  opacity: 0.5
};
// eslint-disable-next-line react/prop-types
const renderDebug = ({ x, y, width, height, axisX1, axisX2, axisY }) => <>
  <rect style={ debugBox } x={ x } y={ y } width={ width } height={ height }/>
  <circle style={ debugPin } cx={ axisX1 } cy={ axisY } r="3" />
  <circle style={ debugPin } cx={ axisX2 } cy={ axisY } r="3" />
</>;

const render = (data, key) => {
  if (typeof data === 'string') {
    return data;
  }

  const { type, props, debug, box } = data;
  const children = (data.children || []).map(render);

  return <React.Fragment key={ key }>
    { React.createElement(
      nodeTypes[type] ? nodeTypes[type].default : type,
      props,
      children.length === 1 ? children[0] : children) }
    { debug && renderDebug(box) }
  </React.Fragment>;
};

const Render = ({ data, onRender }) => {
  const svgContainer = useRef();

  const provideSVGData = useCallback(() => {
    if (!svgContainer.current) {
      return;
    }

    const svg = svgContainer.current.querySelector('svg');
    onRender({
      svg: svg.outerHTML,
      width: Number(svg.getAttribute('width')),
      height: Number(svg.getAttribute('height'))
    });
  }, [svgContainer, onRender]);

  useEffect(() => {
    provideSVGData();
  }, [provideSVGData]);

  return <div className={ style.render } ref={ svgContainer }>
    { render({
      ...data,
      props: {
        ...data.props,
        onReflow: provideSVGData
      }
    }) }
  </div>;
};

Render.propTypes = {
  data: PropTypes.object.isRequired,
  onRender: PropTypes.func.isRequired
};

export default Render;
