import React from 'react';
import { shallow } from 'enzyme';

import { IndexPage } from 'pages/index';

const queryResult = {
  site: {
    siteMetadata: {
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
    const component = shallow(
      <IndexPage location={{ hash: '' }} data={ queryResult } />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with an expression on the URL', () => {
    const component = shallow(
      <IndexPage location={{
        hash: '#syntax=test&expr=testing',
        href: 'http://example.com'
      }} data={ queryResult } />
    );
    expect(component).toMatchSnapshot();
  });
});
