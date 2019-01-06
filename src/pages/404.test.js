import React from 'react';
import { shallow } from 'enzyme';

import { mockT } from 'i18n';
import { ErrorPage } from 'pages/404';

describe('Error Page', () => {
  test('rendering', () => {
    const component = shallow(
      <ErrorPage t={ mockT } />
    );
    expect(component).toMatchSnapshot();
  });
});