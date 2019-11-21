const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const router = require('./routes');
const { addUser, removeUser, getUser, getUserInRoom, getAllRooms } = require('./users');

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(router);

io.on('connection', (socket) => {
    console.log("connection");

    socket.on('disconnect', () => {
        console.log("disconnection");
    });
});



server.listen(PORT, () => console.log(`Server has run on port ${PORT}`));

