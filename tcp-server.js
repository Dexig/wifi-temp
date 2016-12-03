'use strict';
const net = require('net');
const fs = require('fs');

let temp = 0;
let index = 0;
let port = '3000';

let server = net.createServer(socket => {
  console.log(`CONNECTED: ${socket.remoteAddress} ${socket.remotePort}`);
  socket.on('data', data => {
    //console.log(`DATA: ${socket.remoteAddress} ${data}`);
    index++;
    if (~data.indexOf('r')) {
      data = data.toString('utf8').replace('r', '');
      if (!isNaN(+data)) temp += +data;
    }
    if (index === 10) {
      let data = 0;
      index = 0;
      data = temp / 10
      fs.appendFile('./temperature', `${+new Date()}\t${data}\n`, 'utf8');
      temp = 0;
    }
  });
  socket.on('close', data => {
    console.log(`CLOSED: ${socket.remoteAddress} ${socket.remotePort}`)
  });
}).listen(port);

server.listen(() => {
  console.log(`Listening on port: ${port}`);
});