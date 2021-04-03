global.__baseDir = __dirname;
var argv = require('./utils/argv.js');
var config = require('./utils/config.js').configObject;
if(argv.config != ''){
	config.configLocation = argv.config;
}
config.loadConfig();
var server = require('./server');
server.WebServer();
