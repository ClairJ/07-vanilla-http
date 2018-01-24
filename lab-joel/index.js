const server = require('./lib/server.js');
server.start(4444, () => console.log('now listening on 4444'));
