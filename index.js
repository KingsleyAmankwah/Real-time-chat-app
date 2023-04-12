const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("User is online.");

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User is offline.");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
