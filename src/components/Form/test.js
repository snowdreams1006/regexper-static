import React from 'react';
import { shallow } from 'enzyme';

import Form from 'components/Form';

const syntaxList = [
  { id: 'testJS', name: 'Testing JS' },
  { id: 'other', name: 'Other' }
];

describe('Form', () => {
  test('rendering', () => {
    const component = shallow(
      <Form syntaxList={ syntaxList } onSubmit={ jest.fn() }>
        Actions
      </Form>
    );
    expect(component).toMatchSnapshot();
  });

  describe('submitting expression', () => {
    test('submitting form', () => {
      const onSubmit = jest.fn();
      const component = shallow(
        <Form syntaxList={ syntaxList } onSubmit={ onSubmit } />
      );

      const exprInput = component.find('[name="expr"]');
      const syntaxInput = component.find('[name="syntax"]');
      exprInput.simulate('change', {
        target: {
          name: 'expr',
          value: 'Test expression'
        }
      });
      syntaxInput.simulate('change', {
        target: {
          name: 'syntax',
          value: 'test'
        }
      });

      const eventObj = { preventDefault: jest.fn() };
      component.find('form').simulate('submit', eventObj);

      expect(eventObj.preventDefault).toHaveBeenCalled();
      expect(onSubmit).toHaveBeenCalledWith({
        expr: 'Test expression',
        syntax: 'test'
      });
    });

    test('submitting form with Shift+Enter', () => {
      const component = shallow(
        <Form syntaxList={ syntaxList } onSubmit={ jest.fn() } />
      );
      const form = component.instance();
      const eventObj = {
        preventDefault: Function.prototype,
        charCode: 13,
        shiftKey: true
      };
      jest.spyOn(form, 'handleSubmit');
      component.find('textarea').simulate('keypress', eventObj);

      expect(form.handleSubmit).toHaveBeenCalled();
    });

    test('not submitting with just Enter', () => {
      const component = shallow(
        <Form syntaxList={ syntaxList } onSubmit={ jest.fn() } />
      );
      const form = component.instance();
      const eventObj = {
        preventDefault: Function.prototype,
        charCode: 13,
        shiftKey: false
      };
      jest.spyOn(form, 'handleSubmit');
      component.find('textarea').simulate('keypress', eventObj);

      expect(form.handleSubmit).not.toHaveBeenCalled();
    });
  });
});
