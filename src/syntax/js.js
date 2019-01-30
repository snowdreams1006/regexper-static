import Render from 'components/Render';
import layout from 'layout';

const type = 'JS';
const description = 'JavaScript';

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
              theme: 'capture',
              label: 'Demo rendering',
              useAnchors: true
            },
            children: [
              {
                type: 'HorizontalLayout',
                props: {
                  withConnectors: true
                },
                children: [
                  {
                    type: 'VerticalLayout',
                    props: {
                      withConnectors: true
                    },
                    children: [
                      {
                        type: 'Box',
                        props: {
                          theme: 'literal',
                          label: 'Type'
                        },
                        children: [
                          {
                            type: 'Text',
                            children: [
                              type
                            ]
                          }
                        ]
                      },
                      {
                        type: 'Box',
                        props: {
                          theme: 'literal',
                          label: 'Description'
                        },
                        children: [
                          {
                            type: 'Text',
                            children: [
                              description
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'Box',
                    props: {
                      theme: 'literal',
                      label: 'Expression'
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
