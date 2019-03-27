import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';

import ExpandIcon from 'react-feather/dist/icons/chevrons-down';

import style from './style.module.css';

const Form = ({ syntaxList, children, onSubmit, ...props }) => {
  const { t } = useTranslation();
  const [ expr, exprUpdate ] = useState(props.expr);
  const [ syntax, syntaxUpdate ] = useState(props.syntax);

  const handleExprChange = useCallback(event => {
    exprUpdate(event.target.value);
  }, [exprUpdate]);
  const handleSyntaxChange = useCallback(event => {
    syntaxUpdate(event.target.value);
  }, [syntaxUpdate]);
  const handleSubmit = useCallback(event => {
    event.preventDefault();

    onSubmit({ expr, syntax });
  }, [expr, syntax, onSubmit]);
  const handleKeyPress = useCallback(event => {
    if (event.charCode === 13 && event.shiftKey) {
      handleSubmit(event);
    }
  }, [handleSubmit]);

  return <div className={ style.form } data-requires-js>
    <form data-testid="form" onSubmit={ handleSubmit }>
      <textarea
        data-testid="expr-input"
        name="expr"
        value={ expr }
        onKeyPress={ handleKeyPress }
        onChange={ handleExprChange }
        autoFocus
        placeholder={ t('Enter regular expression to display') }></textarea>
      <button type="submit"><Trans>Display</Trans></button>
      <div className={ style.select }>
        <select
          data-testid="syntax-select"
          name="syntax"
          value={ syntax }
          onChange={ handleSyntaxChange } >
          { syntaxList.map(({ id, label }) => (
            <option value={ id } key={ id }>{ t(label) }</option>
          )) }
        </select>
        <ExpandIcon />
      </div>
      { children }
    </form>
  </div>;
};

Form.propTypes = {
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
};

export default Form;
