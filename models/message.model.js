"use strict";

const moment = require("moment");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatId: {
        type: String,
        type: Schema.Types.ObjectId,
        required: true,
    },
    senderId: {
        type: String,
        type: Schema.Types.ObjectId,
        required: true,
    },
    timeStamp: {
        type: Number,
        default: moment().valueOf(),
    },
    status: {
        type: String,
        enum: ["sent", "delivered", "read"],
        default: "sent",
    },
    replayedTo: {
        type: Schema.Types.ObjectId,
    },
    text: {
        type: String,
    },
    image: {
        fileName: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    video: {
        fileName: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    audio: {
        fileName: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    document: {
        fileName: {
            type: String,
        },
        url: {
            type: String,
        },
    },
});

const Message = new mongoose.model("Message", messageSchema);

module.exports = Message;
