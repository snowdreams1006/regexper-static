import React from 'react';
import { shallow } from 'enzyme';

import IndexPage from 'pages/index';

const queryResult = {
  site: {
    siteMetadata: {
      defaultSyntax: 'testJs',
      syntaxList: [
        { id: 'testJS', name: 'Testing JS' },
        { id: 'other', name: 'Other' }
      ]
    }
  }
};

describe('Index Page', () => {
  test('rendering', () => {
    const component = shallow(
      <IndexPage location={{ hash: '' }} data={ queryResult } />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with an expression on the URL', () => {
    const component = shallow(
      <IndexPage location={{
        hash: '#syntax=test&expr=testing',
        href: 'http://example.com'
      }} data={ queryResult } />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering after an install prompt has been requested', () => {
    const component = shallow(
      <IndexPage location={{ hash: '' }} data={ queryResult } />
    );
    expect(component).toMatchSnapshot();

    component.instance().handleInstallPrompt({
      preventDefault: jest.fn(),
      prompt: jest.fn()
    });

    expect(component).toMatchSnapshot();
  });

  test('removing event listener on umount', () => {
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');

    const component = shallow(
      <IndexPage location={{ hash: '' }} data={ queryResult } />
    );

    expect(window.addEventListener).toHaveBeenCalledWith(
      'beforeinstallprompt',
      expect.any(Function));

    component.unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'beforeinstallprompt',
      expect.any(Function));
  });

  test('rejecting install prompt', () => {
    const component = shallow(
      <IndexPage location={{ hash: '' }} data={ queryResult } />
    );
    const instance = component.instance();
    const installEvent = {
      preventDefault: jest.fn(),
      prompt: jest.fn()
    };

    instance.handleInstallPrompt(installEvent);

    instance.handleInstallReject();

    expect(installEvent.prompt).not.toHaveBeenCalled();
    expect(component.state('installPrompt')).toEqual(null);
  });

  test('accepting install prompt', () => {
    const component = shallow(
      <IndexPage location={{ hash: '' }} data={ queryResult } />
    );
    const instance = component.instance();
    const installEvent = {
      preventDefault: jest.fn(),
      prompt: jest.fn()
    };

    instance.handleInstallPrompt(installEvent);

    instance.handleInstallAccept();

    expect(installEvent.prompt).toHaveBeenCalled();
    expect(component.state('installPrompt')).toEqual(null);
  });
});
