jest.mock('components/SentryBoundary', () =>
  require('__mocks__/component-mock')('components/SentryBoundary'));
jest.mock('components/Header', () =>
  require('__mocks__/component-mock')('components/Header'));
jest.mock('components/Footer', () =>
  require('__mocks__/component-mock')('components/Footer'));

import React from 'react';
import { render } from 'react-testing-library';

import { Layout } from 'components/Layout';

describe('Layout', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <Layout banner="Test Banner" buildId="test-buildid">
        Example content
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
