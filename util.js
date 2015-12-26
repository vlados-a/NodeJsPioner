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