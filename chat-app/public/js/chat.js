const socket = io();

/*
socket.on('countUpdated', (count) => {
   console.log('Count has been updated', count);
});

document.querySelector('#increment').addEventListener('click', () => {
    console.log('incremented');
    socket.emit('increment');
});*/

document.querySelector('#sendMessage').addEventListener('click', () => {
    let messageText = document.getElementById('messageText').value;
    document.getElementById('messageText').value = '';
    console.log(messageText);
    socket.emit('sendMessage', messageText);
});

socket.on('message', (message) => {
   console.log(message);
});