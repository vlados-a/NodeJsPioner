var user = require('./user');

var  run = function(){
	var tom = new user.User("Tom");
	var bob = new user.User("Bob");

	tom.hello(bob);
}

if(module.parent){
	eports.run = run;
}
else{
	run();
}