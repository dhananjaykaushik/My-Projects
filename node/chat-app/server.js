const io = require('socket.io')(3000);


io.on('connection', (socket) => {
    // Everytime user loads up this website, this function will be called and will assign them their socket
    // socket.emit('chat-message', 'Hello World');
    // Emitting message Hello World with event name chat-message

    socket.on('send-chat-message', (data) => {
        socket.broadcast.emit('chat-message', data);
    });
});

