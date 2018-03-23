let path = require('path');
let console = require('./logger').logger;

function Config() {
  this.configLocation = './config/config.json';
  this.config = {};

  this.loadConfig = function () {
    try {
      if (!path.isAbsolute(this.configLocation)) {
        var fileLocation = path.resolve(__baseDir, this.configLocation);
      }
      else {
        var fileLocation = this.configLocation;
      }
      console.info(`Loading config from json file ${fileLocation}`);
      this.config = require(fileLocation);
    }
    catch (err) {
      console.error(`Error loading config file. ${err}`);
      this.config = {};
      throw err;
    }
  };
}

var config = new Config();

module.exports = {
  configObject: config,
  Config
};
