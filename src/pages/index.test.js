import React from 'react';
import { shallow } from 'enzyme';

import { IndexPage } from 'pages/index';

describe('Index Page', () => {
  test('rendering', () => {
    const component = shallow(
      <IndexPage location={{ hash: '' }} />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with an expression on the URL', () => {
    const component = shallow(
      <IndexPage location={{
        hash: '#syntax=test&expr=testing',
        href: 'http://example.com'
      }} />
    );
    expect(component).toMatchSnapshot();
  });
});
