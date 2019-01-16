import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';

const InstallPrompt = ({ onAccept, onReject }) => (
  <div className={ style.install }>
    <p className={ style.cta }>Add Regexper to your home screen?</p>
    <div className={ style.actions }>
      <button className={ style.primary } onClick={ onAccept }>Add It</button>
      <button onClick={ onReject }>No Thanks</button>
    </div>
  </div>
);

InstallPrompt.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
};

export default InstallPrompt;
