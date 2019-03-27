import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import InstallPrompt from 'components/InstallPrompt';

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
});
