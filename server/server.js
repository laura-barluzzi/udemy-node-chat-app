const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
var express = require('express');

const {isRealString} = require('./utils/validation')
const {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required.');
        }
        socket.join(params.room);

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit(
            'newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback();
    });
    
    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });
    
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));   
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
