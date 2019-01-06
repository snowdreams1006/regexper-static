const i18n = jest.requireActual('i18n');

// Load empty resource bundle to reduce logging output
i18n.default.addResourceBundle('dev', 'translation', {});
i18n.default.addResourceBundle('en', 'translation', {});
i18n.default.addResourceBundle('other', 'translation', {});

module.exports = {
  ...i18n,
  locales: [
    { code: 'en', name: 'English' },
    { code: 'other', name: 'Other' }
  ],
  mockT: str => `TRANSLATE(${ str })`
};
