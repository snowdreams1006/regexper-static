const buildId = [
  process.env.CI_COMMIT_REF_SLUG || 'prerelese',
  (process.env.CI_COMMIT_SHA || 'gitsha').slice(0, 7)
].join('-');
const banner = process.env.BANNER || (process.env.NODE_ENV === 'production'
  ? false
  : (process.env.NODE_ENV || 'development'));

module.exports = {
  siteMetadata: {
    buildId,
    banner,
    defaultSyntax: 'js',
    syntaxList: [
      { id: 'js', label: 'JavaScript' },
      { id: 'pcre', label: 'PCRE' }
    ]
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GA_PROPERTY,
        anonymize: true,
        respectDNT: true
      }
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: process.env.SENTRY_DSN,
        environment: process.env.DEPLOY_ENV || process.env.NODE_ENV,
        debug: (process.env.NODE_ENV !== 'production'),
        release: buildId
      }
    }
  ]
};
