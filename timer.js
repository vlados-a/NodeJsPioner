var http = require('http');

var server = http.createServer(function(req, res){
	res.end('Hello world');
});

setTimeout(function(){
	server.close();
	console.log('Server closed');
}, 3000);

var timer = setInterval(function(){
	console.log('Working well');
}, 1000);
timer.unref();