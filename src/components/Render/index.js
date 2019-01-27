import React from 'react';
import PropTypes from 'prop-types';

import nodeTypes from 'rendering/types';

import style from './style.module.css';

const render = (data, extraProps) => {
  if (typeof data === 'string') {
    return data;
  }

  const { type, props } = data;
  const children = (data.children || []).map(
    (data, key) => render(data, { key }));

  return React.createElement(
    nodeTypes[type] ? nodeTypes[type].default : type,
    { ...extraProps, ...props },
    children.length === 1 ? children[0] : children);
};

class Render extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onRender: PropTypes.func.isRequired
  }

  svgContainer = React.createRef()

  componentDidMount() {
    this.provideSVGData();
  }

  componentDidUpdate() {
    this.provideSVGData();
  }

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

  render() {
    const { data } = this.props;

    return <div className={ style.render } ref={ this.svgContainer }>
      { render(data, { onReflow: this.provideSVGData }) }
    </div>;
  }
}

export default Render;
