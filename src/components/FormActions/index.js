import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';

import DownloadIcon from 'react-feather/dist/icons/download';
import LinkIcon from 'react-feather/dist/icons/link';

import style from './style.module.css';

import { createPngLink, createSvgLink } from './links';

const downloadLink = (link, t) => {
  const { url, filename, type, label } = link;
  return <li>
    <a href={ url } download={ filename } type={ type }>
      <DownloadIcon />{ t(label) }
    </a>
  </li>;
};

const FormActions = ({
  permalinkUrl,
  imageDetails
}) => {
  const { t } = useTranslation();
  const [svgLink, setSvgLink] = useState(null);
  const [pngLink, setPngLink] = useState(null);

  const generateDownloadLinks = useCallback(async () => {
    const { svg, width, height } = imageDetails;

    setSvgLink(await createSvgLink({ svg }));
    setPngLink(await createPngLink({ svg, width, height }));
  }, [setSvgLink, setPngLink, imageDetails]);

  useEffect(() => {
    if (imageDetails && imageDetails.svg) {
      generateDownloadLinks();
    }
  }, [imageDetails]);

  return <ul className={ style.actions }>
    { pngLink && downloadLink(pngLink, t) }
    { svgLink && downloadLink(svgLink, t) }
    { permalinkUrl && <li>
      <a href={ permalinkUrl }><LinkIcon /><Trans>Permalink</Trans></a>
    </li> }
  </ul>;
};

FormActions.propTypes = {
  permalinkUrl: PropTypes.string,
  imageDetails: PropTypes.shape({
    svg: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  })
};

export default FormActions;
