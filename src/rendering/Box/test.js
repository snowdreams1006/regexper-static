jest.mock('rendering/getbbox', () => jest.fn());

import React from 'react';
import { render } from 'react-testing-library';

import getBBox from 'rendering/getbbox';

import Box, { layout } from 'rendering/Box';

describe('Box', () => {
  test('rendering', () => {
    const { asFragment } = render(
      <svg>
        <Box>Example</Box>
      </svg>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering with a corner radius', () => {
    const { asFragment } = render(
      <svg>
        <Box radius={ 5 }>Example</Box>
      </svg>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('rendering with a label', () => {
    const { asFragment } = render(
      <svg>
        <Box label="Test box">Example</Box>
      </svg>
    );
    expect(asFragment()).toMatchSnapshot();
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
    const { asFragment } = render(
      <svg>
        <Box { ...props }>Example</Box>
      </svg>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe('themes', () => {
    test('rendering a "literal" Box', () => {
      const { asFragment } = render(
        <svg>
          <Box theme="literal">Example</Box>
        </svg>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    test('rendering a "escape" Box', () => {
      const { asFragment } = render(
        <svg>
          <Box theme="escape">Example</Box>
        </svg>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    test('rendering a "charClass" Box', () => {
      const { asFragment } = render(
        <svg>
          <Box theme="charClass">Example</Box>
        </svg>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    test('rendering a "capture" Box', () => {
      const { asFragment } = render(
        <svg>
          <Box theme="capture">Example</Box>
        </svg>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    test('rendering a "anchor" Box', () => {
      const { asFragment } = render(
        <svg>
          <Box theme="anchor">Example</Box>
        </svg>
      );
      expect(asFragment()).toMatchSnapshot();
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
