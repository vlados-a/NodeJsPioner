var User = require('models/user').User,
    HttpError = require('error').HttpError,
    async = require('async');

exports.get = function(req, res, next){
  res.render("login");
};

exports.post = function(req, res, next){
  var username = req.body.username,
      password = req.body.password;

  async.waterfall([
    function(callback){
      user.findOne({username: username},callback);
    },
    function(user, callback){
      if(user){
        if(user.checkPassword(password)){
          callback(null, user);
        }
        else{
          next(new HttpError(403, "Incorrect password"));
        }
      }
      else{
        var user = new User({username: username, password: password});
        user.save(function(err, u){
          if(err) return next(err);
          callback(null, user)
        });
      }
    }
  ], function(err, user){
    if(err) return next(err);
    req.session.user_id = user._id;
    res.send({});
  });
}
