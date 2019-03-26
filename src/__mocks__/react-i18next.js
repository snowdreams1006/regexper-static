const reactI18next = jest.requireActual('react-i18next');
const i18n = require('i18n');

module.exports = {
  ...reactI18next,
  Trans: require('__mocks__/component-mock').buildMock(reactI18next.Trans),
  useTranslation: () => ({ i18n, t: i18n.mockT })
};
