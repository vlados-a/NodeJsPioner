var User = require('models/user').User,
    mongoose = require('libs/mongoose'),
    asyn = require('async');

mongoose.connection.on('open', function(){
  var db = mongoose.connection.db;

  db.dropDatabase(function(err){
    if(err) throw err;
    console.log('OK');
    asyn.parallel([
      function(callback){
        var vlad = new User({username: 'Vlad', password: 'secret'});
        vlad.save(function(err){
          callback(err, vlad);
        });
      },
      function(callback){
        var yura = new User({username: 'Yura', password: 'secret'});
        yura.save(function(err){
          callback(err, yura);
        });
      },
      function(callback){
        var olya = new User({username: 'Olya', password: 'secret'});
        olya.save(function(err){
          callback(err, olya);
        });
      }
    ], function(err, results){
        console.log(results);
        mongoose.disconnect();
    });
  });
})
