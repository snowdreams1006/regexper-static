jest.mock('components/SVG');
jest.mock('locales', () => ({
  en: {},
  fr: {}
}));

import React from 'react';
import { shallow } from 'enzyme';

import { LocaleSwitcher } from 'components/LocaleSwitcher';
import { translate } from '__mocks__/i18n';

describe('LocaleSwitcher', () => {
  test('rendering', () => {
    const component = shallow(
      <LocaleSwitcher t={ translate }/>
    );
    expect(component).toMatchSnapshot();
  });

  test('changing language', () => {
    const component = shallow(
      <LocaleSwitcher t={ translate }/>
    );
    const selectInput = component.find('select');
    selectInput.value = 'fr';
    selectInput.simulate('change', { target: { value: 'fr' } });

    expect(component.state('current')).toEqual('fr');
  });
});
