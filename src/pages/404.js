import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces, Trans } from 'react-i18next';

import Metadata from 'components/Metadata';
import Message from 'components/Message';

export const ErrorPageImpl = ({ t }) => <>
  <Metadata title={ t('Page Not Found') } />
  <Message type="error" heading={ t('404 Page Not Found') }>
    <p><Trans>The page you have requested could not be found.</Trans></p>
  </Message>
</>;

ErrorPageImpl.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(ErrorPageImpl);
