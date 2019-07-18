// Make Connection
var socketClient = io.connect('http://localhost:5050');


// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');
feedback = document.getElementById('feedback');

// Emit Events to the server
btn.addEventListener('click', () => {
    socketClient.emit('kiaChat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
})

message.addEventListener('keypress', () => {
    socketClient.emit('typing', handle.value);
})

// Listen Events from server 
socketClient.on('kiaChat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
})

socketClient.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
})