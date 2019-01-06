const localeToAvailable = (locale, available, defaultLocale) => {
  if (available.includes(locale)) {
    return locale;
  }

  const parts = locale.split('-');

  if (parts.length > 0 && available.includes(parts[0])) {
    return parts[0];
  }

  return defaultLocale;
};

export default localeToAvailable;
