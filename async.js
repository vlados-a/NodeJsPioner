var fs = require('fs'),
	http = require('http');

http.createServer(function(req, res){
	if(req.url = '/'){
		fs.readFile('index.html', function(err, file){
			if(!err){
				res.end(file);
			}
			res.statusCode = 500;
			res.end('File not found');
			return;
		})
	}
}).listen(1337, '127.0.0.1');