'use strict';
var components=require('./components');
var Message=require('./message.js');
var uniqueArray=[];

//allocates a new data-bound item to the unique array and returns the id within the array;
function appendToUnique(what){
  var a=0;
  for(a in uniqueArray){
    if(uniqueArray[a]===false){
      uniqueArray[a]=what;
      console.log("assign slot"+a+"to new");
      return a;
    }
  }
  console.log("assign slot"+uniqueArray.length+"to new");
  return uniqueArray.push(what)-1;
}

var connectionManager=new (function(){
  this.connect=function(){};
  this.disconnect=function(){};
  return this;
})();


module.exports=function(master){
  return new(function(master){
    var server=master.httpSocket;
    this.createComponent=function(params,callback){
      if(typeof components[params.mode]==="function"){
        var modl=new components[params.mode]();
        var c=appendToUnique(modl);
        var nParams=params;
        nParams.unique=c;
        for(var a in nParams){
          modl[a]=nParams[a];
        }
        console.log("_assign"+nParams.unique);
        if(typeof callback==="function")
        callback(nParams);
      }else{
        console.warn("invalid component mode  "+params.type,JSON.stringify(params));
      }
    }
    this.tweakComponent=function(params,callback){
      if(uniqueArray[params.unique]){
        var modl=uniqueArray[params.unique];
        modl.getSocketParameters(params);
        if(typeof callback==="function"){
          callback(params);
        }
      }else{
        console.warn("requested a change in an element that doesn't exist "+params.unique,JSON.stringify(params));
      }
    }

    this.each=function(cb){
      for(var a in uniqueArray){
        cb.call(uniqueArray[a],{index:a});
      }
    }

  })(master);
};
