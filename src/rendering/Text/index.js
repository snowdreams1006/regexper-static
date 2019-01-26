import React from 'react';
import PropTypes from 'prop-types';

import * as style from './style';

class Text extends React.PureComponent {
  static propTypes = {
    quoted: PropTypes.bool,
    transform: PropTypes.string,
    onReflow: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
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
    const { transform } = this.props;

    const textProps = {
      style: style.text,
      transform
    };

    return <text { ...textProps }>
      { this.renderContent() }
    </text>;
  }
}

export default Text;
