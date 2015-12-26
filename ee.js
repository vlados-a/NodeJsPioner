var eventEmitter = require("events").EventEmitter;
var server = new eventEmitter();

server.on('request', function(request){
	request.approved = true;
});
server.on('request', function(request){
	console.log(request);
});

server.emit('request',{from:"1st client"});
server.emit('request',{from:"2nd client"});

//server.emit('error') throw TypeError if there are no handlers
// server.emit('error', new Error()) throw Errror if there are no handlers
server.on('error', function(e){
	console.log(e.message);
});
server.emit('error', new Error("Show how error event handles"));

/*Memory leaks example*/
/* in this example memory cleans*/
/*function Request(){
	var self = this;
	self.bigdata = new Array(1e6).join('*');
	self.send = function(data){
		console.log(data);
	}
	self.onError = function(){
		self.send("Something goes wrong");
	}
}

setInterval(function(){
	var r = new Request();
	console.log("Memory used: %s", process.memoryUsage().heapUsed);
}, 200);*/


/*This example demonstrates that all listeners store at ee object,
so there are some closures, that could lead to memory leaks.
To fix the problem we should remove listeners using eventemitter.removeListener(event, listenerName) */

/*var db = new eventEmitter();
db.setMaxListeners(0);
function Request(){
	var self = this;
	self.bigdata = new Array(1e6).join('*');
	self.send = function(data){
		console.log(data);
	}
	self.onError = function(){
		self.send("Something goes wrong");
	}

	db.on('data',function(info){
		self.send(info);
	});
}

setInterval(function(){
	var r = new Request();
	console.log("Memory used: %s", process.memoryUsage().heapUsed);
}, 200);*/
var db = new eventEmitter();
db.setMaxListeners(0);
function Request(){
	var self = this;
	self.bigdata = new Array(1e6).join('*');
	self.send = function(data){
		console.log(data);
	}
	self.onError = function(){
		self.send("Something goes wrong");
	}

	function onData(info){
		self.send(info);
	}
	db.on('data',onData);
	self.end = function(){
		db.removeListener('data', onData);
	}
}

setInterval(function(){
	var r = new Request();
	console.log("Memory used: %s", process.memoryUsage().heapUsed);
	r.end();
}, 200);