var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	path = require('path');

var root = __dirname + '\\public';

http.createServer(function(req,res){
	if(!checkAccess(req)){
		res.statusCode = 403;
		res.end('Tell me the secret');
		return;
	}
	sendFileSafe(url.parse(req.url).pathname, res);
}).listen(1337,'127.0.0.1');

function checkAccess(req){
	return url.parse(req.url, true).query.secret == 'o_O';
}

function sendFileSafe(filePath, res){
	try{
		var filePath = decodeURIComponent(filePath);
	}
	catch(e){
		res.statusCode = 400;
		res.end('Bad request');
		return;
	}

	if(~filePath.indexOf('\0')){
		res.statusCode = 400;
		res.end('Bad request');
		return;
	}

	filePath = path.normalize(path.join(root, filePath));
	console.log("Requested file: %s", filePath);
	console.log("Root is: %s", root);
	if(filePath.indexOf(root) != 0){
		res.statusCode = 404;
		res.end('File not found');
		return;
	}

	fs.stat(filePath, function(err, stats){
		if(err || !stats.isFile()){
			res.statusCode = 404;
			res.end('File not found');
			return;			
		}

		sendFile(filePath, res);
	})
}

function sendFile(filePath, res){
	fs.readFile(filePath, function(err, data){
		if(err) throw err;

		var mime = require('mime').lookup(filePath);
		res.setHeader('Content-Type', mime + "; charset=utf-8");
		res.end(data);
	});
}