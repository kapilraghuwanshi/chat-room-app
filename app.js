var express = require('express');
var socket = require('socket.io');
//app setup
var app = express();
var server = app.listen(5050, () => {
    console.log(`Server is listening to port 5050`)
});

//to serve static files
app.use(express.static('public'))

//Socket Setup
var socketServer = socket(server);

socketServer.on('connection', (socketInstance) => {
    // each instance have unique id on every refresh
    console.log(`Made socket connection - ${socketInstance.id}`)
    // Handle chat event
    socketInstance.on('kiaChat', (data) => {
        // to share incoming data from 1 socket with all sockets
        socketServer.sockets.emit('kiaChat', data);
    })

    socketInstance.on('typing', (data) => {
        // to broadcast incoming data from 1 socket with other sockets only
        socketInstance.broadcast.emit('typing', data);
    })
});