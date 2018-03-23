let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let SwaggerExpress = require('swagger-express-mw');
let console = require('./utils/logger').logger;
let configInfo = require('./utils/config').configObject.config;

var configDir = {
  appRoot: __dirname, // TODO:required config
};

function WebServer() {
  try {
    this.port = configInfo.WebServer.port;
    this.hostname = configInfo.WebServer.host;
    this.filesFolder = configInfo.WebServer.filesFolder;
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(function (req, res, next) {
      console.info(req.method + ' request for ' + req.url + ' - ' + JSON.stringify(req.body));
      next();
    });
    this.app.use(express.static(this.filesFolder));
    this.app.use(cors());

    swaggerInit(this);
  } catch (err) {
    console.error('Error initializing web server. Error: ' + err + '.');
    throw err;
  }
};

function swaggerInit(webServer) {
  SwaggerExpress.create(configDir, function (err, swaggerExpress) {
    swaggerInstance(err, swaggerExpress, webServer);
  });
}

function swaggerInstance(err, swaggerExpress, webServer) {
  if (err) {
    throw err;
  }
  swaggerExpress.register(webServer.app);
  webServer.app.listen(webServer.port, webServer.hostname);
  console.info('WebServer listening on port:' + webServer.port + ' and host:' + webServer.hostname);
};

module.exports = {
  WebServer: WebServer,
};
