import React from 'react';
import { shallow } from 'enzyme';

import i18n from 'i18n';
import { LocaleSwitcherImpl } from 'components/LocaleSwitcher';

describe('LocaleSwitcher', () => {
  test('rendering', () => {
    const component = shallow(
      <LocaleSwitcherImpl />
    );
    expect(component).toMatchSnapshot();
  });

  test('changing language', () => {
    jest.spyOn(i18n, 'changeLanguage');

    const component = shallow(
      <LocaleSwitcherImpl />
    );
    const selectInput = component.find('select');
    selectInput.value = 'other';
    selectInput.simulate('change', { target: { value: 'other' } });

    expect(i18n.changeLanguage).toHaveBeenCalledWith('other');
  });
});
