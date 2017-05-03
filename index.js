
var outputManager = require('./backend/outputManager.js');
var httpSocket = require('./backend/server.js');
var systemManager = require('./backend/systemManager.js')(httpSocket);

httpSocket.start(__dirname + '/frontend/index.html');

outputManager.midi.play(0);