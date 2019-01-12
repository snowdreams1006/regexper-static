import React from 'react';

import PlaceholderIcon from 'react-feather/dist/icons/file-text';

import style from './style.module.css';

import AppContext from 'components/AppContext';

class Render extends React.PureComponent {
  static contextType = AppContext

  svgContainer = React.createRef()

  provideSVGData() {
    if (!this.svgContainer.current) {
      return;
    }

    const svg = this.svgContainer.current.querySelector('svg');
    this.context.setSvgMarkup({
      svg: svg.outerHTML,
      width: svg.getAttribute('width'),
      height: svg.getAttribute('height')
    });
  }

  componentDidMount() {
    this.provideSVGData();
  }

  componentDidUpdate() {
    this.provideSVGData();
  }

  render() {
    const { syntax, expr } = this.context;

    console.log('Render:', syntax, expr); // eslint-disable-line no-console

    // Demo rendering for now
    return <div className={ style.render } ref={ this.svgContainer }>
      <PlaceholderIcon />
    </div>;
  }
}

export default Render;
