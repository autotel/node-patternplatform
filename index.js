var master={};

master.outputManager = require('./backend/outputManager.js')(master);
master.httpSocket = require('./backend/server.js')(master);
master.systemManager = require('./backend/systemManager.js')(master);
var outputManager=master.outputManager;
var httpSocket=master.httpSocket;
var systemManager=master.systemManager;

httpSocket.start(__dirname + '/frontend/index.html');

var shoplist=[
  //composite
  'flower',
  //molecule
  'licog',
  //submolecule
  'monitor',
  'operator',
  'input',
  //'muxer',
  'fifo',
  'output',
];

var c=0;
for(var element of shoplist){
  systemManager.createComponent({mode:element,x:100,y:30*(shoplist.length-c)});
  c++;
}

outputManager.midi.play(0);