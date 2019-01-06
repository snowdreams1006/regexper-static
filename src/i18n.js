import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';

export const locales = [
  { code: 'en', name: 'English' },
  { code: 'en-AC', name: 'English (ALL CAPS)' }
];

i18n
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: 'en',
    debug: false,
    keySeparator: null,
    nsSeparator: null,
    saveMissing: true,
    saveMissingTo: 'current',
    missingKeyHandler: (lng, ns, key, fallback) => {
      const escapedKey = key.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      // eslint-disable-next-line no-console
      if (console && console.group && console.log) {
        // eslint-disable-next-line no-console
        console.group(`Missing key in ${ lng }`);
        // eslint-disable-next-line no-console
        console.log(`"${ escapedKey }": |\n  ${ fallback }`);
        // eslint-disable-next-line no-console
        console.groupEnd();
      }
    },
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '{{lng}}',
      parse: data => data,
      ajax: (lng, options, callback) => {
        try {
          import(`locales/${ lng }.yaml`).then(
            locale => callback(locale, { status: '200' }),
            () => callback(null, { status: '404' }));
        }
        catch (e) {
          callback(null, { status: '404' });
        }
      }
    }
  });

export default i18n;
