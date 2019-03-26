jest.mock('components/Metadata', () =>
  require('__mocks__/component-mock')('components/Metadata'));
jest.mock('components/Message', () =>
  require('__mocks__/component-mock')('components/Message'));
jest.mock('components/App', () =>
  require('__mocks__/component-mock')('components/App'));

import React from 'react';
import { render } from 'react-testing-library';

import IndexPage from 'pages/index';

const queryResult = {
  site: {
    siteMetadata: {
      description: 'Test description',
      defaultSyntax: 'testJs',
      syntaxList: [
        { id: 'testJS', name: 'Testing JS' },
        { id: 'other', name: 'Other' }
      ]
    }
  }
};

describe('Index Page', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <IndexPage location={{ hash: '' }} data={ queryResult } />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering with an expression on the URL', () => {
    const { asFragment } = render(
      <IndexPage location={{
        hash: '#syntax=test&expr=testing',
        href: 'http://example.com'
      }} data={ queryResult } />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
