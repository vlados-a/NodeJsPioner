exports.post = function(req, res, next){
  var io = req.app.get('io');
  var sid = req.session.id;
  var userRoom = "user:" + req.user.username;
  var connectedSockets = io.of('/').in(userRoom).connected;

  req.session.destroy(function (err) {
      Object.keys(connectedSockets).forEach(function (socketId) {
          var socket = connectedSockets[socketId];
          if (socket.request.session.id == sid) {
              socket.emit('logout');
              socket.disconnect();
          }
      });

      if (err) return next(err);
      res.redirect('/');
  });
}
