var Message=require('../message.js');
var componentBase=require('./componentBase.js');
module.exports=function(){
  console.log("new input");
  componentBase.call(this);
  this.receive=function(message){
    console.log("operator received",message.stringify());
  }
}