import React from 'react';
import { Link } from 'gatsby';

import GitlabIcon from 'react-feather/dist/icons/gitlab';

import style from './style.module.css';

const Header = () => (
  <header className={ style.header }>
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
);

export default Header;
