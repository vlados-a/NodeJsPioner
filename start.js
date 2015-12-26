var user = require('./user');

var tom = new user.User("Tom");
var bob = new user.User("Bob");

tom.hello(bob);