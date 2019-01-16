import React from 'react';
import { shallow } from 'enzyme';

import { Metadata } from 'components/Metadata';

const commonProps = {
  i18n: { language: 'test-lang' }
};

describe('Metadata', () => {
  test('rendering', () => {
    const component = shallow(
      <Metadata { ...commonProps } />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with a title and description', () => {
    const component = shallow(
      <Metadata
        title="Testing"
        description="Test description"
        { ...commonProps } />
    );
    expect(component).toMatchSnapshot();
  });
});
