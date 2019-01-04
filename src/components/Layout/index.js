import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import SentryBoundary from 'components/SentryBoundary';
import Header from 'components/Header';
import Footer from 'components/Footer';

const Layout = ({ title, children }) => <SentryBoundary>
  <Helmet>
    <title>{ title ? `Regexper - ${ title }` : 'Regexper' }</title>
  </Helmet>
  <Header />
  <SentryBoundary>
    { children }
  </SentryBoundary>
  <Footer />
</SentryBoundary>;

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Layout;
