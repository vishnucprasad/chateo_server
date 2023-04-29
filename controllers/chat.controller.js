"use strict";

const statusCodes = require("../config/statuscodes.config");
const ConflictError = require("../errors/conflict.error");
const InternalServerError = require("../errors/internalserver.error");
const { createChat, getChats } = require("../services/chat.service");
const { emitNewChat } = require("../sockets/chat.socket");

const newChatConroller = async (req, res, next) => {
    try {
        const { _id } = req.decoded;
        const chat = await createChat(_id, req.body.to, req.body.message);

        emitNewChat(req.body.to, chat);
        res.status(statusCodes.OK).json({
            error: false,
            chat,
        });
    } catch (e) {
        if (e.code === 11000) {
            return next(new ConflictError(e.message));
        }
        next(new InternalServerError(e.message));
    }
};

const getChatsController = async (req, res, next) => {
    try {
        const { _id } = req.decoded;

        const chats = await getChats(_id);

        res.status(statusCodes.OK).json({
            error: false,
            chats,
        });
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

module.exports = { newChatConroller, getChatsController };
