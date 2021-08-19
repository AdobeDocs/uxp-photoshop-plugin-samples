import React, { createContext } from 'react';
import io from 'socket.io-client';

export const socket = io('http://127.0.0.1:4040');

export const SocketContext = createContext();
