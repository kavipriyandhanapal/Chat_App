import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const myserver = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const activeUsersMap = {};

export const getReceiverChatId = (userId) => {
  return activeUsersMap[userId];
};

myserver.on("connection", (socket) => {
  console.log("A User Connected", socket.id);

  const user = socket.handshake.query.userId;

  if (user) {
    activeUsersMap[user] = socket.id;
  }

  myserver.emit("getUsers", Object.keys(activeUsersMap));

  socket.on("disconnect", () => {
    console.log("A User Disconnected", socket.id);
      delete activeUsersMap[user];
      myserver.emit("getUsers", Object.keys(activeUsersMap));
  });
});

export { app, server, myserver };
