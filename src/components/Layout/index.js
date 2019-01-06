import React from 'react';
import PropTypes from 'prop-types';

import SentryBoundary from 'components/SentryBoundary';
import Header from 'components/Header';
import Footer from 'components/Footer';

const Layout = ({ children }) => <SentryBoundary>
  <Header />
  <SentryBoundary>
    { children }
  </SentryBoundary>
  <Footer />
</SentryBoundary>;

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Layout;
