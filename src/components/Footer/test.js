import React from 'react';
import { shallow } from 'enzyme';

import { mockT } from 'i18n';
import { Footer } from 'components/Footer';

describe('Footer', () => {
  test('rendering', () => {
    const component = shallow(
      <Footer buildId="abc-123" t={ mockT } />
    );
    expect(component).toMatchSnapshot();
  });
});
