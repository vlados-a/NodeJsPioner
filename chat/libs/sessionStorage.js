var mongoose = require('./mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

module.exports.session = session;
module.exports.sessionStore = sessionStore;
