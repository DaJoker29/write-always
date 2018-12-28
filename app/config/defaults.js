require('module-alias/register');
const { name, description } = require('@root/package.json');

module.exports = {
  name: name || 'Write, Well',
  description: description || 'A community built around stories',
  tagline: 'Go confidently...',
  'theme-color': '#481b1b'
};
