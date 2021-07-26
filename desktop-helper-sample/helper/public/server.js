const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const startServer = async () => {
  const port = 4040;

  const app = express();

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET'],
      transports: ['websocket'],
    },
  });

  server.listen(port, () => {
    console.log(`[server] Server listening on port ${port}`);
  });

  io.on('connection', (socket) => {
    io.emit('server-connection', true);

    socket.on('uxp-connected', () => {
      io.emit('uxp-connected', true);
    });

    socket.on('message', (message) => {
      io.emit('uxp-message', message);
    });

    socket.on('helper-message', (message) => {
      io.emit('message', message);
    });

    socket.on('disconnect', () => {
      io.emit('uxp-connected', false);
    });
  });

  // Emit connect when uxp attempts to reconnect
  io.on('reconnect', () => {
    io.emit('server-connection', true);
  });

  // Emit disconnect when helper app closes
  process.on('exit', () => {
    io.emit('server-connection', false);
  });
};

startServer().catch((err) => {
  console.log(`[server] Error: ${err}`);
});
