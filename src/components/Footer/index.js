import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import style from './style.module.css';

const query = graphql`
  query FooterQuery {
    site {
      siteMetadata {
        buildId
      }
    }
  }
`;

const Footer = () => (
  <footer className={ style.footer }>
    <ul className={ style.list }>
      <li>
        Created by <a href="mailto:jeff.avallone@gmail.com">Jeff Avallone</a>
      </li>
      <li>
        Generated images licensed: <a href="http://creativecommons.org/licenses/by/3.0/" rel="license external noopener noreferrer" target="_blank">
          <img src="https://licensebuttons.net/l/by/3.0/80x15.png" alt="Creative Commons CC-BY-3.0 License" />
        </a>
      </li>
    </ul>
    <div className={ style.buildId }>
      <StaticQuery query={ query } render={ ({ site: { siteMetadata } }) => siteMetadata.buildId } />
    </div>
  </footer>
);

export default Footer;
