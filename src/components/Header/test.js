import React from 'react';
import { shallow } from 'enzyme';

import { Header } from 'components/Header';

describe('Header', () => {
  test('rendering', () => {
    const component = shallow(
      <Header site={{ siteMetadata: { banner: 'testing' } }} />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with no banner', () => {
    const component = shallow(
      <Header site={{ siteMetadata: { banner: false } }} />
    );
    expect(component).toMatchSnapshot();
  });
});
