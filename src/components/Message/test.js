import React from 'react';
import { shallow } from 'enzyme';

import Message from 'components/Message';

describe('Message', () => {
  test('rendering', () => {
    const component = shallow(
      <Message heading="Testing">
        <p>Message content</p>
      </Message>
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with icon', () => {
    const Icon = () => 'Sample icon SVG';
    const component = shallow(
      <Message heading="Testing" icon={ Icon }>
        <p>Message content</p>
      </Message>
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with type', () => {
    const component = shallow(
      <Message heading="Testing" type="error">
        <p>Message content</p>
      </Message>
    );
    expect(component).toMatchSnapshot();
  });
});
