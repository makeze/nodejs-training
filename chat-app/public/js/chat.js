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
    socket.emit('sendMessage', messageText, (error) => {
        if(error){
            return console.log(error);
        }
        console.log('Message was delivered');
    });
});

document.querySelector('#sendLocation').addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition((position) => {
       console.log(position.coords.latitude);
       console.log(position.coords.longitude);
       let locationData = {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
       };
       socket.emit('sendLocation', locationData, (error) => {
           if(error){
               return console.log(error);
           }
           console.log('Location shared!');
       });
    });
});

socket.on('message', (message) => {
   console.log(message);
});