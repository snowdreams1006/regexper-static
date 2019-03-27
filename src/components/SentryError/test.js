jest.mock('@sentry/browser');

jest.mock('components/Message', () =>
  require('__mocks__/component-mock')('components/Message'));

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import * as Sentry from '@sentry/browser';

import SentryError from 'components/SentryError';

describe('SentryError', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <SentryError/>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe('error reporting', () => {
    test('fill out a report when an event has been logged', () => {
      Sentry.lastEventId.mockReturnValue(1);
      const { getByTestId } = render(
        <SentryError/>
      );
      const event = new MouseEvent('click', { bubbles: true });
      jest.spyOn(event, 'preventDefault');
      fireEvent(getByTestId('error-report'), event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(Sentry.showReportDialog).toHaveBeenCalled();
    });

    test('fill out a report when an event has not been logged', () => {
      Sentry.lastEventId.mockReturnValue(false);
      const { getByTestId } = render(
        <SentryError/>
      );
      const event = new MouseEvent('click', { bubbles: true });
      jest.spyOn(event, 'preventDefault');
      fireEvent(getByTestId('error-report'), event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(Sentry.showReportDialog).not.toHaveBeenCalled();
    });
  });
});
