import React from 'react';
import { useTranslation } from 'react-i18next';

import Metadata from 'components/Metadata';
import PrivacyPolicy from 'components/PrivacyPolicy';

export const PrivacyPage = () => {
  const { t } = useTranslation();

  return <>
    <Metadata title={ t('Privacy Policy') } />
    <PrivacyPolicy />
  </>;
};

export default PrivacyPage;
