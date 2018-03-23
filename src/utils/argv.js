var argv = require('yargs');

argv.default('config', '');

module.exports = argv.argv;
