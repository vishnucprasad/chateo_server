const { Server } = require("socket.io");
const logger = require("../config/logger.config");

class SocketIO {
    constructor() {
        if (!SocketIO.instance) {
            SocketIO.instance = this;
        }

        return SocketIO.instance;
    }

    setupIO(server) {
        const io = new Server(server);

        io.on("connection", (socket) => {
            logger.info(`Socket ${socket.id} connected`);

            socket.on("join", (userId) => socket.join(userId?.toString()));
            socket.on("disconnect", (reason) => {
                logger.info(`Socket ${socket.id} disconnected`);
            });
        });

        this.io = io;
    }

    getIO() {
        return this.io;
    }
}

module.exports = SocketIO;
