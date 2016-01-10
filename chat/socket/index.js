module.exports = function(server, logger){
  var io = require('socket.io').listen(server);
  io.set('origins', 'localhost:*');
  io.set('logger', logger);
  io.on('connection', function (socket) {
    socket.on('message', function (data,cd) {
      cd(data);
      socket.broadcast.emit('message', data);
    });
  });
}
