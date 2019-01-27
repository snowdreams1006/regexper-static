import React from 'react';
import ReactDOM from 'react-dom';

import * as SVG from 'rendering/SVG';
import * as Text from 'rendering/Text';

const nodeTypes = {
  SVG,
  Text
};

const layout = data => {
  if (typeof data == 'string') {
    return data;
  }

  const { type } = data;

  if (data.children) {
    data.children = data.children.map(layout);
  }

  return nodeTypes[type].layout({
    props: {},
    ...data
  });
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
