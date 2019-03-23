import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';

import ccLogo from './cc-by.svg';

import style from './style.module.css';

export const Footer = ({ t, buildId }) => (
  <footer className={ style.footer }>
    <ul className={ style.list }>
      <li>
        <Trans>Created by <a
          href="mailto:jeff.avallone@gmail.com">Jeff Avallone</a></Trans>
      </li>
      <li>
        <Trans>Generated images licensed: <a
          href="http://creativecommons.org/licenses/by/3.0/"
          rel="license external noopener noreferrer"
          target="_blank">
          <img src={ ccLogo }
            alt={ t('Creative Commons CC-BY-3.0 License') } />
        </a></Trans>
      </li>
    </ul>
    <div className={ style.buildId }>
      { buildId }
    </div>
  </footer>
);

Footer.propTypes = {
  t: PropTypes.func.isRequired,
  buildId: PropTypes.string.isRequired
};

export default withTranslation()(Footer);
