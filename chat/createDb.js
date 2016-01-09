var User = require('models/user').User,
    mongoose = require('libs/mongoose'),
    asyn = require('async');

function open(callback){
  mongoose.connection.on('open', callback);
}

function dropDb(callback){
  var db = mongoose.connection.db;
  db.dropDatabase(callback);
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
}

asyn.series([
  open,
  dropDb,
  addUsers,
  close
], function(err, results){
    console.log(arguments);
    console.log('Ok');
});
