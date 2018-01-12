const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

var express = require('express');
const port = process.env.PORT || 8080;

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.on('createMessage', function (message) {
        console.log('createMessage:', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.emit('welcomeMessage', generateMessage('Admin', 'Welcome to our chat app!'));

    socket.broadcast.emit('introduceMessage', generateMessage('Admin', 'New user joined!'));

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
