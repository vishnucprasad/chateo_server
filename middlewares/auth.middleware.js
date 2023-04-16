"use strict";

const { TokenExpiredError } = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized.error");
const { verifyAccessToken } = require("../services/auth.service");
const InternalServerError = require("../errors/internalserver.error");

const isAuthenticated = async (req, res, next) => {
    try {
        const tokenDetails = await verifyAccessToken(
            req.headers.authorization?.split(" ")[1]
        );
        if (!tokenDetails || tokenDetails instanceof TokenExpiredError) {
            return next(new UnauthorizedError());
        }

        req.decoded = tokenDetails;
        return next();
    } catch (e) {
        if (e instanceof UnauthorizedError) {
            return next(e);
        }

        return next(new InternalServerError());
    }
};

module.exports = { isAuthenticated };
