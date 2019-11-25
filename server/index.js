const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const router = require('./routes');
const { addUser, removeUser, getUser, getUserInRoom, getAllRooms, getAllUsersInRoom } = require('./users');

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(router);

io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room});  //2 params in the object because users.js addUser function has 2 return values, and we have to set 3 params
        if (error) return callback(error);

        socket.join(user.room);
        const usersArray = getAllUsersInRoom(user.room);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined`});
        io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)});
        socket.emit('userArray', Array.from(usersArray));

        callback();
    });

    socket.on('rooms', rooms => {
        const roomArray = getAllRooms(rooms);
        console.log(roomArray);

        socket.emit('roomArray',  Array.from(roomArray));
    });

    // socket.on('users', room => {
    //     const usersArray = getAllUsersInRoom(room);
    //     console.log(usersArray);
    //
    //     socket.emit('userArray', Array.from(usersArray));
    // });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(message);

        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)});

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room)});
        }
    })
});

server.listen(PORT, () => console.log(`Server has run on port ${PORT}`));

