const React = require('react');
const gatsby = jest.requireActual('gatsby');

module.exports = {
  ...gatsby,
  graphql: jest.fn().mockImplementation(([query]) => query),
  Link: jest.fn().mockImplementation(({ to, ...rest }) =>
    React.createElement('a', {
      ...rest,
      href: to
    })
  ),
  StaticQuery: jest.fn()
};
