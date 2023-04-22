"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userShema = new Schema({
    firstName: {
        type: String,
        trim: true,
        minlength: [3, "{PATH} must be at least 3 charecters, got {VALUE}"],
    },
    lastName: {
        type: String,
        trim: true,
        minlength: [3, "{PATH} must be at least 3 charecters, got {VALUE}"],
    },
    countryCode: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    about: {
        type: String,
        maxLength: [150, "{PATH} must be lessthan 150 charecters, got {VALUE}"],
    },
    avatar: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isProfileCompleted: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("User", userShema);

module.exports = User;
