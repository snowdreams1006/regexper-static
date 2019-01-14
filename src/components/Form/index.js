import React from 'react';
import PropTypes from 'prop-types';

import ExpandIcon from 'react-feather/dist/icons/chevrons-down';

import style from './style.module.css';

class Form extends React.PureComponent {
  state = {
    expr: this.props.expr,
    syntax: this.props.syntax
  }

  propTypes = {
    expr: PropTypes.string,
    syntax: PropTypes.string,
    syntaxList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string
    })),
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  handleSubmit = event => {
    event.preventDefault();

    const { expr, syntax } = this.state;

    this.props.onSubmit({ expr, syntax });
  }

  handleKeyPress = event => {
    if (event.charCode === 13 && event.shiftKey) {
      this.handleSubmit(event);
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  render() {
    const {
      syntaxList,
      children
    } = this.props;
    const { expr, syntax } = this.state;

    return <div className={ style.form }>
      <form onSubmit={ this.handleSubmit }>
        <textarea
          name="expr"
          value={ expr }
          onKeyPress={ this.handleKeyPress }
          onChange={ this.handleChange }
          autoFocus
          placeholder="Enter regular expression to display"></textarea>
        <button type="submit">Display</button>
        <div className={ style.select }>
          <select
            name="syntax"
            value={ syntax }
            onChange={ this.handleChange } >
            { syntaxList.map(({ id, label }) => (
              <option value={ id } key={ id }>{ label }</option>
            )) }
          </select>
          <ExpandIcon />
        </div>
        { children }
      </form>
    </div>;
  }
}

export default Form;
