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
            type: 'Pin'
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
          },
          {
            type: 'Pin'
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
