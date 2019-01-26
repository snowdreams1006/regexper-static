import Render from 'components/Render';

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
          `PCRE => ${ expr }`
        ]
      }
    ]
  };
};

export {
  parse,
  Render
};
