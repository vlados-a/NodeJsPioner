var winston = require('winston');

module.exports = function(module){
	return CreateLogger(module.filename);
}

function CreateLogger(path){
	if(path.match(/request.js$/)){
		var transports = [
			new winston.transports.Console({
				timestamp: true,
				colorize: true,
				level: 'info'
			}),
			new winston.transports.File({
				filename: 'debug.log',
				level: 'debug'
			})
		];
		return new winston.Logger({transports: transports});
	}
	else{
		return new winston.Logger({transports: []});
	}
}