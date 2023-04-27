"use strict";

const jwtConfig = require("../config/jwt.config");
const UnauthorizedError = require("../errors/unauthorized.error");
const RefreshToken = require("../models/refreshtoken.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const createNewUser = async (countryCode, phone) => {
    try {
        const user = new User({ countryCode, phone });

        await user.save();

        return user;
    } catch (e) {
        throw e;
    }
};

const getUser = async (query) => {
    try {
        return await User.findOne(query);
    } catch (e) {
        throw e;
    }
};

const generateTokens = async (user, role) => {
    try {
        const payload = { _id: user._id, role };

        const accessToken = await jwt.sign(payload, jwtConfig.secret, {
            expiresIn: jwtConfig.jwtExpiration,
        });

        const newRefreshToken = await jwt.sign(payload, jwtConfig.rTSecret, {
            expiresIn: jwtConfig.jwtRefreshExpiration,
        });

        const refreshToken = await RefreshToken.findOne({ userId: user._id });
        if (refreshToken) {
            await RefreshToken.findByIdAndDelete(refreshToken._id);
        }

        await new RefreshToken({
            userId: user._id,
            token: newRefreshToken,
        }).save();

        return { accessToken, refreshToken: newRefreshToken };
    } catch (e) {
        throw e;
    }
};

const verifyAccessToken = async (accessToken) => {
    try {
        return await jwt.verify(accessToken, jwtConfig.secret);
    } catch (e) {
        throw new UnauthorizedError();
    }
};

const verifyRefreshToken = async (refreshToken) => {
    try {
        const doc = await RefreshToken.findOne({ token: refreshToken });

        if (!doc) {
            throw new UnauthorizedError();
        }

        return await jwt.verify(refreshToken, jwtConfig.rTSecret);
    } catch (e) {
        throw new UnauthorizedError();
    }
};

const refreshToken = async (payload) => {
    try {
        return await jwt.sign(payload, jwtConfig.secret, {
            expiresIn: jwtConfig.jwtExpiration,
        });
    } catch (e) {
        throw e;
    }
};

const updateProfile = async (userId, patch) => {
    try {
        return await User.findOneAndUpdate({ _id: userId }, patch, {
            new: true,
        });
    } catch (e) {
        throw e;
    }
};

module.exports = {
    createNewUser,
    getUser,
    generateTokens,
    verifyAccessToken,
    verifyRefreshToken,
    refreshToken,
    updateProfile,
};
