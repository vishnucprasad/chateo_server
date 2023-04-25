"use strict";

const SocketIO = require(".");

const emitNewChat = (to, chat) => {
    const socketio = new SocketIO();
    const io = socketio.getIO();

    io.to(to.toString()).emit("new chat", chat);
};

module.exports = { emitNewChat };
