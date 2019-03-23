import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';

import Metadata from 'components/Metadata';
import Message from 'components/Message';

export const ErrorPage = ({ t }) => <>
  <Metadata title={ t('Page Not Found') } />
  <Message type="error" heading={ t('404 Page Not Found') }>
    <p><Trans>The page you have requested could not be found.</Trans></p>
  </Message>
</>;

ErrorPage.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(ErrorPage);
