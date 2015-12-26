var util = require('util');

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