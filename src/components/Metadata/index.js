import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const Metadata = ({ title, description }) => {
  const { i18n } = useTranslation();
  const htmlAttributes = {
    lang: i18n.language
  };

  return <Helmet htmlAttributes={ htmlAttributes }>
    <title>{ title ? `Regexper - ${ title }` : 'Regexper' }</title>
    { description && <meta name="description" content={ description } /> }
  </Helmet>;
};

Metadata.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

export default Metadata;
