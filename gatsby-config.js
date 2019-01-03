module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Bangers'],
          text: 'Regxpr'
        }
      }
    }
  ]
};
