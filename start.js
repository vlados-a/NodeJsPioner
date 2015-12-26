var user = require('user'),
	log = require('logger')(module);

var  run = function(){
	var tom = new user("Tom");
	var bob = new user("Bob");

	tom.hello(bob);
}

if(module.parent){
	eports.run = run;
}
else{
	log("start executing...");
	run();
}