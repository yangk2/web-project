// write log on database, file
var winston = require('winston');
const {transports, createLogger, format} = require('winston');
var path = require('path');
var moment = require('moment');

var logDirectory = path.join(".", "logs");


var fileLogger = winston.createLogger({
    format: format.combine(
        format.timestamp({
            format: moment().format("YYYY-MM-DD HH:mm:ss")
        }),
        format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
    ),
    transports: [
      new (winston.transports.Console)({
       colorize: true,
       level: 'info',
       timestamp: function(){             //한국 시간 나타내는법
            return moment().format("YYYY-MM-DD HH:mm:ss");
       }
     }),
      new (require('winston-daily-rotate-file'))({
        level: 'info',
        filename: `${logDirectory}/log.log`,
        prepend: true,
        timestamp: function(){             //한국 시간 나타내는법
            return moment().format("YYYY-MM-DD HH:mm:ss");
        }
      })
    ]
  });

module.exports = {
  FileLog: fileLogger
};