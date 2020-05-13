const io = require('socket.io')(3000);
const idNameMap = {};


io.on('connection', (socket) => {
    // Everytime user loads up this website, this function will be called and will assign them their socket
    // socket.emit('chat-message', 'Hello World');
    // Emitting message Hello World with event name chat-message

    socket.on('new-user', (data) => {
        idNameMap[data] = socket.id;

        socket.broadcast.emit('new-user', data);

    });

    socket.on('send-chat-message', (data) => {
        socket.broadcast.emit('chat-message', {
            userName: data.userName,
            message: data.message
        });
    });
});

