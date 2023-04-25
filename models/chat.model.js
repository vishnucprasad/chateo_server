"use strict";

const moment = require("moment");
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
    createdAt: {
        type: Number,
        default: moment().valueOf(),
    },
    modifiedAt: {
        type: Number,
        default: moment().valueOf(),
    },
    messages: {
        type: [mongoose.Types.ObjectId],
        validate: [
            (messages) => messages.length == 1,
            "{PATH} list must include a message",
        ],
    },
});

chatSchema.pre("findOneAndUpdate", function (next) {
    this._update.modifiedAt = moment().valueOf();
    next();
});

const Chat = new mongoose.model("Chat", chatSchema);

module.exports = Chat;
