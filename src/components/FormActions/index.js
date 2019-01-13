import React from 'react';
import PropTypes from 'prop-types';

import DownloadIcon from 'react-feather/dist/icons/download';
import LinkIcon from 'react-feather/dist/icons/link';

import style from './style.module.css';

class FormActions extends React.PureComponent {
  downloadLink({ url, filename, type, label }) {
    return <li>
      <a href={ url } download={ filename } type={ type }>
        <DownloadIcon />{ label }
      </a>
    </li>;
  }

  render() {
    const {
      permalinkUrl,
      svgLink,
      pngLink
    } = this.props;

    return <ul className={ style.actions }>
      { pngLink && this.downloadLink(pngLink) }
      { svgLink && this.downloadLink(svgLink) }
      { permalinkUrl && <li>
        <a href={ permalinkUrl }><LinkIcon />Permalink</a>
      </li> }
    </ul>;
  }
}

FormActions.propTypes = {
  permalinkUrl: PropTypes.string,
  svgLink: PropTypes.object,
  pngLink: PropTypes.object
};

export default FormActions;
