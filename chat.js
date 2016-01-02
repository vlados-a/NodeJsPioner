var clients = [];

exports.subscribe = function(req, res){
	res.on('close', function(){
		clients.splice(clients.indexOf(res), 1);
	});
	clients.push(res);
	console.log("Subscribe request. Number of subscribers: %s", clients.length);
}
exports.publish = function(message){
	console.log("Publish message: %s", message);
	console.log("Number of subscribers: %s", clients.length);
	clients.forEach(function(res){
		res.end(message);
	});
	clients = [];
}