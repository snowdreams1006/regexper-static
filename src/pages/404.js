import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import Metadata from 'components/Metadata';
import Message from 'components/Message';

export const ErrorPage = () => {
  const { t } = useTranslation();

  return <>
    <Metadata title={ t('Page Not Found') } />
    <Message type="error" heading={ t('404 Page Not Found') }>
      <p><Trans>The page you have requested could not be found.</Trans></p>
    </Message>
  </>;
};

export default ErrorPage;
