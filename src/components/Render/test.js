jest.mock('rendering/Box', () =>
  require('__mocks__/component-mock')('rendering/Box'));
jest.mock('rendering/HorizontalLayout', () =>
  require('__mocks__/component-mock')('rendering/HorizontalLayout'));
jest.mock('rendering/Loop', () =>
  require('__mocks__/component-mock')('rendering/Loop'));
jest.mock('rendering/Pin', () =>
  require('__mocks__/component-mock')('rendering/Pin'));
jest.mock('rendering/Text', () =>
  require('__mocks__/component-mock')('rendering/Text'));
jest.mock('rendering/VerticalLayout', () =>
  require('__mocks__/component-mock')('rendering/VerticalLayout'));

import React from 'react';
import { render } from 'react-testing-library';

import Render from 'components/Render';

const testType = (name, item) => {
  test(name, () => {
    const data = { type: 'SVG', children: [item] };
    const { asFragment } = render(
      <Render data={ data } onRender={ jest.fn() }/>
    );
    expect(asFragment()).toMatchSnapshot();
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
    const { asFragment } = render(
      <Render data={ data } onRender={ jest.fn() }/>
    );
    expect(asFragment()).toMatchSnapshot();
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
