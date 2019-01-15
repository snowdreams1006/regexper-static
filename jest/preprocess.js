const babelOptions = {
  presets: ['babel-preset-gatsby'],
  plugins: ['dynamic-import-node']
};

module.exports = require('babel-jest').createTransformer(babelOptions);
