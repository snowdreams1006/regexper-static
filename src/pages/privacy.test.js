import React from 'react';
import { shallow } from 'enzyme';

import { mockT } from 'i18n';
import { PrivacyPage } from 'pages/privacy';

describe('Privacy Page', () => {
  test('rendering', () => {
    const component = shallow(
      <PrivacyPage t={ mockT } />
    );
    expect(component).toMatchSnapshot();
  });
});
