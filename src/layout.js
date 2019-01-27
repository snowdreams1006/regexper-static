import React from 'react';
import ReactDOM from 'react-dom';

import nodeTypes from 'rendering/types';

const normalizeBBox = box => ({
  width: 0,
  height: 0,
  axisY: (box.height || 0) / 2,
  axisX1: 0,
  axisX2: (box.width || 0),
  ...box
});

const layout = data => {
  if (typeof data == 'string') {
    return data;
  }

  const { type } = data;

  if (data.children) {
    data.children = data.children.map(layout);
  }

  const result = nodeTypes[type].layout({
    props: {},
    ...data
  });

  return {
    ...result,
    box: normalizeBBox(result.box)
  };
};

const getBBox = content => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  ReactDOM.render(
    <svg width="0" height="0" viewBox="0 0 0 0">
      <g>{ content }</g>
    </svg>, container);

  const box = container.querySelector('svg > g').getBBox();
  document.body.removeChild(container);

  return box;
};

export default layout;
export { getBBox };
