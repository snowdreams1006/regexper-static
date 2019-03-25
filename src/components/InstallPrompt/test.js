import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import { InstallPrompt } from 'components/InstallPrompt';

describe('InstallPrompt', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <InstallPrompt />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering after an install prompt has been requested', () => {
    const { asFragment } = render(
      <InstallPrompt />
    );
    expect(asFragment()).toMatchSnapshot();

    const event = new Event('beforeinstallprompt', {
      prompt: jest.fn()
    });
    fireEvent(window, event);

    expect(asFragment()).toMatchSnapshot();
  });

  test('removing event listener', () => {
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(
      <InstallPrompt />
    );

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'beforeinstallprompt',
      expect.any(Function));
  });

  test('accepting install prompt', async () => {
    const { asFragment, getByTestId } = render(
      <InstallPrompt />
    );
    const promptEvent = new Event('beforeinstallprompt');
    promptEvent.prompt = jest.fn();
    promptEvent.userChoice = Promise.resolve();
    const clickEvent = new MouseEvent('click', { bubbles: true });
    jest.spyOn(clickEvent, 'preventDefault');

    fireEvent(window, promptEvent);
    expect(asFragment()).toMatchSnapshot();
    fireEvent(getByTestId('install'), clickEvent);

    // Allow async code to run
    await new Promise(resolve => setTimeout(resolve));

    expect(clickEvent.preventDefault).toHaveBeenCalled();
    expect(promptEvent.prompt).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  test('rejecting install prompt', async () => {
    const { asFragment, getByTestId } = render(
      <InstallPrompt />
    );
    const promptEvent = new Event('beforeinstallprompt');
    promptEvent.prompt = jest.fn();
    promptEvent.userChoice = Promise.reject();
    const clickEvent = new MouseEvent('click', { bubbles: true });
    jest.spyOn(clickEvent, 'preventDefault');

    fireEvent(window, promptEvent);
    expect(asFragment()).toMatchSnapshot();
    fireEvent(getByTestId('install'), clickEvent);

    // Allow async code to run
    await new Promise(resolve => setTimeout(resolve));

    expect(clickEvent.preventDefault).toHaveBeenCalled();
    expect(promptEvent.prompt).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });
});
