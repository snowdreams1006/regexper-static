import React from 'react';
import { shallow } from 'enzyme';

import ErrorPage from 'pages/404';

describe('Error Page', () => {
  test('rendering', () => {
    const component = shallow(
      <ErrorPage />
    );
    expect(component).toMatchSnapshot();
  });
});
