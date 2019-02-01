import React from 'react';
import { shallow } from 'enzyme';

import SVG, { layout } from 'rendering/SVG';

describe('SVG', () => {
  test('rendering', () => {
    const component = shallow(
      <SVG width={ 100 } height={ 20 }>Content</SVG>
    );
    expect(component).toMatchSnapshot();
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
