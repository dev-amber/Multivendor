const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true,
  },
});

require("dotenv").config({
  path: "./.env",
});

app.use(cors({
  origin: "http://localhost:3000", // Your frontend URL
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world from socket server!");
});

let users = [];

const addUser = (userId, socketId) => {
  // Remove user if they already exist (to avoid duplicates)
  users = users.filter((user) => user.userId !== userId);
  users.push({ userId, socketId });
  console.log(`User ${userId} added with socket ${socketId}`);
};

const removeUser = (socketId) => {
  const user = users.find(user => user.socketId === socketId);
  if (user) {
    console.log(`User ${user.userId} removed`);
  }
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

// Define a message object with a seen property
const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

// Move messages object outside of connection handler
const messages = {}; // Object to track messages sent to each user

io.on("connection", (socket) => {
  // when connect
  console.log(`a user is connected: ${socket.id}`);

  // take userId and socketId from user
  socket.on("addUser", (userId) => {
    console.log(`addUser event received: ${userId} from socket: ${socket.id}`);
    addUser(userId, socket.id);
    io.emit("getUsers", users);
    console.log('Current online users:', users.map(u => ({ userId: u.userId, socketId: u.socketId })));
  });

  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    console.log(`Message from ${senderId} to ${receiverId}: ${text}`);
    const message = createMessage({ senderId, receiverId, text, images });

    const user = getUser(receiverId);

    // Store the messages in the `messages` object
    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    // send the message to the receiver
    if (user?.socketId) {
      io.to(user.socketId).emit("getMessage", message);
      console.log(`Message sent to ${receiverId} (socket: ${user.socketId})`);
    } else {
      console.log(`User ${receiverId} is not online`);
    }
  });

  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    // update the seen flag for the message
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.receiverId === receiverId && message.id === messageId
      );
      if (message) {
        message.seen = true;

        // send a message seen event to the sender
        if (user?.socketId) {
          io.to(user.socketId).emit("messageSeen", {
            senderId,
            receiverId,
            messageId,
          });
        }
      }
    }
  });

  // update and get last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessagesId,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log(`a user disconnected: ${socket.id}`);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Socket server is running on port ${process.env.PORT || 5000}`);
});