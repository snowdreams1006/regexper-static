import nodeTypes from 'rendering/types';

const normalizeBBox = box => ({
  width: 0,
  height: 0,
  axisY: (box.height || 0) / 2,
  axisX1: 0,
  axisX2: (box.width || 0),
  ...box
});

const layout = data => {
  if (typeof data == 'string') {
    return data;
  }

  const { type } = data;

  if (data.children) {
    data.children = data.children.map(layout);
  }

  const normalizedData = {
    props: {},
    box: {},
    ...data
  };
  const result = nodeTypes[type].layout(normalizedData) || normalizedData;

  return {
    ...result,
    box: normalizeBBox(result.box)
  };
};

export default layout;
