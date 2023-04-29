"use strict";

const statusCodes = require("../config/statuscodes.config");
const InternalServerError = require("../errors/internalserver.error");
const { newMessage } = require("../services/message.service");
const { emitNewMessage } = require("../sockets/chat.socket");

const newMessageController = async (req, res, next) => {
    try {
        const { _id } = req.decoded;

        const { message, chat } = await newMessage(_id, req.body);

        const members = chat.members.filter((member) => {
            if (member.userId) {
                return member.userId !== _id;
            }

            return member !== _id;
        });

        members.forEach((member) => emitNewMessage(member, message));
        res.status(statusCodes.OK).json({
            error: false,
            message,
        });
    } catch (e) {
        next(InternalServerError(e.message));
    }
};

module.exports = { newMessageController };
