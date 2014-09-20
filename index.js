var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('/home/tch/Devel/javascript/test/server/static/index.html');
});

var connections = 0;

io.on('connection', function(socket){
  console.log('user connected');
  connections += 1;
  io.emit('update', connections);
  socket.on('disconnect', function(){
    console.log('user disconnected');
    connections -= 1;
    io.emit('update', connections);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
