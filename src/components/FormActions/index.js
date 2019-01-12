import React from 'react';

import DownloadIcon from 'react-feather/dist/icons/download';
import LinkIcon from 'react-feather/dist/icons/link';

import style from './style.module.css';

import AppContext from 'components/AppContext';

class FormActions extends React.PureComponent {
  static contextType = AppContext

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
    } = this.context;

    return <ul className={ style.actions }>
      { pngLink && this.downloadLink(pngLink) }
      { svgLink && this.downloadLink(svgLink) }
      { permalinkUrl && <li>
        <a href={ permalinkUrl }><LinkIcon />Permalink</a>
      </li> }
    </ul>;
  }
}

export default FormActions;
