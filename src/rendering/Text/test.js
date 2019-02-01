import React from 'react';
import { shallow } from 'enzyme';

import Text, { layout } from 'rendering/Text';

describe('Text', () => {
  test('rendering', () => {
    const component = shallow(
      <Text>Example</Text>
    );
    expect(component).toMatchSnapshot();
  });

  test('positioning text', () => {
    const component = shallow(
      <Text transform="translate(1 2)">Example</Text>
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with a theme', () => {
    const component = shallow(
      <Text theme="anchor">Example</Text>
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering quoted text', () => {
    const component = shallow(
      <Text quoted={ true }>Example</Text>
    );
    expect(component).toMatchSnapshot();
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
