import React from 'react';
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

const Header = () => <StaticQuery query={ query } render={ ({ site: { siteMetadata } }) => (
  <header className={ style.header } data-banner={ siteMetadata.banner || null }>
    <h1>
      <Link to="/">Regexper</Link>
    </h1>

    <ul className={ style.list }>
      <li>
        <a href="https://gitlab.com/javallone/regexper-static" rel="external noopener noreferrer" target="_blank">
          <GitlabIcon />
          Source on GitLab
        </a>
      </li>
      <li>
        <Link to="/privacy">Privacy Policy</Link>
      </li>
    </ul>
  </header>
) } />;

export default Header;
