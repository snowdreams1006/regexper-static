import React from 'react';
import { shallow } from 'enzyme';

import { Form } from 'components/Form';
import { translate } from '__mocks__/i18n';

const syntaxes = {
  js: 'Javascript',
  pcre: 'PCRE'
};

describe('Form', () => {
  test('rendering', () => {
    const component = shallow(
      <Form t={ translate } syntaxes={ syntaxes }/>
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with download URLs', () => {
    const downloadUrls = [
      { url: '#svg', filename: 'image.svg', type: 'image/svg+xml', label: 'Download SVG' },
      { url: '#png', filename: 'image.png', type: 'image/png', label: 'Download PNG' }
    ];
    const component = shallow(
      <Form t={ translate } syntaxes={ syntaxes } downloadUrls={ downloadUrls }/>
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with permalink URL', () => {
    const permalinkUrl = '#permalink';
    const component = shallow(
      <Form t={ translate } syntaxes={ syntaxes } permalinkUrl={ permalinkUrl }/>
    );
    expect(component).toMatchSnapshot();
  });

  describe('submitting expression', () => {
    test('submitting form', () => {
      const onSubmit = jest.fn();
      const component = shallow(
        <Form t={ translate } syntaxes={ syntaxes } onSubmit={ onSubmit }/>
      );

      const exprInput = component.find('[name="expr"]');
      const syntaxInput = component.find('[name="syntax"]');
      exprInput.simulate('change', { target: { name: 'expr', value: 'Test expression' } });
      syntaxInput.simulate('change', { target: { name: 'syntax', value: 'test' } });

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
        <Form t={ translate } syntaxes={ syntaxes } onSubmit={ Function.prototype }/>
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
        <Form t={ translate } syntaxes={ syntaxes } onSubmit={ Function.protoytpe }/>
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
