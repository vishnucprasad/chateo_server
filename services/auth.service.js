"use strict";

const User = require("../models/user.model");

const createNewUser = async (countryCode, phone) => {
    try {
        const user = new User({ countryCode, phone });

        await user.save();

        return user;
    } catch (e) {
        throw e;
    }
};

module.exports = { createNewUser };
