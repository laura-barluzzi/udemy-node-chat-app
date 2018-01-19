var socket = io();

function scrollToBottom () {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    var scrollTop = messages.prop('scrollTop');
    var clientHeight = messages.prop('clientHeight');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('Print no error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('disconnected from server.');
});

socket.on('updateUserList', function (users) {
    console.log(users);
    var ol = jQuery('<ol></ol>');
    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
        jQuery('#users').html(ol);
    });
});

socket.on('newMessage', function (message) {
    var timeStamp = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createAt: timeStamp
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    var timeStamp = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createAt: timeStamp,
        url: message.url
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function (event) {
    event.preventDefault();
    var messageTextBox = jQuery('#message-text');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function (event) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending...');
    
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});
