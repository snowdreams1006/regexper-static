import React from 'react';
import { shallow } from 'enzyme';

import { Layout } from 'components/Layout';

describe('Layout', () => {
  test('rendering', () => {
    const component = shallow(
      <Layout banner="Test Banner" buildId="test-buildid">
        Example content
      </Layout>
    );
    expect(component).toMatchSnapshot();
  });
});
