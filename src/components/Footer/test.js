import React from 'react';
import { render } from 'react-testing-library';

import { mockT } from 'i18n';
import Footer from 'components/Footer';

describe('Footer', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <Footer buildId="abc-123" t={ mockT } />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
