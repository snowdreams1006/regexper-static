const buildId = [
  process.env.CI_COMMIT_REF_SLUG || 'prerelese',
  (process.env.CI_COMMIT_SHA || 'gitsha').slice(0, 7)
].join('-');
const banner = (process.env.NODE_ENV === 'production') ? false : (process.env.NODE_ENV || 'development');

module.exports = {
  siteMetadata: {
    buildId,
    banner
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss'
  ]
};
