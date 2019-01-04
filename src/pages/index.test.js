import React from 'react';
import { shallow } from 'enzyme';

import IndexPage from 'pages/index';

describe('Index Page', () => {
  test('rendering', () => {
    const component = shallow(
      <IndexPage />
    );
    expect(component).toMatchSnapshot();
  });
});
