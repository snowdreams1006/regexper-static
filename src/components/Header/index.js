import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { withNamespaces, Trans } from 'react-i18next';

import GitlabIcon from 'react-feather/dist/icons/gitlab';

import LocaleSwitcher from 'components/LocaleSwitcher';
import InstallPrompt from 'components/InstallPrompt';

import style from './style.module.css';

export const Header = ({ banner }) => (
  <header
    className={ style.header }
    data-banner={ banner || null }>
    <h1>
      <Link to="/">Regexper</Link>
    </h1>

    <ul className={ style.list }>
      <li>
        <a href="https://gitlab.com/javallone/regexper-static"
          rel="external noopener noreferrer"
          target="_blank">
          <GitlabIcon />
          <Trans>Source on GitLab</Trans>
        </a>
      </li>
      <li>
        <Link to="/privacy">
          <Trans>Privacy Policy</Trans>
        </Link>
      </li>
      <li>
        <InstallPrompt />
      </li>
      <li data-requires-js>
        <LocaleSwitcher />
      </li>
    </ul>
  </header>
);

Header.propTypes = {
  banner: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]).isRequired
};

export default withNamespaces()(Header);
