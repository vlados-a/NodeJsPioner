var http = require('http'),
	log = require('./log')(module),
	r = require('./request')

var server = http.createServer();
server.on('request', r);
server.listen(1337, '127.0.0.1');

log.info("Server is running");