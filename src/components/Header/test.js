import React from 'react';
import { shallow } from 'enzyme';

import { Header } from 'components/Header';

describe('Header', () => {
  test('rendering', () => {
    const component = shallow(
      <Header banner="testing" />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with no banner', () => {
    const component = shallow(
      <Header banner={ false } />
    );
    expect(component).toMatchSnapshot();
  });
});
