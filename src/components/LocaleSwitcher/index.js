import React, { useState, useEffect, useCallback } from 'react';
import { Trans } from 'react-i18next';

import ExpandIcon from 'react-feather/dist/icons/chevrons-down';

import i18n, { locales } from 'i18n';

import localeToAvailable from './locale-to-available';
import style from './style.module.css';

const LocaleSwitcher = () => {
  const [ current, updateCurrent ] = useState(localeToAvailable(
    i18n.language || '',
    locales.map(l => l.code),
    'en'));

  useEffect(() => {
    i18n.on('languageChanged', updateCurrent);

    return () => {
      i18n.off('languageChanged', updateCurrent);
    };
  });

  const handleSelectChange = useCallback(({ target }) => {
    i18n.changeLanguage(target.value);
  });

  return <label>
    <Trans>Language</Trans>
    <div className={ style.switcher }>
      <select data-testid="language-select"
        value={ current }
        onChange={ handleSelectChange }
      >
        { locales.map(locale => (
          <option value={ locale.code } key={ locale.code }>
            { locale.name }
          </option>
        )) }
      </select>
      <ExpandIcon />
    </div>
  </label>;
};

export default LocaleSwitcher;
