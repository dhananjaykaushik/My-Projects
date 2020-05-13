const socket = io(`http://localhost:3000`);
const messageContainer = $('#message-container');

let userName = prompt(`Enter your name`);

while (!userName) {
    userName = prompt(`Please enter your name`);
}

socket.emit('new-user', userName);

socket.on('new-user', (data) => {
    $(messageContainer).append(getMessageDiv(`Just joined the chat`, data, 'other'));
});

socket.on('chat-message', (data) => {
    messageContainer.append(getMessageDiv(data.message, data.userName, 'other'));
});

$('#send-message').on('click', event => {
    const message = $('#message-field')[0].value;
    socket.emit('send-chat-message', {
        userName: userName,
        message: message
    });
    $('#message-field')[0].value = '';
    $(messageContainer).append(getMessageDiv(message, 'You', 'self'));
});

const getMessageDiv = (message, sender, extraClass = null) => {
    const div = $(`<div class = "message ${extraClass ? extraClass : ''}">
        <span class = "sender">${sender}</span>
        <span class = "message-con">${message}</span>
    </div>`);

    return div;
};

const init = () => {
    $(messageContainer).append(getMessageDiv(`Just joiner the chat`, 'You', 'self'));
};

init();