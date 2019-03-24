import React from 'react';
import { render } from 'react-testing-library';

import Text, { layout } from 'rendering/Text';

describe('Text', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <svg>
        <Text>Example</Text>
      </svg>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('positioning text', () => {
    const { asFragment } = render(
      <svg>
        <Text transform="translate(1 2)">Example</Text>
      </svg>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering with a theme', () => {
    const { asFragment } = render(
      <svg>
        <Text theme="anchor">Example</Text>
      </svg>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering quoted text', () => {
    const { asFragment } = render(
      <svg>
        <Text quoted={ true }>Example</Text>
      </svg>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('layout', () => {
    global.Element.prototype.getBBox.mockReturnValue({
      width: 100,
      height: 20,
      y: 18
    });

    const processed = layout({
      type: 'Text',
      props: {
        property: 'example'
      },
      children: [
        'Example content'
      ]
    });
    expect(processed).toMatchSnapshot();
  });
});
