jest.mock('components/Metadata', () =>
  require('__mocks__/component-mock')('components/Metadata'));
jest.mock('components/PrivacyPolicy', () =>
  require('__mocks__/component-mock')('components/PrivacyPolicy'));

import React from 'react';
import { render } from 'react-testing-library';

import PrivacyPage from 'pages/privacy';

describe('Privacy Page', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <PrivacyPage/>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
