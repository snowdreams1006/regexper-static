import Render from 'components/Render';
import layout from 'layout';

const parse = expr => {
  return {
    type: 'SVG',
    children: [
      {
        type: 'HorizontalLayout',
        props: {
          withConnectors: true
        },
        children: [
          {
            type: 'Box',
            props: {
              theme: 'literal'
            },
            children: [
              {
                type: 'Text',
                children: [
                  'JS'
                ]
              }
            ]
          },
          {
            type: 'Box',
            props: {
              theme: 'literal'
            },
            children: [
              {
                type: 'Text',
                children: [
                  expr
                ]
              }
            ]
          }
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
