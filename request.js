var url = require('url'),
	log = require('./log')(module);
module.exports = function(req, res){
	var urlParsed = url.parse(req.url, true);
	log.info("Got request", req.method, req.url);
	if(urlParsed.pathname == '/echo' && urlParsed.query.message){
		var message = urlParsed.query.message;
		log.debug("Echo: " +  message);
		res.end(message);
		return;
	}

	log.error("Unknown url");
	res.statusCode = 404;
	res.end("Not found");
}