var url = require('url'),
	debug = require('debug')('server:request');
module.exports = function(req, res){
	debug('ok');
	var urlParsed = url.parse(req.url, true);
	debug("Got request", req.method, req.url);
	if(urlParsed.pathname == '/echo' && urlParsed.query.message){
		var message = urlParsed.query.message;
		debug("Echo: " +  message);
		res.end(message);
		return;
	}

	debug("Unknown url");
	res.statusCode = 404;
	res.end("Not found");
}