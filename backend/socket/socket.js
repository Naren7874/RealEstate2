import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Handle multiple client URLs if needed (comma-separated in .env)
const corsOrigins = process.env.CLIENT_URL?.replace(/\/$/, '') || "http://localhost:5173";


const io = new Server(server, {
  cors: {
    origin: corsOrigins,
    credentials: true,
    methods: ["GET", "POST"]
  }
});

const onlineUsers = [];


const addUser = (userId, socketId) => {
  if (!userId || !socketId) return;
  
  const userExists = onlineUsers.some(user => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId });
    console.log(`User added: ${userId} with socket ${socketId}`);
  }
};

const removeUser = (socketId) => {
  const index = onlineUsers.findIndex(user => user.socketId === socketId);
  if (index !== -1) {
    const removedUser = onlineUsers.splice(index, 1)[0];
    console.log(`User removed: ${removedUser.userId} with socket ${socketId}`);
  }
};

const getUser = (userId) => {
  return onlineUsers.find(user => user.userId === userId);
};

io.on('connection', (socket) => {
  // console.log(`New connection: ${socket.id}`);
  
  const userId = socket.handshake.query.userId;
  
  if (userId && userId !== "undefined") {
    addUser(userId, socket.id);
    io.emit('onlineUsers', onlineUsers.map(user => user.userId));
  }
  
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    // console.log(`User with ID ${userId} connected, socket ID: ${socket.id}`);
  });

  socket.on('sendMessage', ({ receiverId, data }) => {
    if (!receiverId || !data) {
      console.error('sendMessage error: receiverId or data is missing');
      return;
    }
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit('getMessage', data);
      // console.log(`Message delivered to ${receiverId}`);
    } else {
      console.log(`Receiver ${receiverId} offline. Message not delivered.`);
    }
  });

  socket.on('disconnect', () => {
    // console.log(`Disconnected: ${socket.id}`);
    removeUser(socket.id);
    
    if (userId && userId !== "undefined") {
      io.emit('onlineUsers', onlineUsers.map(user => user.userId));
    }
  });
});

export { io, server, app };