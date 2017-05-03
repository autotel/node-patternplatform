var onHandlers=require('onHandlers');

var httpPort=80;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var SocketMan = require('socket.io')(http);

module.exports=new (function(){
  onHandlers.call(this);

  this.start=function(file){
    app.get('/', function(req, res){
      app.use(express.static('frontend'));
      res.sendFile(file);
    });
    http.listen(httpPort, function(){
      console.log('listening on :'+httpPort);
    });
    SocketMan.on('connection', function(socket){
      console.log('a user connected');
    });
  }

  var messageNames={
    HELLO:0X01,
    CHANGE:0X02,
    EVENT:0X03,
  }


//pseudo code
  SocketMan.on('message',function(event){
    var newEvent=event;
    console.log(event);
    this.handle(event.message,event);
  });




  return this;
})();