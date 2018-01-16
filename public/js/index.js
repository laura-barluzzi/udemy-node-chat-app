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



