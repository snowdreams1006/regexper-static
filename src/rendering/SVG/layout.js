const layoutSVG = data => {
  const child = data.children[0];

  data.props.innerWidth = child.box.width;
  data.props.innerHeight = child.box.height;

  return data;
};

export default layoutSVG;
