jest.mock('./links');
jest.mock('react-feather/dist/icons/download', () =>
  require('__mocks__/component-mock')(
    'react-feather/dist/icons/download'));
jest.mock('react-feather/dist/icons/link', () =>
  require('__mocks__/component-mock')(
    'react-feather/dist/icons/link'));

import React from 'react';
import { render } from 'react-testing-library';

import { mockT } from 'i18n';
import { FormActions } from 'components/FormActions';
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
      <FormActions t={ mockT } />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering with a permalink', () => {
    const { asFragment } = render(
      <FormActions permalinkUrl="http://example.com" t={ mockT } />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering download links', async () => {
    const imageDetails = {
      svg: 'test image',
      width: 10,
      height: 20
    };

    const { asFragment } = render(
      <FormActions imageDetails={ imageDetails } t={ mockT } />
    );

    // Give a beat for mocked promises to resolve
    await new Promise(resolve => setTimeout(resolve));

    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering download links with data after mounting', async () => {
    const { asFragment, rerender } = render(
      <FormActions t={ mockT } />
    );

    rerender(
      <FormActions permalinkUrl="http://example.com" t={ mockT } />
    );

    expect(asFragment()).toMatchSnapshot();

    rerender(
      <FormActions
        permalinkUrl="http://example.com"
        imageDetails={ { svg: 'test-image' } }
        t={ mockT } />
    );

    // Give a beat for mocked promises to resolve
    await new Promise(resolve => setTimeout(resolve));

    expect(asFragment()).toMatchSnapshot();

    rerender(
      <FormActions
        permalinkUrl="http://example.com"
        imageDetails={ { svg: 'test-image', width: 10, height: 20 } }
        t={ mockT } />
    );

    // Give a beat for mocked promises to resolve
    await new Promise(resolve => setTimeout(resolve));

    expect(asFragment()).toMatchSnapshot();
  });
});
