const socket = io();

/*
socket.on('countUpdated', (count) => {
   console.log('Count has been updated', count);
});

document.querySelector('#increment').addEventListener('click', () => {
    console.log('incremented');
    socket.emit('increment');
});*/

const $messageButton = document.querySelector('#sendMessage');
const $messageText = document.getElementById('messageText');
const $location = document.querySelector('#sendLocation');
const $messages = document.querySelector('#messages');

const messageTemplate = document.querySelector('#messageTemplate').innerHTML;

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

$messageButton.addEventListener('click', () => {
    let messageText = $messageText.value;
    $messageButton.setAttribute('disabled', 'disabled');
    socket.emit('sendMessage', messageText, (error) => {
        $messageButton.removeAttribute('disabled');
        $messageText.value = '';
        $messageText.focus();
        if(error){
            return console.log(error);
        }
        console.log('Message was delivered');
    });
});

$location.addEventListener('click', () => {
    $location.setAttribute('disabled', 'disabled');
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition((position) => {
       let locationData = {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
       };
       socket.emit('sendLocation', locationData, (error) => {
           $location.removeAttribute('disabled');
           if(error){
               return console.log(error);
           }
           console.log('Location shared!');
       });
    });
});