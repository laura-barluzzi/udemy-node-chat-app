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

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    
    socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
