const winston = require('winston');


const loggerClient = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'logs/Clientlogs.log' })
    ]
  });


module.exports.loggerClient = loggerClient;

