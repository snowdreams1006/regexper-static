import React from 'react';
import * as Sentry from '@sentry/browser';
import { I18nextProvider } from 'react-i18next';

import i18n from 'i18n';
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

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => {
  return <I18nextProvider i18n={ i18n }>{ element }</I18nextProvider>;
};
