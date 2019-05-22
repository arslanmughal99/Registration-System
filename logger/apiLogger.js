const winston = require('winston');


const loggerApi = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'logs/ApiLogs.log' })
    ]
  });


const globalogger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/ApiGlobalExceptions.log' })
  ]
});


module.exports.loggerApi = loggerApi;
module.exports.globalLogger = globalogger;

