import React from 'react';

import ExpandIcon from 'react-feather/dist/icons/chevrons-down';

import style from './style.module.css';

import AppContext from 'components/App/context';
import FormActions from 'components/FormActions';

const syntaxList = [
  { id: 'js', label: 'JavaScript' },
  { id: 'pcre', label: 'PCRE' }
];

class Form extends React.PureComponent {
  static contextType = AppContext

  state = {
    expr: this.context.expr,
    syntax: this.context.syntax
  }

  componentDidUpdate() {
    if (this.state.expr === undefined && this.state.syntax === undefined) {
      this.setState({
        syntax: this.context.syntax,
        expr: this.context.expr
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    const { expr, syntax } = this.state;

    this.context.renderExpr({ expr, syntax });
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
        <FormActions />
      </form>
    </div>;
  }
}

export default Form;
