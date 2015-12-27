var http = require('http'),
	util = require('util');

var server = new http.Server();

server.listen(1337, '127.0.0.1');

var counter = 0;
server.on('request', function(req, res){
	res.end(util.format("Hello, World! Request count: %d", ++counter));
});