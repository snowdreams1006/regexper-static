jest.mock('components/Metadata', () =>
  require('__mocks__/component-mock')('components/Metadata'));
jest.mock('components/Message', () =>
  require('__mocks__/component-mock')('components/Message'));

import React from 'react';
import { render } from 'react-testing-library';

import ErrorPage from 'pages/404';

describe('Error Page', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <ErrorPage/>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
