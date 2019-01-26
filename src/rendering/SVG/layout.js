import layout from 'layout';

const layoutSVG = data => {
  const child = layout(data.children[0]);

  data.props.innerWidth = child.box.width;
  data.props.innerHeight = child.box.height;

  return data;
};

export default layoutSVG;
