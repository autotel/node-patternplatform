var Connector=require('../Connector.js');
var onHandlers=require('onHandlers');
module.exports=function(){
  onHandlers.call(this);
  this.connector=new Connector(this);
  this.x=0;
  this.y=0;
  this.unique=0;
  this.mode="empty";
  this.boundParameters=['x','y','unique','mode'];
  this.ontoParams=['unique','mode'];
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
  //get the least parameters for creation
  //clients need all elements to be created first in order to be able to make
  //connections to these already created elements.
  this.getOntoParams=function(){
    var ret={};
    for (var a of this.ontoParams)
      ret[a]=this[a];
    return ret;
  }
  //get all cached parameters for initial configuration of objects.
  this.getAllParameters=function(){
    for (var a of this.boundParameters)
      if(!thisComponent.receivedParameters.hasOwnProperty(a))
        thisComponent.receivedParameters[a]=this[a];

    return thisComponent.receivedParameters;
  }
  return this;
};