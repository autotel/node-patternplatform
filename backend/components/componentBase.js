var Connector=require('../Connector.js');
var onHandlers=require('onHandlers');
module.exports=function(){
  onHandlers.call(this);
  this.connector=new Connector(this);
  this.x=0;
  this.y=0;
  this.unique=0;
  this.mode="empty";
  this.boundParameters=['x','y','unique','mode','children'];
  this.receivedParameters={};
  var thisComponent=this;
  this.putMessage=function(message){
    var nMessage=message.clone();
    thisComponent.receive(nMessage);
  };
  this.receive=function(message){
  }
  this.getSocketParameters=function(params){
    for(var a in params){
      thisComponent.receivedParameters[a]=params[a];
    }
  };
  this.getAllParameters=function(){
    for (var a of this.boundParameters)
      if(!thisComponent.receivedParameters.hasOwnProperty(a))
        thisComponent.receivedParameters[a]=this[a];

    return thisComponent.receivedParameters;
  }
  return this;
};