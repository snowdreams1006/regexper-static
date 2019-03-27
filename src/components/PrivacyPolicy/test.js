jest.mock('components/Message', () =>
  require('__mocks__/component-mock')('components/Message'));

import React from 'react';
import { render } from 'react-testing-library';

import PrivacyPolicy from 'components/PrivacyPolicy';

describe('PrivacyPolicy', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <PrivacyPolicy onClose={ jest.fn() } />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
