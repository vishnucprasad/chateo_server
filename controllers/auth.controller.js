"use strict";

const statusCodes = require("../config/statuscodes.config");
const InternalServerError = require("../errors/internalserver.error");
const UnauthorizedError = require("../errors/unauthorized.error");
const {
    getUser,
    updateProfile,
    verifyRefreshToken,
    refreshToken,
} = require("../services/auth.service");

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

const refreshTokenController = async (req, res, next) => {
    try {
        const tokenDetails = await verifyRefreshToken(req.body.refreshToken);

        const payload = {
            _id: tokenDetails._id,
            role: tokenDetails.role,
        };

        const accessToken = await refreshToken(payload);

        res.status(statusCodes.OK).json({
            error: false,
            accessToken,
            message: "Access token refreshed successfully",
        });
    } catch (e) {
        if (e instanceof UnauthorizedError) {
            return next(new UnauthorizedError(e.message));
        }

        next(new InternalServerError(e.message));
    }
};

module.exports = {
    authController,
    updateProfileController,
    refreshTokenController,
};
