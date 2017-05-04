var onHandlers=require('onHandlers');

var httpPort=80;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var SocketMan = require('socket.io')(http);
var getMessageNames=require('../bothEnds/messageNames.js');
module.exports=new (function(){
  onHandlers.call(this);
  var serverMan=this;
  var SocketClient = new (require('./SocketClient.js'))(this);

  getMessageNames(this);

  this.start=function(file){
    app.get('/', function(req, res){
      app.use("/",express.static('frontend'));
      app.use("/shared",express.static('bothEnds'));
      res.sendFile(file);
    });
    http.listen(httpPort, function(){
      console.log('listening on :'+httpPort);
    });
    SocketMan.on('connection', function(socket){
      new SocketClient.add(socket,serverMan);
    });
  }



//pseudo code
  SocketMan.on('message',function(event){
    var newEvent=event;
    console.log(event);
    this.handle(event.message,event);
  });

  this.sendChange=function(data){}
  this.sendEvent=function(data){}
  this.sendConsole=function(data){}




  return this;
})();