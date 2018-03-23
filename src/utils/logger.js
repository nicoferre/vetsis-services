let winston = require('winston');
let moment = require('moment');
let fs = require('fs');
let path = require('path');

let tsFormat = moment().format();
let logDir = '../log';

function formatter(args) {
  let dateTime = tsFormat;
  let logMessage = dateTime + ' - ' + args.level + ': ' + args.message;
  return logMessage;
}

function Logger(){
  try{
    console.info("Redirect console to file");
    this.logFolderPath =  path.resolve(__baseDir, logDir);
    if(!fs.existsSync(this.logFolderPath)){
      fs.mkdirSync(this.logFolderPath);
    }

    this.logger = new (winston.Logger)({
      transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
          colorize: true,
          level: 'info',
          timestamp: tsFormat
        }),
        new (winston.transports.File)({
          filename: this.logFolderPath+'/results.log',
          level: 'info',
          formatter: formatter,
          json: false
        })
      ]
    });
  }catch(err){
    console.error(`Error redirecting console. ${err}`);
  }
}

let logger = new Logger();

module.exports = {
  Logger: Logger,
  logger: logger.logger
};
