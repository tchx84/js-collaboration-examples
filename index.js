var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('/home/tch/Devel/javascript/test/server/index.html');
});

var buddies = {}

io.on('connection', function(socket){
  console.log('user connected');

  var buddy = {}
  buddy['name'] = 'Unnamed';
  buddy["x"] = Math.floor((Math.random() * (256 - 40)) + 20);
  buddy["y"] = Math.floor((Math.random() * (256 - 40)) + 20);
  buddies[socket.id] = buddy;
 
  io.emit('update', buddies);

  socket.on('disconnect', function(){
    console.log('user disconnected');
    delete buddies[socket.id];
    io.emit('update', buddies);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
