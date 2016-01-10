exports.get = function(req, res, next){
  res.render("chat", {
    userId: req.session.user
  });
}
