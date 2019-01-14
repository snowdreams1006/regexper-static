import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';

import SentryError from 'components/SentryError';

class SentryBoundary extends React.Component {
  state = {
    hasError: false
  }

  propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key =>
        scope.setExtra(key, errorInfo[key]));
      Sentry.captureException(error);
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <SentryError />;
    } else {
      return children;
    }
  }
}

export default SentryBoundary;
