import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import { withTranslation, Trans } from 'react-i18next';

import Message from 'components/Message';

const reportError = event => {
  event.preventDefault();

  if (Sentry.lastEventId()) {
    Sentry.showReportDialog();
  }
};

export const SentryError = ({ t }) => (
  <Message type="error" heading={ t('An error has occurred') }>
    <p>
      <Trans>This error has been logged. You may also <a href="#error-report"
        onClick={ reportError }>fill out a report</a>.</Trans>
    </p>
  </Message>
);

SentryError.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(SentryError);
