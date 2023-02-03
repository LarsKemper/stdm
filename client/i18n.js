const formatters = {
  numerics: {
    en: new Intl.NumberFormat('en-EN'),
    de: new Intl.NumberFormat('de-DE'),
  },
  dateTime: {
    en: new Intl.DateTimeFormat('en-EN'),
    de: new Intl.DateTimeFormat('de-DE'),
  },
};

module.exports = {
  locales: ['en', 'de'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
    '/': ['home'],
  },
  interpolation: {
    format: (value, format, lang) => {
      switch (format) {
        case 'number':
          return formatters.numerics[lang].format(value);

        case 'date':
          return formatters.dateTime[lang].format(value);

        default:
          return value;
      }
    },
  },
};
