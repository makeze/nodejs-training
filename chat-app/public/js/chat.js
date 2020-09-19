const socket = io();
const $messageButton = document.querySelector('#sendMessage');
const $messageText = document.getElementById('messageText');
const $location = document.querySelector('#sendLocation');
const $messages = document.querySelector('#messages');
const $sidebar = document.querySelector('#sidebar');

const messageTemplate = document.querySelector('#messageTemplate').innerHTML;
const locationTemplate = document.querySelector('#locationTemplate').innerHTML;
const sidebarTemplate = document.querySelector('#sidebarTemplate').innerHTML;

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('HH:mm:ss')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (location) => {
    const html = Mustache.render(locationTemplate, {
        username: location.username,
        locationUrl: location.locationUrl,
        createdAt: moment(location.createdAt).format('HH:mm:ss')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    });
    $sidebar.innerHTML = html;
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

socket.emit('join', {username, room}, (error) => {
    if(error){
        alert(error);
        location.href = '/';
    }
});