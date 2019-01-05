import React from 'react';
import * as Sentry from '@sentry/browser';

import Message from 'components/Message';

class SentryError extends React.Component {
  reportError = event => {
    event.preventDefault();

    if (Sentry.lastEventId()) {
      Sentry.showReportDialog();
    }
  }

  render() {
    return <Message type="error" heading="An error has occurred">
      <p>This error has been logged. You may also <a href="#error-report"
        onClick={ this.reportError }>fill out a report</a>.</p>
    </Message>;
  }
}

export default SentryError;
