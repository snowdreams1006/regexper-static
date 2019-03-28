jest.mock('./links');
jest.mock('react-feather/dist/icons/download', () =>
  require('__mocks__/component-mock')(
    'react-feather/dist/icons/download'));
jest.mock('react-feather/dist/icons/link', () =>
  require('__mocks__/component-mock')(
    'react-feather/dist/icons/link'));

import React from 'react';
import { render } from 'react-testing-library';

import FormActions from 'components/FormActions';
import { createPngLink, createSvgLink } from './links';

createPngLink.mockResolvedValue({
  url: 'http://example.com/image.png',
  filename: 'image.png',
  type: 'image/png',
  label: 'Example PNG Link'
});
createSvgLink.mockResolvedValue({
  url: 'http://example.com/image.svg',
  filename: 'image.svg',
  type: 'image/svg+xml',
  label: 'Example SVG Link'
});

describe('FormActions', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <FormActions/>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering with a permalink', () => {
    const { asFragment } = render(
      <FormActions permalinkUrl="http://example.com" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
