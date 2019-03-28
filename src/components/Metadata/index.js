import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const Metadata = ({ title, description }) => {
  const { i18n } = useTranslation();
  const helmetProps = {
    title: title ? `Regexper - ${ title }` : 'Regexper',
    htmlAttributes: {
      lang: i18n.language
    },
    meta: [
      {
        name: 'description',
        content: description
      }
    ]
  };

  return <Helmet { ...helmetProps }></Helmet>;
};

Metadata.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

export default Metadata;
