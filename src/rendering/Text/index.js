import React from 'react';
import PropTypes from 'prop-types';

import * as style from './style';

class Text extends React.PureComponent {
  static propTypes = {
    quoted: PropTypes.bool,
    onReflow: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  }

  state = {
    transform: ''
  }

  textRef = React.createRef()

  componentDidMount() {
    this.reflow();
  }

  componentDidUpdate() {
    this.reflow();
  }

  reflow() {
    const box = this.textRef.current.getBBox();
    const transform = `translate(${ -box.x } ${ -box.y })`;

    if (transform === this.state.transform) {
      return; // No update required
    }

    this.setState({ transform }, () => this.props.onReflow(box));
  }

  renderContent() {
    const { children, quoted } = this.props;

    if (!quoted) {
      return children;
    }

    return <>
      <tspan style={ style.quote }>&ldquo;</tspan>
      <tspan>{ children }</tspan>
      <tspan style={ style.quote }>&rdquo;</tspan>
    </>;
  }

  render() {
    const { transform } = this.state;

    const textProps = {
      style: style.text,
      transform,
      ref: this.textRef
    };

    return <text { ...textProps }>
      { this.renderContent() }
    </text>;
  }
}

export default Text;
