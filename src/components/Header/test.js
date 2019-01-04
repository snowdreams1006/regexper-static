import React from 'react';
import { shallow } from 'enzyme';

import Header, { HeaderImpl } from 'components/Header';

describe('Header', () => {
  test('rendering with query', () => {
    const component = shallow(
      <Header />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering implementation', () => {
    const component = shallow(
      <HeaderImpl site={{ siteMetadata: { banner: 'testing' } }} />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering implementation with no banner', () => {
    const component = shallow(
      <HeaderImpl site={{ siteMetadata: { banner: false } }} />
    );
    expect(component).toMatchSnapshot();
  });
});
