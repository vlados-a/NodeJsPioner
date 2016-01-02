var fs = require('fs'),
	http = require('http');

var server = http.createServer(function(req, res){
	if(req.url = "index.html"){
		sendFile(new fs.ReadStream("index.html"), res);
	}
}).listen(1337, '127.0.0.1');

function sendFile(file, res){
	/*The code below is equal to file.pipe(res);*/
	file.pipe(res);
	file.pipe(process.stdout);
	file.on('error', function(){
		res.statusCode = 500;
		res.end('Internal server error');
		return;
	});
	res.on('close', function(){
		file.destroy();
	})
	/*file.on('readable', write);
	file.on('end', function(){
		res.end();
	});
	function write(data){
		var data = file.read();
		if(data && !res.write(data)){
			file.removeListener('readable', write);
			res.once('drain', function(){
				file.on('readable', write);
				write();
			});
		}
	}*/
}