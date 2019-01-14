import React from 'react';
import PropTypes from 'prop-types';

import PlaceholderIcon from 'react-feather/dist/icons/file-text';

import style from './style.module.css';

class Render extends React.PureComponent {
  propTypes = {
    expr: PropTypes.string,
    onRender: PropTypes.func.isRequired
  }

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
    const { expr } = this.props;

    // eslint-disable-next-line no-console
    console.log('Render:', this.constructor.name, expr);

    // Demo rendering for now
    return <div className={ style.render } ref={ this.svgContainer }>
      <PlaceholderIcon />
    </div>;
  }
}

export default Render;
