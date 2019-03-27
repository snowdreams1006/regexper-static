jest.mock('react-feather/dist/icons/chevrons-down', () =>
  require('__mocks__/component-mock')(
    'react-feather/dist/icons/chevrons-down'));

import React from 'react';
import { render, fireEvent, act } from 'react-testing-library';

import i18n from 'i18n';
import LocaleSwitcher from 'components/LocaleSwitcher';

// Ensure initial locale is always "en" during tests
jest.mock('./locale-to-available', () => jest.fn(() => 'en'));

describe('LocaleSwitcher', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <LocaleSwitcher />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('changing language', () => {
    jest.spyOn(i18n, 'changeLanguage');

    const { getByTestId } = render(
      <LocaleSwitcher />
    );
    const event = new Event('change', { bubbles: true });
    const select = getByTestId('language-select');
    select.value = 'other';

    fireEvent(select, event);

    expect(i18n.changeLanguage).toHaveBeenCalledWith('other');
  });

  test('interface update from language change', () => {
    const { getByTestId } = render(
      <LocaleSwitcher />
    );

    expect(getByTestId('language-select').value).toEqual('en');

    act(() => {
      i18n.emit('languageChanged', 'other');
    });

    expect(getByTestId('language-select').value).toEqual('other');
  });

  test('disconnecting event handler on unmount', () => {
    const { unmount } = render(
      <LocaleSwitcher />
    );

    jest.spyOn(i18n, 'off');

    unmount();
    expect(i18n.off).toHaveBeenCalledWith(
      'languageChanged',
      expect.any(Function));
  });
});
