import React from 'react';
import { shallow } from 'enzyme';

import { InstallPrompt } from 'components/InstallPrompt';

describe('InstallPrompt', () => {
  test('rendering', () => {
    const component = shallow(
      <InstallPrompt />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering after an install prompt has been requested', () => {
    const component = shallow(
      <InstallPrompt />
    );
    expect(component).toMatchSnapshot();

    component.instance().handleInstallPrompt({
      prompt: jest.fn()
    });

    expect(component).toMatchSnapshot();
  });

  test('adding and removing event listener', () => {
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');

    const component = shallow(
      <InstallPrompt />
    );
    const handleInstallPrompt = component.instance().handleInstallPrompt;

    expect(window.addEventListener).toHaveBeenCalledWith(
      'beforeinstallprompt',
      handleInstallPrompt);

    component.unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'beforeinstallprompt',
      handleInstallPrompt);
  });

  test('accepting install prompt', async () => {
    const component = shallow(
      <InstallPrompt />
    );
    const promptObj = {
      prompt: jest.fn(),
      userChoice: Promise.resolve()
    };
    const eventObj = { preventDefault: jest.fn() };

    component.instance().handleInstallPrompt(promptObj);
    component.find('a').simulate('click', eventObj);

    // Allow async code to run
    await new Promise(resolve => setTimeout(resolve));

    expect(eventObj.preventDefault).toHaveBeenCalled();
    expect(promptObj.prompt).toHaveBeenCalled();
    expect(component.state('installPrompt')).toBeNull();
  });

  test('rejecting install prompt', async () => {
    const component = shallow(
      <InstallPrompt />
    );
    const promptObj = {
      prompt: jest.fn(),
      userChoice: Promise.reject()
    };
    const eventObj = { preventDefault: jest.fn() };

    component.instance().handleInstallPrompt(promptObj);
    component.find('a').simulate('click', eventObj);

    // Allow async code to run
    await new Promise(resolve => setTimeout(resolve));

    expect(eventObj.preventDefault).toHaveBeenCalled();
    expect(promptObj.prompt).toHaveBeenCalled();
    expect(component.state('installPrompt')).toBeNull();
  });
});
