var onHandlers=require('onHandlers');

var httpPort=80;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var SocketMan = require('socket.io')(http);

module.exports=new (function(){
  onHandlers.call(this);
  var serverMan=this;
  var SocketClient = new (require('./SocketClient.js'))(this);

  var messageIndexes={
    HELLO:0,
    CHANGE:0,
    CREATE:0,
    DELETE:0,
    EVENT:0,
    CONSOLE:0
  }
  var messageNames=[];
  var b=0;
  for(var a in messageIndexes){
    console.log("name of "+b+" = "+a);
    messageIndexes[a]=b;
    messageNames[b]=a;
    b++;
  }
  this.messageNames=messageNames;
  this.messageIndexes=messageIndexes;

  this.start=function(file){
    app.get('/', function(req, res){
      app.use(express.static('frontend'));
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