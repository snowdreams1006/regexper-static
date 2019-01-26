import React from 'react';
import { shallow } from 'enzyme';

import { mockT } from 'i18n';
import { App } from 'components/App';

jest.mock('syntax/js', () => ({
  parse: expr => `PARSED(${ expr })`,
  layout: parsed => `LAYOUT(${ parsed })`,
  Render: () => ''
}));

const syntaxList = [
  { id: 'testJS', label: 'Testing JS' },
  { id: 'other', label: 'Other' }
];
const commonProps = { syntaxList, t: mockT };

describe('App', () => {
  test('rendering', () => {
    const component = shallow(
      <App expr="" syntax="js" { ...commonProps } />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering an expression', async () => {
    const component = shallow(
      <App expr="" syntax="js" { ...commonProps } />
    );
    expect(component).toMatchSnapshot();

    component.setProps({
      expr: 'test expression'
    });

    expect(component).toMatchSnapshot();

    // Give a beat for module to load
    await new Promise(resolve => setTimeout(resolve));

    expect(component).toMatchSnapshot();
  });

  test('rendering with an invalid syntax', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const component = shallow(
      <App expr="" syntax="invalid" { ...commonProps } />
    );
    expect(component).toMatchSnapshot();

    component.setProps({
      expr: 'test expression'
    });

    expect(component).toMatchSnapshot();

    // Give a beat for module to load
    await new Promise(resolve => setTimeout(resolve));

    expect(component).toMatchSnapshot();
  });

  test('removing rendered expression', async () => {
    const component = shallow(
      <App expr="test expression" syntax="js" { ...commonProps } />
    );

    // Give a beat for module to load
    await new Promise(resolve => setTimeout(resolve));

    expect(component).toMatchSnapshot();

    component.setProps({
      expr: ''
    });

    expect(component).toMatchSnapshot();
  });

  test('rendering image details', async () => {
    const component = shallow(
      <App expr="test expression" syntax="js" { ...commonProps } />
    );

    // Give a beat for module to load
    await new Promise(resolve => setTimeout(resolve));

    expect(component).toMatchSnapshot();

    component.instance().handleSvg({
      svg: 'test svg content'
    });

    expect(component).toMatchSnapshot();
  });

  test('retrying expression rendering', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const component = shallow(
      <App expr="test expression" syntax="invalid" { ...commonProps } />
    );

    const instance = component.instance();
    const event = { preventDefault: jest.fn() };

    jest.spyOn(instance, 'handleRender');

    instance.handleRetry(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(instance.handleRender).toHaveBeenCalled();
  });

  test('submitting an expression to render', () => {
    const component = shallow(
      <App expr="" syntax="js" { ...commonProps } />
    );

    const instance = component.instance();

    instance.handleSubmit({ syntax: 'test', expr: '' });

    expect(document.location.hash).toEqual('');

    instance.handleSubmit({ syntax: 'test', expr: 'test expression' });

    expect(document.location.hash).toEqual('#syntax=test&expr=test+expression');
  });
});
