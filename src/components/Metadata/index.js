import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Metadata = ({ title }) => (
  <Helmet>
    <title>{ title ? `Regexper - ${ title }` : 'Regexper' }</title>
  </Helmet>
);

Metadata.propTypes = {
  title: PropTypes.string
};

export default Metadata;
