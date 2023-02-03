// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  reactStrictMode: true,
  images: {
    domains: [],
  },
  env: {
    API_BASE: process.env.SERVER_URL,
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
