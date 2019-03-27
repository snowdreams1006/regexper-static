jest.mock('react-feather/dist/icons/chevrons-down', () =>
  require('__mocks__/component-mock')(
    'react-feather/dist/icons/chevrons-down'));

import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import Form from 'components/Form';

const syntaxList = [
  { id: 'testJS', label: 'Testing JS' },
  { id: 'other', label: 'Other' }
];
const commonProps = { syntaxList };

describe('Form', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <Form onSubmit={ jest.fn() } { ...commonProps }>
        Actions
      </Form>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe('submitting expression', () => {
    test('submitting form', () => {
      const onSubmit = jest.fn();
      const { getByTestId } = render(
        <Form onSubmit={ onSubmit } { ...commonProps } />
      );

      fireEvent.change(getByTestId('expr-input'), {
        target: { value: 'Test expression' }
      });
      fireEvent.change(getByTestId('syntax-select'), {
        target: { value: 'other' }
      });

      const event = new Event('submit');
      jest.spyOn(event, 'preventDefault');

      fireEvent(getByTestId('form'), event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(onSubmit).toHaveBeenCalledWith({
        expr: 'Test expression',
        syntax: 'other'
      });
    });

    test('submitting form with Shift+Enter', () => {
      const onSubmit = jest.fn();
      const { getByTestId } = render(
        <Form onSubmit={ onSubmit } { ...commonProps } />
      );

      fireEvent.keyPress(getByTestId('expr-input'), {
        charCode: 13,
        shiftKey: true
      });

      expect(onSubmit).toHaveBeenCalled();
    });

    test('not submitting with just Enter', () => {
      const onSubmit = jest.fn();
      const { getByTestId } = render(
        <Form onSubmit={ onSubmit } { ...commonProps } />
      );

      fireEvent.keyPress(getByTestId('expr-input'), {
        charCode: 13,
        shiftKey: false
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
