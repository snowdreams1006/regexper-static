import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import { withNamespaces, Trans } from 'react-i18next';

import Message from 'components/Message';

export class SentryError extends React.Component {
  reportError = event => {
    event.preventDefault();

    if (Sentry.lastEventId()) {
      Sentry.showReportDialog();
    }
  }

  render() {
    const { t } = this.props;

    return <Message type="error" heading={ t('An error has occurred') }>
      <p>
        <Trans>This error has been logged. You may also <a href="#error-report"
          onClick={ this.reportError }>fill out a report</a>.</Trans>
      </p>
    </Message>;
  }
}

SentryError.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(SentryError);
