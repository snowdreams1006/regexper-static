import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Metadata from 'components/Metadata';
import PrivacyPolicy from 'components/PrivacyPolicy';

export const PrivacyPage = ({ t }) => <>
  <Metadata title={ t('Privacy Policy') } />
  <PrivacyPolicy />
</>;

PrivacyPage.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(PrivacyPage);
