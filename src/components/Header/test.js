jest.mock('react-modal', () =>
  require('__mocks__/component-mock')('react-modal'));
jest.mock('react-feather/dist/icons/gitlab', () =>
  require('__mocks__/component-mock')('react-feather/dist/icons/gitlab'));
jest.mock('components/LocaleSwitcher', () =>
  require('__mocks__/component-mock')('components/LocaleSwitcher'));
jest.mock('components/InstallPrompt', () =>
  require('__mocks__/component-mock')('components/InstallPrompt'));
jest.mock('components/PrivacyPolicy', () =>
  require('__mocks__/component-mock')('components/PrivacyPolicy'));

import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import Header from 'components/Header';

describe('Header', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <Header banner="testing" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering with no banner', () => {
    const { asFragment } = render(
      <Header banner={ false } />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('opening the Privacy Policy modal', () => {
    const { asFragment, getByTestId } = render(
      <Header banner={ false } />
    );
    const event = new MouseEvent('click', { bubbles: true });
    jest.spyOn(event, 'preventDefault');

    fireEvent(getByTestId('privacy-link'), event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  ['shift', 'ctrl', 'alt', 'meta'].forEach(key => {
    test(`opening the Privacy Policy modal while holding ${ key } key`, () => {
      const { asFragment, getByTestId } = render(
        <Header banner={ false } />
      );
      const event = new MouseEvent('click', {
        bubbles: true,
        [key + 'Key']: true
      });
      jest.spyOn(event, 'preventDefault');

      fireEvent(getByTestId('privacy-link'), event);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
