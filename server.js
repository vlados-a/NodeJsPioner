var http = require('http'),
	fs = require('fs'),
	chat = require('./chat');

http.createServer(function(req, res){
	switch(req.url){
		case '/':
			sendFile("index.html", res);
			break;
		case '/subscribe':
			chat.subscribe(req, res);
			break;
		case '/publish':
			var body = '';
			req.on('readable', function(){
				body += req.read();
				if(body.length > 1e4){
					res.statusCode = 413;
					res.end("Your message is too big for my chat");
				}
			});
			req.on('end', function(){
				try{
					body = JSON.parse(body);
					chat.publish(body.message);
				}
				catch(e){
					res.statusCode = 400;
					res.end("Bad request");
					return;
				}
			});
			break;
		default:
			res.statusCode = 404;
			res.end('Page not found');
	}
}).listen(1337, '127.0.0.1');

function sendFile(fileName, res){
	var file = fs.createReadStream(fileName);
	file.on('error',function(){
		res.statusCode = 500;
		res.end("Internal server error");
	});
	file.pipe(res);
}
