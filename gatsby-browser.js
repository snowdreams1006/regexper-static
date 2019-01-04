import * as Sentry from '@sentry/browser';

import 'site.css';

export const onClientEntry = () => {
  Sentry.getCurrentHub().getClient().getOptions().enabled =
    (navigator.doNotTrack !== '1' && window.doNotTrack !== '1');
};
