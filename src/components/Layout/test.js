import React from 'react';
import { shallow } from 'enzyme';

import Layout from 'components/Layout';

describe('Layout', () => {
  test('rendering', () => {
    const component = shallow(
      <Layout>
        Example content
      </Layout>
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with a title', () => {
    const component = shallow(
      <Layout title="Testing">
        Example content
      </Layout>
    );
    expect(component).toMatchSnapshot();
  });
});
