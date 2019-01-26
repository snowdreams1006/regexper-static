import React from 'react';
import PropTypes from 'prop-types';

import * as style from './style';

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

class SVG extends React.PureComponent {
  static propTypes = {
    onReflow: PropTypes.func,
    children: PropTypes.node,
    padding: PropTypes.number
  }

  static defaultProps = {
    padding: 10
  }

  state = {
    width: 0,
    height: 0
  }

  handleReflow = box => {
    const { padding } = this.props;

    this.setState({
      width: Math.round(box.width + 2 * padding),
      height: Math.round(box.height + 2 * padding)
    }, () => this.props.onReflow(this));
  }

  render() {
    const { width, height } = this.state;
    const { padding, children } = this.props;

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
        { React.cloneElement(React.Children.only(children), {
          onReflow: this.handleReflow
        }) }
      </g>
    </svg>;
  }
}

export default SVG;
