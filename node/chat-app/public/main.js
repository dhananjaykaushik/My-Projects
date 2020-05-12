const socket = io(`http://localhost:3000`);
const messageContainer = $('#message-container');

socket.on('chat-message', (data) => {
    messageContainer.append(getMessageDiv(data, 'Someone'));
});

$('#send-message').on('click', event => {
    const message = $('#message-field')[0].value;
    socket.emit('send-chat-message', message);
    $('#message-field')[0].value = '';

    $(messageContainer).append(getMessageDiv(message, 'You'));

});

const getMessageDiv = (message, sender) => {
    const div = $(`<div class = "message">
        <span class = "sender">${sender}</span>
        <span class = "message-con">${message}</span>
    </div>`);

    return div;
};