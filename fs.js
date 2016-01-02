var fs = require('fs');

var stream = new fs.ReadStream("dfd");

stream.on('readable', function(){
	var data = stream.read();
	if(data){
		console.log(data.toString());
	}
})
stream.on('end', function(){
	console.log('The End!!!');
})
stream.on('error', function(){
	console.log('Ops, some error');
})