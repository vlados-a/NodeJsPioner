var fs = require('fs');

fs.open(__filename, 'r', function(err, res){
	console.log('IO');
});

setImmediate(function(){
	console.log('immediate');
});

process.nextTick(function(){
	console.log('nextTick');
});