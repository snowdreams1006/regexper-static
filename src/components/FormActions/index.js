import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces, Trans } from 'react-i18next';

import DownloadIcon from 'react-feather/dist/icons/download';
import LinkIcon from 'react-feather/dist/icons/link';

import style from './style.module.css';

import { createPngLink, createSvgLink } from './links';

class FormActions extends React.PureComponent {
  static propTypes = {
    permalinkUrl: PropTypes.string,
    imageDetails: PropTypes.shape({
      svg: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    t: PropTypes.func.isRequired
  }

  state = {
    svgLink: null,
    pngLink: null
  }

  componentDidMount() {
    const { imageDetails } = this.props;

    if (imageDetails && imageDetails.svg) {
      this.generateDownloadLinks();
    }
  }

  componentDidUpdate(prevProps) {
    const { imageDetails } = this.props;
    const { imageDetails: prevImageDetails } = prevProps;

    if (!imageDetails) {
      this.setState({ svgLink: null, pngLink: null });
      return;
    }

    if (!prevImageDetails) {
      this.generateDownloadLinks();
      return;
    }

    if (imageDetails.svg !== prevImageDetails.svg
      || imageDetails.width !== prevImageDetails.width
      || imageDetails.height !== prevImageDetails.height) {
      this.generateDownloadLinks();
      return;
    }
  }

  async generateDownloadLinks() {
    const { imageDetails: { svg, width, height } } = this.props;

    this.setState({
      svgLink: await createSvgLink({ svg }),
      pngLink: await createPngLink({ svg, width, height })
    });
  }

  downloadLink({ url, filename, type, label }) {
    const { t } = this.props;

    return <li>
      <a href={ url } download={ filename } type={ type }>
        <DownloadIcon />{ t(label) }
      </a>
    </li>;
  }

  render() {
    const {
      permalinkUrl
    } = this.props;
    const {
      svgLink,
      pngLink
    } = this.state;

    return <ul className={ style.actions }>
      { pngLink && this.downloadLink(pngLink) }
      { svgLink && this.downloadLink(svgLink) }
      { permalinkUrl && <li>
        <a href={ permalinkUrl }><LinkIcon /><Trans>Permalink</Trans></a>
      </li> }
    </ul>;
  }
}

export { FormActions };
export default withNamespaces()(FormActions);
