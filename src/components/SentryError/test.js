jest.mock('@sentry/browser');

import React from 'react';
import { shallow } from 'enzyme';
import * as Sentry from '@sentry/browser';

import { mockT } from 'i18n';
import { SentryErrorImpl } from 'components/SentryError';

describe('SentryError', () => {
  test('rendering', () => {
    const component = shallow(
      <SentryErrorImpl t={ mockT }/>
    );
    expect(component).toMatchSnapshot();
  });

  describe('error reporting', () => {
    test('fill out a report when an event has been logged', () => {
      Sentry.lastEventId.mockReturnValue(1);
      const component = shallow(
        <SentryErrorImpl t={ mockT } />
      );
      const eventObj = { preventDefault: jest.fn() };
      component.find('a').simulate('click', eventObj);

      expect(eventObj.preventDefault).toHaveBeenCalled();
      expect(Sentry.showReportDialog).toHaveBeenCalled();
    });

    test('fill out a report when an event has not been logged', () => {
      Sentry.lastEventId.mockReturnValue(false);
      const component = shallow(
        <SentryErrorImpl t={ mockT } />
      );
      const eventObj = { preventDefault: jest.fn() };
      component.find('a').simulate('click', eventObj);

      expect(eventObj.preventDefault).toHaveBeenCalled();
      expect(Sentry.showReportDialog).not.toHaveBeenCalled();
    });
  });
});
