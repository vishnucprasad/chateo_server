"use strict";

const moment = require("moment");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        maxLength: [150, "{PATH} must be lessthan 150 charecters, got {VALUE}"],
    },
    createdAt: {
        type: Number,
        default: moment().valueOf(),
    },
    modifiedAt: {
        type: Number,
        default: moment().valueOf(),
    },
    avatar: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isMuted: {
        type: Boolean,
        default: false,
    },
    permissions: {
        sendMessages: {
            type: String,
            enum: ["everyone", "adminonly"],
            default: "everyone",
        },
        manageGroup: {
            type: String,
            enum: ["everyone", "adminonly"],
            default: "everyone",
        },
    },
    members: {
        type: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                },
                isOwner: {
                    type: Boolean,
                    default: false,
                },
                isAdmin: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        validate: [
            (members) => members.length == 3,
            "{PATH} list must include 3 members",
        ],
    },
    messages: {
        type: [mongoose.Types.ObjectId],
    },
});

groupSchema.pre("findOneAndUpdate", function (next) {
    this._update.modifiedAt = moment().valueOf();
    next();
});

const Group = new mongoose.model("Group", groupSchema);

module.exports = Group;
