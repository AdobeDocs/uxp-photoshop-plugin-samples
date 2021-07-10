const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const startServer = async () => {
  const port = 4040;
  const app = express();
  const server = http.createServer(app);

  const io = new Server(server);

  server.listen(port, () => {
    console.log(`[server] Server listening on port ${port}`);
  });
  
  io.on('connection', (socket) => {
    console.log('[socket.io] UXP plugin connected');

    io.emit('uxp-connected', true);

    socket.on('message', (message) => {
      console.log(`Message received from client: ${message}`);
    });

    socket.on('disconnect', () => {
      console.log('[socket.io] UXP plugin disconnected');
    });
  });

  // Emit connect when uxp attempts to reconnect
  io.on('reconnect', (socket) => {
    io.emit('uxp-connected', true);
  });

  // Emit disconnect when helper app closes 
  process.on('exit', () => {
    io.emit('uxp-connected', false);
  });
};

startServer().catch((err) => {
  console.log(`[server] Error: ${err}`)
});