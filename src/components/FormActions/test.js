jest.mock('./links');

import React from 'react';
import { shallow } from 'enzyme';

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
    const component = shallow(
      <FormActions t={ mockT } />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with a permalink', () => {
    const component = shallow(
      <FormActions permalinkUrl="http://example.com" t={ mockT } />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering download links', async () => {
    const imageDetails = {
      svg: 'test image',
      width: 10,
      height: 20
    };

    const component = shallow(
      <FormActions imageDetails={ imageDetails } t={ mockT } />
    );

    // Give a beat for mocked promises to resolve
    await new Promise(resolve => setTimeout(resolve));

    expect(component).toMatchSnapshot();
  });

  test('rendering download links with data after mounting', async () => {
    const component = shallow(
      <FormActions t={ mockT } />
    );

    component.setProps({ permalinkUrl: 'http://example.com' });

    expect(component).toMatchSnapshot();

    component.setProps({
      imageDetails: {
        svg: 'test image'
      }
    });

    // Give a beat for mocked promises to resolve
    await new Promise(resolve => setTimeout(resolve));

    expect(component).toMatchSnapshot();

    component.setProps({
      imageDetails: {
        svg: 'test image',
        width: 10,
        height: 20
      }
    });

    // Give a beat for mocked promises to resolve
    await new Promise(resolve => setTimeout(resolve));

    expect(component).toMatchSnapshot();
  });
});
