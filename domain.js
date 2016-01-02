var domain = require('domain'),
	server = require('./server');

var serverDomain = domain.create();
serverDomain.on('error', function(e){
	console.log('domain catch error: %s', e.toString());
});
serverDomain.run(function(){
	server.listen(1337, '127.0.0.1');
});