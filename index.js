var express = require("express")
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
  res.sendFile("/home/tch/Devel/javascript/test/server/index.html");
});

var buddies = {}

io.on("connection", function(socket){
  console.log("user connected");

  var buddy = {}
  buddy["id"] = socket.id;
  buddy["name"] = "Unnamed";
  buddy["x"] = Math.floor((Math.random() * (256 - 40)) + 20);
  buddy["y"] = Math.floor((Math.random() * (256 - 40)) + 20);
  buddies[socket.id] = buddy;

  socket.emit("initialized", socket.id, buddies); 
  socket.broadcast.emit("added", buddy);

  socket.on("update", function(properties){
    console.log("user updated");

    if ("x" in properties) {
      buddy["x"] = properties["x"];
    }
    if ("y" in properties) {
      buddy["y"] = properties["y"];
    }
    if ("name" in properties) {
      buddy["name"] = properties["name"];
    }

    socket.broadcast.emit("updated", buddy);
  });

  socket.on("disconnect", function(){
    console.log("user disconnected");
    delete buddies[socket.id];
    socket.broadcast.emit("removed", socket.id);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
