const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = 3000;

io.on("connection", socket => {
   console.log("user in");
});

server.listen(port, () => console.log("server ON!" + port));