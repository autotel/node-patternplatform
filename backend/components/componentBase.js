var Connector=require('../Connector.js');
var onHandlers=require('onHandlers');
module.exports=function(){
  onHandlers.call(this);
  this.connector=new Connector(this);
  var thisComponent=this;
  this.putMessage=function(message){
    var nMessage=message.clone();
    thisComponent.receive(nMessage);
  };
  this.receive=function(message){
  }
  return this;
};