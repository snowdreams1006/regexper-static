import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces, Trans } from 'react-i18next';

import ExpandIcon from 'react-feather/dist/icons/chevrons-down';

import style from './style.module.css';

class Form extends React.PureComponent {
  static propTypes = {
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
    ]),
    t: PropTypes.func.isRequired
  }

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
      syntaxList,
      children,
      t
    } = this.props;
    const { expr, syntax } = this.state;

    return <div className={ style.form } data-requires-js>
      <form onSubmit={ this.handleSubmit }>
        <textarea
          name="expr"
          value={ expr }
          onKeyPress={ this.handleKeyPress }
          onChange={ this.handleChange }
          autoFocus
          placeholder={ t('Enter regular expression to display') }></textarea>
        <button type="submit"><Trans>Display</Trans></button>
        <div className={ style.select }>
          <select
            name="syntax"
            value={ syntax }
            onChange={ this.handleChange } >
            { syntaxList.map(({ id, label }) => (
              <option value={ id } key={ id }>{ t(label) }</option>
            )) }
          </select>
          <ExpandIcon />
        </div>
        { children }
      </form>
    </div>;
  }
}

export { Form };
export default withNamespaces()(Form);
