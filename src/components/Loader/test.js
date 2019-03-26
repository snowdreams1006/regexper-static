import React from 'react';
import { render } from 'react-testing-library';

import Loader from 'components/Loader';

describe('Loader', () => {
  test('rendering', () => {
    // Using full rendering here since styles for this depend on the structure
    // of the SVG.
    const { asFragment } = render(
      <Loader/>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
