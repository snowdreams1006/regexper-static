import React from 'react';
import PropTypes from 'prop-types';

import DownloadIcon from 'react-feather/dist/icons/download';
import LinkIcon from 'react-feather/dist/icons/link';

import style from './style.module.css';

const createSvgLink = async ({ svg }) => {
  try {
    const type = 'image/svg+xml';
    const blob = new Blob([svg], { type });

    return {
      url: URL.createObjectURL(blob),
      label: 'Download SVG',
      filename: 'image.svg',
      type
    };
  }
  catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
};

const createPngLink = async ({ svg, width, height }) => {
  try {
    const type = 'image/png';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const loader = new Image();

    loader.width = canvas.width = width * 2;
    loader.height = canvas.height = height * 2;

    await new Promise(resolve => {
      loader.onload = resolve;
      loader.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
    });

    context.drawImage(loader, 0, 0, loader.width, loader.height);

    const blob = await new Promise(resolve => canvas.toBlob(resolve, type));

    return {
      url: URL.createObjectURL(blob),
      label: 'Download PNG',
      filename: 'image.png',
      type
    };
  }
  catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
};

class FormActions extends React.PureComponent {
  state = {}

  componentDidMount() {
    const { imageDetails } = this.props;

    if (!imageDetails) {
      return;
    }

    if (imageDetails.svg) {
      this.generateDownloadLinks();
    }
  }

  componentDidUpdate(prevProps) {
    const { imageDetails } = this.props;
    const { imageDetails: prevImageDetails } = prevProps;

    if (!imageDetails) {
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
    return <li>
      <a href={ url } download={ filename } type={ type }>
        <DownloadIcon />{ label }
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
        <a href={ permalinkUrl }><LinkIcon />Permalink</a>
      </li> }
    </ul>;
  }
}

FormActions.propTypes = {
  permalinkUrl: PropTypes.string,
  imageDetails: PropTypes.shape({
    svg: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  })
};

export default FormActions;
