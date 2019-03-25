const reactI18next = jest.requireActual('react-i18next');

module.exports = {
  ...reactI18next,
  Trans: require('__mocks__/component-mock').buildMock(reactI18next.Trans)
};
