import React from 'react';
import PropTypes from 'prop-types';

import ExpandIcon from 'react-feather/dist/icons/chevrons-down';

import style from './style.module.css';

import FormActions from 'components/FormActions';

const syntaxList = [
  { id: 'js', label: 'JavaScript' },
  { id: 'pcre', label: 'PCRE' }
];

class Form extends React.PureComponent {
  state = {
    expr: this.props.expr,
    syntax: this.props.syntax
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
      actions
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
        <FormActions { ...actions } />
      </form>
    </div>;
  }
}

Form.propTypes = {
  expr: PropTypes.string,
  syntax: PropTypes.string,
  actions: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};

export default Form;
