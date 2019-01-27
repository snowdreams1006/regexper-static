import React from 'react';
import PropTypes from 'prop-types';

import * as style from './style';

const padding = 10;
const namespaceProps = {
  'xmlns': 'http://www.w3.org/2000/svg',
  'xmlns:cc': 'http://creativecommons.org/ns#',
  'xmlns:rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
};
/* eslint-disable max-len */
const metadata = `<rdf:rdf>
  <cc:license rdf:about="http://creativecommons.org/licenses/by/3.0/">
    <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"></cc:permits>
    <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"></cc:permits>
    <cc:requires rdf:resource="http://creativecommons.org/ns#Notice"></cc:requires>
    <cc:requires rdf:resource="http://creativecommons.org/ns#Attribution"></cc:requires>
    <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"></cc:permits>
  </cc:license>
</rdf:rdf>`;
/* eslint-enable max-len */

const SVG = ({ width, height, children }) => {
  const svgProps = {
    width,
    height,
    viewBox: [0, 0, width, height].join(' '),
    style: style.image,
    ...namespaceProps
  };

  return <svg { ...svgProps }>
    <metadata dangerouslySetInnerHTML={{ __html: metadata }}></metadata>
    <g transform={ `translate(${ padding } ${ padding })` }>
      { children }
    </g>
  </svg>;
};

SVG.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
  height: PropTypes.number
};

const layout = data => {
  const childBox = data.children[0].box;

  data.box = {
    width: Math.round(childBox.width + 2 * padding),
    height: Math.round(childBox.height + 2 * padding)
  };
  data.props = {
    ...data.props,
    ...data.box
  };

  return data;
};

export default SVG;
export { layout };
