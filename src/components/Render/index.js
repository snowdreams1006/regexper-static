import React from 'react';
import PropTypes from 'prop-types';

import PlaceholderIcon from 'react-feather/dist/icons/file-text';

import style from './style.module.css';

class Render extends React.PureComponent {
  svgContainer = React.createRef()

  provideSVGData() {
    if (!this.svgContainer.current) {
      return;
    }

    const svg = this.svgContainer.current.querySelector('svg');
    this.props.onRender({
      svg: svg.outerHTML,
      width: Number(svg.getAttribute('width')),
      height: Number(svg.getAttribute('height'))
    });
  }

  componentDidMount() {
    this.provideSVGData();
  }

  componentDidUpdate() {
    this.provideSVGData();
  }

  render() {
    const { syntax, expr } = this.props;

    console.log('Render:', syntax, expr); // eslint-disable-line no-console

    // Demo rendering for now
    return <div className={ style.render } ref={ this.svgContainer }>
      <PlaceholderIcon />
    </div>;
  }
}

Render.propTypes = {
  syntax: PropTypes.string,
  expr: PropTypes.string,
  onRender: PropTypes.func.isRequired
};

export default Render;
