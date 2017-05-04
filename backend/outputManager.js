var jazz = require('jazz-midi');
var midi = new jazz.MIDI();
var name = midi.MidiOutOpen(0);

/*
either there is a cache of the notes that are on so they can be set off more easily from an item
or it just works like midi
*/
var Output=function(){

  this.play=function(params){
    console.log("this output module doesn't have a defined play function");
  };
  this.stop=function(params){
    console.log("this output module doesn't have a defined stop function");
  }
  this.remove=function(){
    midi.MidiOutClose();
  }
}

module.exports= function(master){return new(function(master){
  var MidiPlayer=new(function(){
    Output.call(this);
    return this;
  });
  this.midi=MidiPlayer;
  if(name){
    MidiPlayer.play=function(){
      console.log('Default MIDI-Out port:', name);
      midi.MidiOut(0x90,60,100);
      setTimeout(function(){
        midi.MidiOut(0x80,60,0);
        console.log('Thank you for using Jazz-MIDI!');
      }, 3000);
    }
  } else {
    console.log('Cannot open default MIDI-Out port!');
  }
  return this;
})()};