import React, { createContext } from 'react';
import io from 'socket.io-client';

export const socket = io('http://localhost:4040', {
  transports: ['websocket'],
});

export const SocketContext = createContext();
