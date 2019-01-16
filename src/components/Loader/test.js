import React from 'react';
import { mount } from 'enzyme';

import { mockT } from 'i18n';
import { Loader } from 'components/Loader';

describe('Loader', () => {
  test('rendering', () => {
    // Using full rendering here since styles for this depend on the structure
    // of the SVG.
    const component = mount(
      <Loader t={ mockT } />
    );
    expect(component).toMatchSnapshot();
  });
});
