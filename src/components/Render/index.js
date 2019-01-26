import React from 'react';
import PropTypes from 'prop-types';

import SVG from 'rendering/SVG';
import Text from 'rendering/Text';

import style from './style.module.css';

class Render extends React.PureComponent {
  static propTypes = {
    expr: PropTypes.string,
    onRender: PropTypes.func.isRequired
  }

  svgContainer = React.createRef()

  provideSVGData = () => {
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

  render() {
    const { expr } = this.props;

    // Demo rendering for now
    return <div className={ style.render } ref={ this.svgContainer }>
      <SVG onReflow={ this.provideSVGData }>
        <Text>{ this.constructor.name } =&gt; { expr }</Text>
      </SVG>
    </div>;
  }
}

export default Render;
