let io; 

module.exports = { //helper function to retrieve the same Socket.io object
    init: httpServer => {
        io = require('socket.io')(httpServer);
        return io;
    },
    getIO: () => {
        if(!io)
            throw new Error('Socket.io object has not been initialized')
        return io;
    }

}
