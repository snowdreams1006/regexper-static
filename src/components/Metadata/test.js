import React from 'react';
import { shallow } from 'enzyme';

import Metadata from 'components/Metadata';

describe('Metadata', () => {
  test('rendering', () => {
    const component = shallow(
      <Metadata />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with a title', () => {
    const component = shallow(
      <Metadata title="Testing" />
    );
    expect(component).toMatchSnapshot();
  });
});
