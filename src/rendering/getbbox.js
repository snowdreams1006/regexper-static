import React from 'react';
import ReactDOM from 'react-dom';

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

export default getBBox;
