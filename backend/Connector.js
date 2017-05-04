module.exports=function(owner){
  owner.children=[];
  var children=owner.children;
  this.sendToAll=function(message){
    for(var a of children){
      children[a].putMessage(message);
    }
    return true;
  }
  this.sendToN=function(message,a){
    if(children[a]){
      children[a].putMessage(message);
    }else{
      return false;
    }
  }
  this.sendTo=function(message,to){
    to.putMessage(message);
  }

  this.connect=function(to){
    if(typeof to.putMessage==='function'){
      children.push(to);
    }else{
      //pendant: this warning should be sent to the socket
      console.warn("connect destination is not valid");
    }
  }
}