import React from 'react';
import { shallow } from 'enzyme';

import { mockT } from 'i18n';
import { PrivacyPolicy } from 'components/PrivacyPolicy';

describe('PrivacyPolicy', () => {
  test('rendering', () => {
    const component = shallow(
      <PrivacyPolicy onClose={ jest.fn() } t={ mockT } />
    );
    expect(component).toMatchSnapshot();
  });
});
