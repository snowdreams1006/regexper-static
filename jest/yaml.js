const yaml = require('js-yaml');

module.exports = {
  process(src) {
    return `module.exports = ${ JSON.stringify(yaml.safeLoad(src)) };`;
  }
};
