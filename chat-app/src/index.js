const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

//let count = 0;

io.on('connection', (socket) => {
    // console.log('New connection established');
    // socket.emit('countUpdated', count);
    // socket.on('increment', () => {
    //     // socket.emit('countUpdated', ++count);
    //     io.emit('countUpdated', ++count);
    // });
    //
    // socket.on('message', () => {
    //     socket.emit('Welcome');
    // });
    socket.emit('message', 'Welcome!');
    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (message, callback) => {
        io.emit('message', message);
        callback('Delivered!');
    });
    socket.on('sendLocation', (location) => {
        io.emit('message', `https://google.com/maps?q=${location.latitude},${location.longitude}`);
    });

    socket.on('disconnect', () => {
       io.emit('message', 'A user has left!');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});