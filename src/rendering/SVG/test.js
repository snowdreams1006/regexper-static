import React from 'react';
import { render } from 'react-testing-library';

import SVG, { layout } from 'rendering/SVG';

describe('SVG', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <SVG width={ 100 } height={ 20 }>Content</SVG>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('layout', () => {
    const processed = layout({
      type: 'SVG',
      children: [
        {
          type: 'Text',
          box: {
            width: 100,
            height: 20
          }
        }
      ]
    });
    expect(processed).toMatchSnapshot();
  });
});
