import React from 'react';
import { withTranslation, Trans } from 'react-i18next';

import ExpandIcon from 'react-feather/dist/icons/chevrons-down';

import i18n, { locales } from 'i18n';

import localeToAvailable from './locale-to-available';
import style from './style.module.css';

export class LocaleSwitcher extends React.PureComponent {
  state = {
    current: localeToAvailable(
      i18n.language || '',
      locales.map(l => l.code),
      'en')
  }

  componentDidMount() {
    i18n.on('languageChanged', this.handleLanguageChange);
  }

  componentWillUnmount() {
    i18n.off('languageChanged', this.handleLanguageChange);
  }

  handleSelectChange = ({ target }) => {
    i18n.changeLanguage(target.value);
  }

  handleLanguageChange = lang => {
    this.setState({ current: lang });
  }

  render() {
    const { current } = this.state;

    return <label>
      <Trans>Language</Trans>
      <div className={ style.switcher }>
        <select value={ current } onChange={ this.handleSelectChange }>
          { locales.map(locale => (
            <option value={ locale.code } key={ locale.code }>
              { locale.name }
            </option>
          )) }
        </select>
        <ExpandIcon />
      </div>
    </label>;
  }
}

export default withTranslation()(LocaleSwitcher);
