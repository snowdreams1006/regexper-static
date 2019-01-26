import SVG from 'rendering/SVG/layout';
import Text from 'rendering/Text/layout';

const nodeTypes = {
  SVG,
  Text
};

const layout = data => {
  if (typeof data == 'string') {
    return data;
  }

  const { type } = data;

  return nodeTypes[type]({
    props: {},
    ...data
  });
};

export default layout;
