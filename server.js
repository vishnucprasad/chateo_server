"use strict";

require("dotenv").config();
const http = require("http");
const logger = require("./config/logger.config");
const database = require("./config/database.config");
const getApp = require("./app");
const SocketIO = require("./sockets");

const port = process.env.PORT;

const app = getApp(database);
const server = http.createServer(app);
const socketio = new SocketIO();
socketio.setupIO(server);

server.listen(port, () => logger.info(`Server is running on port ${port}`));
server.on("error", (e) => logger.error(`Port ${e.port} is already in use`));

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGINT", () => {
    logger.info("SIGINT received");
    database.close();
    if (server) {
        server.close();
    }
});

process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    database.close();
    if (server) {
        server.close();
    }
});
