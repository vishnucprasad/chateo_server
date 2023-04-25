"use strict";

const ObjectId = require("mongoose").Types.ObjectId;
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

const createChat = async (from, to, msg) => {
    try {
        const chat = new Chat({
            members: [from, to],
        });

        const message = new Message({
            chatId: chat._id,
            senderId: new ObjectId(from),
            ...msg,
        });

        chat.messages = [message._id];

        await chat.save();
        await message.save();

        return chat;
    } catch (e) {
        throw e;
    }
};

module.exports = { createChat };
