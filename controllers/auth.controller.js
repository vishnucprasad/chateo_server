"use strict";

const statusCodes = require("../config/statuscodes.config");
const InternalServerError = require("../errors/internalserver.error");
const { getUser, updateProfile } = require("../services/auth.service");

const authController = async (req, res, next) => {
    try {
        const tokenDetails = req.decoded;

        const user = await getUser({ _id: tokenDetails._id });

        res.status(statusCodes.OK).json({
            error: false,
            user,
        });
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

const updateProfileController = async (req, res, next) => {
    try {
        const tokenDetails = req.decoded;

        const user = await updateProfile(tokenDetails._id, req.body);

        res.status(statusCodes.OK).json({
            error: false,
            user,
        });
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

module.exports = { authController, updateProfileController };
