var socket = io();
socket.on('connect', function() {
    console.log('connected to server.');
});

socket.on('disconnect', function () {
    console.log('disconnected from server.');
});

socket.on('newMessage', function (message) {
    console.log('newMessage:', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">See my location</a>');
    li.text(`${message.from}:`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

// socket.on('welcomeMessage', function (message) {
//     console.log('welcomeMessage:', message);
// });

// socket.on('introduceMessage', function (message) {
//     console.log('introduceMessage:', message);
// });

jQuery('#message-form').on('submit', function (event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('#message-text').val()
    }, function () {});
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function (event) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
    });
});
