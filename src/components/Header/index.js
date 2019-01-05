import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';

import GitlabIcon from 'react-feather/dist/icons/gitlab';

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
          Source on GitLab
        </a>
      </li>
      <li>
        <Link to="/privacy">Privacy Policy</Link>
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

const Header = () => <StaticQuery query={ query } render={ data => (
  <HeaderImpl { ...data } />
) } />;

export default Header;
