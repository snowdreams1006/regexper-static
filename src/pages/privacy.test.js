import React from 'react';
import { shallow } from 'enzyme';

import PrivacyPage from 'pages/privacy';

describe('Privacy Page', () => {
  test('rendering', () => {
    const component = shallow(
      <PrivacyPage />
    );
    expect(component).toMatchSnapshot();
  });
});
