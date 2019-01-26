import Render from 'components/Render';
import layout from 'layout';

const parse = expr => {
  return {
    type: 'SVG',
    children: [
      {
        type: 'Text',
        props: {
          quoted: true
        },
        children: [
          `JS => ${ expr }`
        ]
      }
    ]
  };
};

export {
  parse,
  layout,
  Render
};
