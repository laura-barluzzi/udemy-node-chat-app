const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
var express = require('express');
const port = process.env.PORT || 8080;

const publicPath = path.join(__dirname, '../public');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });

    socket.on('createMessage', function (message) {
        console.log('createMessage:', message);
        
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getDate()
        });
    });

});



app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});