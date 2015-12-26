var user = require('user');

var  run = function(){
	var tom = new user("Tom");
	var bob = new user("Bob");

	tom.hello(bob);
}

if(module.parent){
	eports.run = run;
}
else{
	run();
}