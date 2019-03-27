import React from 'react';
import * as Sentry from '@sentry/browser';
import { useTranslation, Trans } from 'react-i18next';

import Message from 'components/Message';

const reportError = event => {
  event.preventDefault();

  if (Sentry.lastEventId()) {
    Sentry.showReportDialog();
  }
};

export const SentryError = () => {
  const { t } = useTranslation();

  return <Message type="error" heading={ t('An error has occurred') }>
    <p>
      <Trans>This error has been logged. You may also <a
        href="#error-report"
        data-testid="error-report"
        onClick={ reportError }>fill out a report</a>.</Trans>
    </p>
  </Message>;
};

export default SentryError;
