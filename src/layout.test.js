import layout from 'layout';

jest.mock('rendering/types', () => ({
  Example: {
    layout: jest.fn()
  },
  Other: {
    layout: jest.fn()
  }
}));

import nodeTypes from 'rendering/types';

describe('layout', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('running against a string', () => {
    expect(layout('test')).toEqual('test');
  });

  test('running against a simple node', () => {
    expect(layout({
      type: 'Example'
    })).toMatchSnapshot();
  });

  test('running against a node with a basic bounding box', () => {
    nodeTypes.Example.layout.mockImplementation(data => {
      data.box = { width: 20, height: 10 };
      return data;
    });
    expect(layout({
      type: 'Example'
    })).toMatchSnapshot();
  });

  test('running against a node with a complete bounding box', () => {
    nodeTypes.Example.layout.mockImplementation(data => {
      data.box = {
        width: 20,
        height: 10,
        axisY: 2,
        axisX1: 5,
        axisX2: 15
      };
      return data;
    });
    expect(layout({
      type: 'Example'
    })).toMatchSnapshot();
  });

  test('running against a node with props', () => {
    expect(layout({
      type: 'Example',
      props: {
        property: 'example'
      }
    })).toMatchSnapshot();
  });

  test('running layout on children', () => {
    nodeTypes.Other.layout.mockImplementation(data => {
      data.box = { width: 20, height: 10 };
      return data;
    });
    expect(layout({
      type: 'Example',
      children: [
        {
          type: 'Other'
        },
        'string example'
      ]
    })).toMatchSnapshot();
  });
});
