import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';

import SentryBoundary from 'components/SentryBoundary';
import Header from 'components/Header';
import Footer from 'components/Footer';

const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        banner
        buildId
      }
    }
  }
`;

const noscriptStyle = `
  [data-requires-js] {
    display: none !important;
  }
`;

export const Layout = ({ banner, buildId, children }) => <SentryBoundary>
  <noscript>
    <style type="text/css">{ noscriptStyle }</style>
  </noscript>
  <Header banner={ banner } />
  <SentryBoundary>
    { children }
  </SentryBoundary>
  <Footer buildId={ buildId } />
</SentryBoundary>;

Layout.propTypes = {
  banner: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]).isRequired,
  buildId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

// eslint-disable-next-line react/display-name
export default props => (
  <StaticQuery query={ query } render={ ({ site: { siteMetadata } }) => (
    <Layout { ...props } { ...siteMetadata } />
  ) } />
);
