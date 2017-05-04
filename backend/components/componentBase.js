var Connector=require('../Connector.js');
var onHandlers=require('onHandlers');
module.exports=function(){
  onHandlers.call(this);
  this.connector=new Connector(this);
  this.x=0;
  this.y=0;
  this.mode="empty";
  this.boundParameters=['x','y','mode','children'];
  var thisComponent=this;
  this.putMessage=function(message){
    var nMessage=message.clone();
    thisComponent.receive(nMessage);
  };
  this.receive=function(message){
  }
  this.getAllParameters=function(){
    var ret={};
    for (var a of thisComponent.boundParameters){
      ret[a]=this[a];
    }
    return ret;
  }
  return this;
};