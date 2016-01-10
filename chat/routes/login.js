var User = require('models/user').User,
    HttpError = require('error').HttpError,
    AuthError = require('models/user').AuthError,
    async = require('async');

exports.get = function(req, res, next){
  res.render("login");
};

exports.post = function(req, res, next){
  var username = req.body.username,
      password = req.body.password;

  User.authorize(username, password, function(err, user){
    if(err){
      if(err instanceof AuthError){
        return next(new HttpError(403, err.message));
      }
      return next(err);
    }
    req.session.user = user._id;
    res.send({});
  });
}
