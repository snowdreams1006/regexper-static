import React from 'react';
import ReactDOM from 'react-dom';

import Text from 'rendering/Text';

const layoutText = data => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  ReactDOM.render(
    <svg width="0" height="0" viewBox="0 0 0 0">
      <Text { ...data.props }>{ data.children }</Text>
    </svg>,
    container);

  const box = container.querySelector('svg > text').getBBox();
  document.body.removeChild(container);

  data.box = {
    width: box.width,
    height: box.height
  };
  data.props.transform = `translate(${ -box.x } ${ -box.y })`;
  return data;
};

export default layoutText;
