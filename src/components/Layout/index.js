import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Header from 'components/Header';

const Layout = ({ title, children }) => <React.Fragment>
  <Helmet>
    <title>{ title ? `Regexper - ${ title }` : 'Regexper' }</title>
  </Helmet>
  <Header />
  { children }
</React.Fragment>;

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Layout;
