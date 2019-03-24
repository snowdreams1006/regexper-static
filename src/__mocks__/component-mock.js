const React = require('react');

const buildMock = component => {
  const componentName = component.displayName || component.name || 'Component';
  const Mock = ({ children, ...props }) => (
    <span
      data-component={ componentName }
      data-props={ JSON.stringify(props, null, '  ') }>{ children }</span>
  );
  Mock.propTypes = component.propTypes;
  return Mock;
};

module.exports = path => {
  const actual = jest.requireActual(path).default;
  return buildMock(actual);
};

module.exports.buildMock = buildMock;
