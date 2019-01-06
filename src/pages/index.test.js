import React from 'react';
import { shallow } from 'enzyme';

import { IndexPageImpl } from 'pages/index';

describe('Index Page', () => {
  test('rendering', () => {
    const component = shallow(
      <IndexPageImpl />
    );
    expect(component).toMatchSnapshot();
  });
});
