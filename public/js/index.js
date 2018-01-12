var socket = io();
socket.on('connect', function() {
    console.log('connected to server.');
});

socket.on('disconnect', function () {
    console.log('disconnected from server.');
});

socket.on('newMessage', function (message) {
    console.log('newMessage:', message);
});

socket.on('welcomeMessage', function (message) {
    console.log('welcomeMessage:', message);
});

socket.on('introduceMessage', function (message) {
    console.log('introduceMessage:', message);
});


