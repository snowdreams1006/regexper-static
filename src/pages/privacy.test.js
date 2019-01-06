import React from 'react';
import { shallow } from 'enzyme';

import { mockT } from 'i18n';
import { PrivacyPageImpl } from 'pages/privacy';

describe('Privacy Page', () => {
  test('rendering', () => {
    const component = shallow(
      <PrivacyPageImpl t={ mockT } />
    );
    expect(component).toMatchSnapshot();
  });
});
