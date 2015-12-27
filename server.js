var http = require('http'),
	util = require('util'),
	url = require('url');

var server = new http.Server();

server.listen(1337, '127.0.0.1');

var emit = server.emit;
server.emit = function(event){
	console.log(event);
	emit.apply(server, arguments);
}

server.on('request', function(req, res){
	var urlParsed = url.parse(req.url, true);
	if(urlParsed.pathname == '/echo' && urlParsed.query.message){
		res.end(urlParsed.query.message);
	}
	else{
		res.statusCode = 404;
		res.end("Page not found((");
	}
	//console.log(urlParsed);
	//res.end(urlParsed.toString());
});