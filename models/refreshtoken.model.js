"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RefershTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: Date.now().valueOf(),
        expires: 5184000,
    },
});

const RefreshToken = mongoose.model("RefreshToken", RefershTokenSchema);

module.exports = RefreshToken;
