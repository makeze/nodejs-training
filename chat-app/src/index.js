const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));

io.on('connection', () => {
    console.log('New connection established');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});