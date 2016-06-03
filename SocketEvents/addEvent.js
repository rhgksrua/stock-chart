

function addEvent(socket) {
    socket.emit('add stock')
}

module.exports = addEvent;