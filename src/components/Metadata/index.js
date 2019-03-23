import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

class Metadata extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    i18n: PropTypes.shape({
      language: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const { title, description, i18n } = this.props;
    const htmlAttributes = {
      lang: i18n.language
    };

    return <Helmet htmlAttributes={ htmlAttributes }>
      <title>{ title ? `Regexper - ${ title }` : 'Regexper' }</title>
      { description && <meta name="description" content={ description } /> }
    </Helmet>;
  }
}

export { Metadata };
export default withTranslation()(Metadata);
