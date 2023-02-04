// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  reactStrictMode: true,
  images: {
    domains: [],
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
    API_VERSION: process.env.API_VERSION,
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
  },
  experimental: {
    nextScriptWorkers: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
});
