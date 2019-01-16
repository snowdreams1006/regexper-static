import React from 'react';
import { shallow } from 'enzyme';

import InstallPrompt from 'components/InstallPrompt';

describe('InstallPrompt', () => {
  test('rendering', () => {
    const component = shallow(
      <InstallPrompt onReject={ jest.fn() } onAccept={ jest.fn() } />
    );
    expect(component).toMatchSnapshot();
  });
});
