var operator=require('./operator.js');
var fifo=require('./fifo.js');
var input=require('./input.js');
var output=require('./output.js');

var components=new (function(){
  this.operator=operator;
  this.fifo=fifo;
  this.input=input;
  this.output=output;
  return this;
})();


module.exports=components;