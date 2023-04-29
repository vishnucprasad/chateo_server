"use strict";

const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

const newMessage = async (senderId, msg) => {
    try {
        const message = new Message({
            senderId,
            ...msg,
        });

        const chat = await Chat.findOneAndUpdate(
            {
                _id: message.chatId,
            },
            {
                $push: {
                    messages: message._id,
                },
            },
            {
                new: true,
            }
        );

        await message.save();

        return { message, chat };
    } catch (e) {
        throw e;
    }
};

module.exports = { newMessage };
