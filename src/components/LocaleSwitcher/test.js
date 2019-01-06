import React from 'react';
import { shallow } from 'enzyme';

import i18n from 'i18n';
import { LocaleSwitcher } from 'components/LocaleSwitcher';

// Ensure initial locale is always "en" during tests
jest.mock('./locale-to-available', () => jest.fn(() => 'en'));

describe('LocaleSwitcher', () => {
  test('rendering', () => {
    const component = shallow(
      <LocaleSwitcher />
    );
    expect(component).toMatchSnapshot();
  });

  test('changing language', () => {
    jest.spyOn(i18n, 'changeLanguage');

    const component = shallow(
      <LocaleSwitcher />
    );
    const selectInput = component.find('select');
    selectInput.value = 'other';
    selectInput.simulate('change', { target: { value: 'other' } });

    expect(i18n.changeLanguage).toHaveBeenCalledWith('other');
  });

  test('interface update from language change', () => {
    const component = shallow(
      <LocaleSwitcher />
    );

    expect(component.find('select').prop('value')).toEqual('en');
    i18n.emit('languageChanged', 'other');
    expect(component.find('select').prop('value')).toEqual('other');
  });

  test('disconnecting event handler on unmount', () => {
    const component = shallow(
      <LocaleSwitcher />
    );

    jest.spyOn(component, 'setState');

    component.unmount();
    i18n.emit('languageChanged', 'other');
    expect(component.setState).not.toHaveBeenCalled();
  });
});
