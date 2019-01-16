import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import LoaderIcon from 'react-feather/dist/icons/loader';

import style from './style.module.css';

const Loader = ({ t }) => (
  <div className={ style.loader }>
    <LoaderIcon />
    <div className={ style.message }>{ t('Loading...') }</div>
  </div>
);

Loader.propTypes = {
  t: PropTypes.func.isRequired
};

export { Loader };
export default withNamespaces()(Loader);
