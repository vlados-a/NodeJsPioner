var http = require('http'),
	debug = require('debug')('server'),
	r = require('./request')

var server = http.createServer();
server.on('request', r);
server.listen(1337, '127.0.0.1');

debug("Server is running");