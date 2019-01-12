jest.mock('@sentry/browser');

import React from 'react';
import { shallow } from 'enzyme';
import * as Sentry from '@sentry/browser';

import SentryBoundary from 'components/SentryBoundary';

describe('SentryBoundary', () => {
  test('rendering', () => {
    const component = shallow(
      <SentryBoundary>
        Example content
      </SentryBoundary>
    );
    expect(component).toMatchSnapshot();
  });

  test('error handling', () => {
    const Child = () => 'Example content';
    const component = shallow(
      <SentryBoundary>
        <Child />
      </SentryBoundary>
    );
    expect(component).toMatchSnapshot();

    const error = new Error('Example error');
    component.find('Child').simulateError(error);
    // NOTE: Enzyme doesn't call getDerivedStateFromError yet, so we have to
    // set the state manually
    component.setState(SentryBoundary.getDerivedStateFromError(error));

    const scope = { setExtra: jest.fn() };
    expect(Sentry.withScope).toHaveBeenCalled();

    Sentry.withScope.mock.calls[0][0](scope);
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
    expect(component).toMatchSnapshot();
  });
});
