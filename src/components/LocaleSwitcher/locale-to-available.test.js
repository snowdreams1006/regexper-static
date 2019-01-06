import localeToAvailable from './locale-to-available';

describe('localeToAvailable', () => {
  test('when requested language and region are available', () => {
    expect(localeToAvailable('en-US', ['en', 'en-US', 'other'], 'other'))
      .toEqual('en-US');
  });

  test('when only requested language is available', () => {
    expect(localeToAvailable('en-US', ['en', 'en-GB', 'other'], 'other'))
      .toEqual('en');
  });

  test('when language is unavailable', () => {
    expect(localeToAvailable('en-US', ['tlh', 'other'], 'other'))
      .toEqual('other');
  });
});
