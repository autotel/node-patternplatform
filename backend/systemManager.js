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

    var createComponent=function(params,callback){
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
    this.createComponent=createComponent;
    this.each=function(cb){
      for(var a in uniqueArray){
        cb.call(uniqueArray[a],{index:a});
      }
    }
    server.on('start',function(){});

    server.on('rec_delete',function(event){
    });
    server.on('rec_change',function(event){
    });

  })(master);
};
