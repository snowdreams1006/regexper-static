jest.mock('react-helmet', () => {
  const helmet = jest.requireActual('react-helmet');
  return {
    ...helmet,
    Helmet: require('__mocks__/component-mock').buildMock(helmet.Helmet)
  };
});

import React from 'react';
import { render } from 'react-testing-library';

import { Metadata } from 'components/Metadata';

const commonProps = {
  i18n: { language: 'test-lang' }
};

describe('Metadata', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <Metadata { ...commonProps } />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering with a title and description', () => {
    const { asFragment } = render(
      <Metadata
        title="Testing"
        description="Test description"
        { ...commonProps } />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
