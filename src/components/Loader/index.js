import React from 'react';
import { useTranslation } from 'react-i18next';

import LoaderIcon from 'react-feather/dist/icons/loader';

import style from './style.module.css';

const Loader = () => {
  const { t } = useTranslation();

  return <div className={ style.loader }>
    <LoaderIcon />
    <div className={ style.message }>{ t('Loading...') }</div>
  </div>;
};

export default Loader;
