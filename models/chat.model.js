"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    members: {
        type: [
            {
                type: Schema.Types.ObjectId,
            },
        ],
        validate: [
            (members) => members.length == 2,
            "{PATH} list must include 2 members",
        ],
        unique: true,
    },
    messages: {
        type: [mongoose.Types.ObjectId],
        validate: [
            (messages) => messages.length == 1,
            "{PATH} list must include a message",
        ],
    },
});

const Chat = new mongoose.model("Chat", chatSchema);

module.exports = Chat;
