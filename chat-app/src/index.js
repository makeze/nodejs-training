const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {generateMessage, generateLocationMessage} = require('./utils/messages');
const {addUser, removeUser, getUsersInRooms, getUser} = require('./utils/users.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

//let count = 0;

io.on('connection', (socket) => {

    socket.on('join', ({username, room}, callback) => {
        const {error, user } = addUser({id: socket.id, username, room});

        if(error){
            return callback(error);
        }
        socket.join(user.room);
        socket.emit('message', generateMessage('Welcome!', 'Admin'));
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined the chat`));
        callback();

        // socket.emit, io.emit, socket.broadcast.emit
        // io.to.emit, socket.broadcast.to.emit
    });

    socket.on('sendMessage', (message, callback) => {
        const wordFilter = new Filter();
        const user = getUser(socket.id);
        if (wordFilter.isProfane(message) || message.trim() === '') {
            return callback('Contains forbidden words! Or empty');
        }
        io.emit('message', generateMessage(message, user.username));
        callback();
    });

    socket.on('sendLocation', (location, callback) => {
        const user = getUser(socket.id);
        if (!(location.latitude && location.longitude)) {
            callback('Some of the parameters are missing!');
        }
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${location.latitude},${location.longitude}`, user.username));
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', generateMessage(`${user.username} has left.`))
        }

        //io.emit('message', generateMessage('A user has left!'));
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});