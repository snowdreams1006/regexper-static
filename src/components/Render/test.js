import React from 'react';
import { shallow } from 'enzyme';

import Render from 'components/Render';

const testType = (name, item) => {
  test(name, () => {
    const data = { type: 'SVG', children: [item] };
    const component = shallow(
      <Render data={ data } onRender={ jest.fn() }/>
    );
    expect(component).toMatchSnapshot();
  });
};

describe('Render', () => {
  test('debugging', () => {
    const data = {
      type: 'SVG',
      children: [
        {
          type: 'Text',
          debug: true,
          box: {
            width: 100,
            height: 50,
            axisY: 10,
            axisX1: 5,
            axisX2: 95
          },
          children: [
            'Example'
          ]
        }
      ]
    };
    const component = shallow(
      <Render data={ data } onRender={ jest.fn() }/>
    );
    expect(component).toMatchSnapshot();
  });

  describe('types', () => {
    testType('Pin', {
      type: 'Pin'
    });

    testType('Text', {
      type: 'Text',
      children: [
        'Example'
      ]
    });

    testType('Box', {
      type: 'Box',
      children: [
        {
          type: 'Text',
          children: [
            'Example'
          ]
        }
      ]
    });

    testType('Loop', {
      type: 'Loop',
      children: [
        {
          type: 'Text',
          children: [
            'Example'
          ]
        }
      ]
    });

    testType('HorizontalLayout', {
      type: 'HorizontalLayout',
      children: [
        {
          type: 'Text',
          children: [
            'Example'
          ]
        },
        {
          type: 'Text',
          children: [
            'Another Example'
          ]
        }
      ]
    });

    testType('VerticalLayout', {
      type: 'VerticalLayout',
      children: [
        {
          type: 'Text',
          children: [
            'Example'
          ]
        },
        {
          type: 'Text',
          children: [
            'Another Example'
          ]
        }
      ]
    });
  });
});
