import React from 'react';

import * as style from './style';

const radius = 5;

const Pin = () => <circle
  style={ style.pin }
  r={ radius }
  transform={ `translate(${ radius } ${ radius })` }/>;

const layout = data => {
  data.box = {
    width: radius * 2,
    height: radius * 2
  };
  return data;
};

export default Pin;
export { layout };
