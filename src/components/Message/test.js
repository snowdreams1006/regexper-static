jest.mock('react-feather/dist/icons/info', () =>
  require('__mocks__/component-mock')('react-feather/dist/icons/info'));
jest.mock('react-feather/dist/icons/alert-octagon', () =>
  require('__mocks__/component-mock')(
    'react-feather/dist/icons/alert-octagon'
  ));
jest.mock('react-feather/dist/icons/alert-triangle', () =>
  require('__mocks__/component-mock')(
    'react-feather/dist/icons/alert-triangle'
  ));
jest.mock('react-feather/dist/icons/x-square', () =>
  require('__mocks__/component-mock')('react-feather/dist/icons/x-square'));

import React from 'react';
import { render } from 'react-testing-library';

import Message from 'components/Message';

describe('Message', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <Message heading="Testing">
        <p>Message content</p>
      </Message>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering with icon', () => {
    const Icon = () => 'Sample icon SVG';
    const { asFragment } = render(
      <Message heading="Testing" icon={ Icon }>
        <p>Message content</p>
      </Message>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering with type', () => {
    const { asFragment } = render(
      <Message heading="Testing" type="error">
        <p>Message content</p>
      </Message>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering with a close button', () => {
    const { asFragment } = render(
      <Message heading="Testing" onClose={ jest.fn() }>
        <p>Message content</p>
      </Message>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
