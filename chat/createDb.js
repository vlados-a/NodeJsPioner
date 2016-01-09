var User = require('models/user').User,
    mongoose = require('libs/mongoose'),
    asyn = require('async');


asyn.series([
  open,
  dropDb,
  requireModels,
  addUsers
], function(err, results){
    console.log(arguments);
    close();
});

function open(callback){
  mongoose.connection.on('open', callback);
}

function dropDb(callback){
  var db = mongoose.connection.db;
  db.dropDatabase(callback);
}

function requireModels(callback){
  require('models/user');

  asyn.each(Object.keys(mongoose.models), function(modelName, callback){
    mongoose.models[modelName].ensureIndexes(callback);
  }, callback);
}

function addUsers(callback){
  require('models/user');
  var users = [
    {username: 'Vlad', password: 'secret'},
    {username: 'Yura', password: 'secret'},
    {username: 'Olya', password: 'secret'}
  ];
  asyn.each(users, function(userData, callback){
    var user = new User(userData);
    user.save(callback);
  }, callback);
}

function close(){
  mongoose.disconnect();
  console.log('Ok');
}
