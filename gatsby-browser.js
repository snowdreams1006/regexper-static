import React from 'react';
import * as Sentry from '@sentry/browser';

import Layout from 'components/Layout';

import 'site.css';

export const onClientEntry = () => {
  Sentry.getCurrentHub().getClient().getOptions().enabled =
    (navigator.doNotTrack !== '1' && window.doNotTrack !== '1');
};

// eslint-disable-next-line react/prop-types
export const wrapPageElement = ({ element }) => {
  return <Layout>{ element }</Layout>;
};
