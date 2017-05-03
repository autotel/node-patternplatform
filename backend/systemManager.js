var components=require('./components');
var Message=require('./message.js');

var connectionManager=new (function(){
  this.connect=function(){};
  this.disconnect=function(){};
  return this;
})();

var systemManager=function(httpSocket){
  httpSocket.on('start',function(){});
  httpSocket.on('componentCreated',function(event){});
  httpSocket.on('componentDeleted',function(event){});
  httpSocket.on('connectionCreated',function(event){});
  return this;
};


module.exports=systemManager;