jest.mock('rendering/getbbox', () => jest.fn());

import React from 'react';
import { shallow } from 'enzyme';

import getBBox from 'rendering/getbbox';

import Box, { layout } from 'rendering/Box';

describe('Box', () => {
  test('rendering', () => {
    const component = shallow(
      <Box>Example</Box>
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with a corner radius', () => {
    const component = shallow(
      <Box radius={ 5 }>Example</Box>
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with a label', () => {
    const component = shallow(
      <Box label="Test box">Example</Box>
    );
    expect(component).toMatchSnapshot();
  });

  test('rendering with props from layout', () => {
    const props = {
      theme: 'literal',
      label: 'Test box',
      width: 100,
      height: 50,
      rectTransform: 'RECT TRANSFORM',
      labelTransform: 'LABEL TRANSFORM',
      contentTransform: 'CONTENT TRANSFORM'
    };
    const component = shallow(
      <Box { ...props }>Example</Box>
    );
    expect(component).toMatchSnapshot();
  });

  describe('themes', () => {
    test('rendering a "literal" Box', () => {
      const component = shallow(
        <Box theme="literal">Example</Box>
      );
      expect(component).toMatchSnapshot();
    });

    test('rendering a "escape" Box', () => {
      const component = shallow(
        <Box theme="escape">Example</Box>
      );
      expect(component).toMatchSnapshot();
    });

    test('rendering a "charClass" Box', () => {
      const component = shallow(
        <Box theme="charClass">Example</Box>
      );
      expect(component).toMatchSnapshot();
    });

    test('rendering a "capture" Box', () => {
      const component = shallow(
        <Box theme="capture">Example</Box>
      );
      expect(component).toMatchSnapshot();
    });

    test('rendering a "anchor" Box', () => {
      const component = shallow(
        <Box theme="anchor">Example</Box>
      );
      expect(component).toMatchSnapshot();
    });
  });

  test('layout', () => {
    const processed = layout({
      children: [
        {
          box: {
            width: 100,
            height: 50,
            axisY: 10,
            axisX1: 5,
            axisX2: 95
          }
        }
      ]
    });
    expect(processed).toMatchSnapshot();
  });

  test('layout using axis anchors from child', () => {
    const processed = layout({
      props: {
        useAnchors: true
      },
      children: [
        {
          box: {
            width: 100,
            height: 50,
            axisY: 10,
            axisX1: 5,
            axisX2: 95
          }
        }
      ]
    });
    expect(processed).toMatchSnapshot();
  });

  test('layout with a label that is narrower than the box', () => {
    getBBox.mockReturnValue({ y: -10, width: 50, height: 10 });
    const processed = layout({
      props: {
        label: 'Test label'
      },
      children: [
        {
          box: {
            width: 100,
            height: 50,
            axisY: 10,
            axisX1: 5,
            axisX2: 95
          }
        }
      ]
    });
    expect(processed).toMatchSnapshot();
  });

  test('layout with a label that is wider than the box', () => {
    getBBox.mockReturnValue({ y: -10, width: 200, height: 10 });
    const processed = layout({
      props: {
        label: 'Test label'
      },
      children: [
        {
          box: {
            width: 100,
            height: 50,
            axisY: 10,
            axisX1: 5,
            axisX2: 95
          }
        }
      ]
    });
    expect(processed).toMatchSnapshot();
  });

  test('layout with a label and using axis anchors from child', () => {
    getBBox.mockReturnValue({ y: -10, width: 200, height: 10 });
    const processed = layout({
      props: {
        label: 'Test label',
        useAnchors: true
      },
      children: [
        {
          box: {
            width: 100,
            height: 50,
            axisY: 10,
            axisX1: 5,
            axisX2: 95
          }
        }
      ]
    });
    expect(processed).toMatchSnapshot();
  });
});
