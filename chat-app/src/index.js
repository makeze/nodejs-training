const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');

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
    socket.emit('message', generateMessage('Welcome!'));
    socket.broadcast.emit('message', generateMessage('A new user has joined!'));

    socket.on('sendMessage', (message, callback) => {
        const wordFilter = new Filter();

        if(wordFilter.isProfane(message) || message.trim() === ''){
            return callback('Contains forbidden words! Or empty');
        }
        io.emit('message', generateMessage(message));
        callback();
    });
    socket.on('sendLocation', (location, callback) => {
        if(!(location.latitude && location.longitude)){
            callback('Some of the parameters are missing!');
        }
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${location.latitude},${location.longitude}`));
        callback();
    });

    socket.on('disconnect', () => {
       io.emit('message', generateMessage('A user has left!'));
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});