import React from 'react';

import { getBBox } from 'layout';
import Text from 'rendering/Text';

const layoutText = data => {
  const {x, y, width, height } = getBBox(
    <Text { ...data.props }>{ data.children }</Text>);

  data.box = { width, height };
  data.props.transform = `translate(${ -x } ${ -y })`;
  return data;
};

export default layoutText;
