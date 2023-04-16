"use strict";

const roles = require("../config/roles.config");
const statusCodes = require("../config/statuscodes.config");
const InternalServerError = require("../errors/internalserver.error");
const UnauthorizedError = require("../errors/unauthorized.error");
const {
    createNewUser,
    getUser,
    generateTokens,
} = require("../services/auth.service");
const {
    isExistingUser,
    sendOtp,
    verifyOtp,
} = require("../services/verify.service");

const verifyPhoneController = async (req, res, next) => {
    try {
        const { countryCode, phone } = req.body;

        if (await isExistingUser(countryCode, phone)) {
            await sendOtp(countryCode, phone);

            return res.status(statusCodes.OK).json({
                error: false,
                message: `An OTP has been sent to ${countryCode} ${phone}`,
            });
        }

        const user = await createNewUser(countryCode, phone);

        await sendOtp(countryCode, phone);

        return res.status(statusCodes.OK).json({
            error: false,
            message: `An OTP has been sent to ${countryCode} ${phone}`,
            user,
        });
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

const verifyOtpController = async (req, res, next) => {
    try {
        const { countryCode, phone, otp } = req.body;

        if (await verifyOtp(countryCode, phone, otp)) {
            const user = await getUser({ countryCode, phone });

            const { accessToken, refreshToken } = await generateTokens(
                user,
                roles.USER
            );

            return res.status(statusCodes.OK).json({
                error: false,
                accessToken,
                refreshToken,
                user,
                message: "OTP verified",
            });
        }

        return next(
            new UnauthorizedError(
                "Invalid OTP. Please enter a valid OTP to proceed"
            )
        );
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

module.exports = { verifyPhoneController, verifyOtpController };
