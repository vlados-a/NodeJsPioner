var phrase = require('./ru');

function User(name){
	this.name = name;
}

User.prototype.hello = function(who){
	console.log(phrase.Hello + ", " + who.name);
};

exports.User = User;