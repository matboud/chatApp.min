const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = 3000;

io.on("connection", socket => {
   console.log("user in");
   socket.on('chat message', msg => {
      console.log('message sent: ', msg)
      io.emit('chat message', msg)
   })
});

server.listen(port, () => console.log("server ON!" + port));