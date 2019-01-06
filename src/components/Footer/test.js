import React from 'react';
import { shallow } from 'enzyme';

import { mockT } from 'i18n';
import Footer, { FooterImpl } from 'components/Footer';

describe('Footer', () => {
  test('rendering with query', () => {
    const component = shallow(
      <Footer />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering implementation', () => {
    const component = shallow(
      <FooterImpl site={{ siteMetadata: { buildId: 'abc-123' } }} t={ mockT } />
    );
    expect(component).toMatchSnapshot();
  });
});
