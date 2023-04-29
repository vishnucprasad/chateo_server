"use strict";

const SocketIO = require(".");

const emitNewChat = (to, chat) => {
    const socketio = new SocketIO();
    const io = socketio.getIO();

    io.to(to.toString()).emit("new chat", chat);
};

const emitNewMessage = (to, message) => {
    const socketio = new SocketIO();
    const io = socketio.getIO();

    io.to(to.toString()).emit("new message", message);
};

module.exports = { emitNewChat, emitNewMessage };
