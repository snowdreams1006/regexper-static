import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import { withNamespaces, Trans } from 'react-i18next';

import GitlabIcon from 'react-feather/dist/icons/gitlab';

import LocaleSwitcher from 'components/LocaleSwitcher';

import style from './style.module.css';

const query = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        banner
      }
    }
  }
`;

export const HeaderImpl = ({ site: { siteMetadata } }) => (
  <header
    className={ style.header }
    data-banner={ siteMetadata.banner || null }>
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
        <LocaleSwitcher />
      </li>
    </ul>
  </header>
);

HeaderImpl.propTypes = {
  site: PropTypes.shape({
    siteMetadata: PropTypes.shape({
      banner: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
      ]).isRequired
    }).isRequired
  }).isRequired
};

const TranslatedHeader = withNamespaces()(HeaderImpl);
const Header = () => <StaticQuery query={ query } render={ data => (
  <TranslatedHeader { ...data } />
) } />;

export default Header;
