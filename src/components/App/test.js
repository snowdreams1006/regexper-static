jest.mock('components/Form', () =>
  require('__mocks__/component-mock')('components/Form'));
jest.mock('components/FormActions', () =>
  require('__mocks__/component-mock')('components/FormActions'));
jest.mock('components/Loader', () =>
  require('__mocks__/component-mock')('components/Loader'));
jest.mock('components/Message', () =>
  require('__mocks__/component-mock')('components/Message'));

import React from 'react';
import { render } from 'react-testing-library';

import { mockT } from 'i18n';
import { App } from 'components/App';

jest.mock('syntax/js', () => ({
  parse: expr => `PARSED(${ expr })`,
  layout: parsed => `LAYOUT(${ parsed })`,
  Render: require('__mocks__/component-mock').buildMock(function Render() {})
}));

const syntaxList = [
  { id: 'testJS', label: 'Testing JS' },
  { id: 'other', label: 'Other' }
];
const commonProps = { syntaxList, t: mockT };

describe('App', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <App expr="" syntax="js" { ...commonProps } />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering an expression', async () => {
    const { asFragment, rerender } = render(
      <App expr="" syntax="js" { ...commonProps } />
    );
    expect(asFragment()).toMatchSnapshot();

    rerender(
      <App expr="test expression" syntax="js" { ...commonProps } />
    );

    expect(asFragment()).toMatchSnapshot();

    // Give a beat for module to load
    await new Promise(resolve => setTimeout(resolve));

    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering with an invalid syntax', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const { asFragment, rerender } = render(
      <App expr="" syntax="invalid" { ...commonProps } />
    );
    expect(asFragment()).toMatchSnapshot();

    rerender(
      <App expr="test expression" syntax="invalid" { ...commonProps } />
    );

    expect(asFragment()).toMatchSnapshot();

    // Give a beat for module to load
    await new Promise(resolve => setTimeout(resolve));

    expect(asFragment()).toMatchSnapshot();
  });

  test('removing rendered expression', async () => {
    const { asFragment, rerender } = render(
      <App expr="test expression" syntax="js" { ...commonProps } />
    );

    // Give a beat for module to load
    await new Promise(resolve => setTimeout(resolve));

    expect(asFragment()).toMatchSnapshot();

    rerender(
      <App expr="" syntax="js" { ...commonProps } />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
