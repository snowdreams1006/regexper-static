import React from 'react';
import { render } from 'react-testing-library';

import Pin, { layout } from 'rendering/Pin';

describe('Pin', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <svg>
        <Pin/>
      </svg>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('layout', () => {
    const processed = layout({
      type: 'Pin'
    });
    expect(processed).toMatchSnapshot();
  });
});
