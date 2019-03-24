jest.mock('@sentry/browser');
jest.mock('components/SentryError', () =>
  require('__mocks__/component-mock')('components/SentryError'));

import React from 'react';
import { render } from 'react-testing-library';
import * as Sentry from '@sentry/browser';

import SentryBoundary from 'components/SentryBoundary';

describe('SentryBoundary', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <SentryBoundary>
        Example content
      </SentryBoundary>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('error handling', () => {
    // Hide React's console logging about the error
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const error =new Error('Example error');
    const Child = ({ shouldThrow }) => {
      if (shouldThrow) {
        throw error;
      }

      return 'Example content';
    };
    const { asFragment, rerender } = render(
      <SentryBoundary>
        <Child shouldThrow={ false } />
      </SentryBoundary>
    );
    expect(asFragment()).toMatchSnapshot();

    rerender(
      <SentryBoundary>
        <Child shouldThrow={ true } />
      </SentryBoundary>
    );

    const scope = { setExtra: jest.fn() };
    expect(Sentry.withScope).toHaveBeenCalled();

    Sentry.withScope.mock.calls[0][0](scope);
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
    expect(asFragment()).toMatchSnapshot();
  });
});
