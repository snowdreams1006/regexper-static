import React from 'react';
import { shallow } from 'enzyme';

import Pin, { layout } from 'rendering/Pin';

describe('Pin', () => {
  test('rendering', () => {
    const component = shallow(
      <Pin/>
    );
    expect(component).toMatchSnapshot();
  });

  test('layout', () => {
    const processed = layout({
      type: 'Pin'
    });
    expect(processed).toMatchSnapshot();
  });
});
