var util = require('util');

/*util.inspect*/
var o = {
	a: 12,
	b: 14,
	c: function(){
		return 12;
	}
	/*inspect: function(){
		return 12;
	}*/
}
o.self = o;
var s = util.inspect(o);
console.log(s); // the same as console.log(o);


/*util.format*/
var s = util.format("My name is %s. I'm %d years old. My json description is: %j", "Uladzislau", 20, {name: "Uladzislau", age: 20});
console.log(s);// the same as console.log("My name is %s. I'm %d years old. My json description is: %j", "Uladzislau", 20, {name: "Uladzislau", age: 20});

/*util inherits*/

function Animal(name){
	this.name = name;
}

Animal.prototype.walk = function(){
	console.log("Animal %s is walking", this.name);
};

function Rabbit(name){
	this.name = name;
}
util.inherits(Rabbit, Animal);

Rabbit.prototype.jump = function(){
	console.log("Rabbit %s is jumping", this.name);
}

var rabbit = new Rabbit("Rob");
rabbit.walk();
rabbit.jump();