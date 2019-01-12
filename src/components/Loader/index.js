import React from 'react';

import LoaderIcon from 'react-feather/dist/icons/loader';

import style from './style.module.css';

const Loader = () => (
  <div className={ style.loader }>
    <LoaderIcon />
    <div className={ style.message }>Loading...</div>
  </div>
);

export default Loader;
