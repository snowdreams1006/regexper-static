import React from 'react';
import { shallow } from 'enzyme';

import { Header } from 'components/Header';

describe('Header', () => {
  test('rendering', () => {
    const component = shallow(
      <Header banner="testing" />
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with no banner', () => {
    const component = shallow(
      <Header banner={ false } />
    );
    expect(component).toMatchSnapshot();
  });

  test('opening the Privacy Policy modal', () => {
    const component = shallow(
      <Header banner={ false } />
    );
    const eventObj = { preventDefault: jest.fn() };

    component.instance().handleOpen(eventObj);

    expect(eventObj.preventDefault).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });

  ['shift', 'ctrl', 'alt', 'meta'].forEach(key => {
    test(`opening the Privacy Policy modal while holding ${ key } key`, () => {
      const component = shallow(
        <Header banner={ false } />
      );
      const eventObj = { preventDefault: jest.fn() };

      component.instance().handleOpen({ [key + 'Key']: true, ...eventObj });

      expect(eventObj.preventDefault).not.toHaveBeenCalled();
      expect(component.state('showModal')).toEqual(false);
    });
  });

  test('closing the Privacy Policy modal', () => {
    const component = shallow(
      <Header banner={ false } />
    );
    const eventObj = { preventDefault: jest.fn() };

    component.setState({ showModal: true });

    expect(component).toMatchSnapshot();

    component.instance().handleClose(eventObj);

    expect(eventObj.preventDefault).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });
});
