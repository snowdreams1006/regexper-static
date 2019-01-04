import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';

import SentryError from 'components/SentryError';

class SentryBoundary extends React.Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, errorInfo);
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

SentryBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default SentryBoundary;
