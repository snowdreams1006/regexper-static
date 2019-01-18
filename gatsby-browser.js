import React from 'react';
import Modal from 'react-modal';
import * as Sentry from '@sentry/browser';
import { I18nextProvider } from 'react-i18next';

import i18n from 'i18n';
import Layout from 'components/Layout';

import 'site.css';

Modal.setAppElement('#___gatsby');

Modal.defaultStyles.overlay = {
  ...Modal.defaultStyles.overlay,
  backgroundColor: 'rgba(0, 0, 0, 0.25)'
};
Modal.defaultStyles.content = {
  ...Modal.defaultStyles.content,
  background: 'transparent',
  border: '0 solid',
  borderRadius: '0',
  overflow: null,
  padding: '2rem',
  top: '7rem',
  bottom: '7rem',
  left: '2rem',
  right: '2rem'
};

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
