"use strict";

const moment = require("moment");
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
    resendOtp,
} = require("../services/verify.service");
const TooManyRequestsError = require("../errors/toomanyrequests.error");

const verifyPhoneController = async (req, res, next) => {
    try {
        const { countryCode, phone } = req.body;

        if (await isExistingUser(countryCode, phone)) {
            const { sid, to, status } = await sendOtp(countryCode, phone);

            return res.status(statusCodes.OK).json({
                error: false,
                verification: {
                    sid,
                    to,
                    status,
                },
                message: `An OTP has been sent to ${countryCode} ${phone}`,
            });
        }

        const user = await createNewUser(countryCode, phone);

        const { sid, to, status } = await sendOtp(countryCode, phone);

        return res.status(statusCodes.OK).json({
            error: false,
            verification: {
                sid,
                to,
                status,
            },
            user,
            message: `An OTP has been sent to ${countryCode} ${phone}`,
        });
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

const resendOtpController = async (req, res, next) => {
    try {
        const { countryCode, phone, currentSid } = req.body;

        const { sid, to, status, timeOut } = await resendOtp(
            countryCode,
            phone,
            currentSid
        );

        if (status === "pending") {
            return res.status(statusCodes.OK).json({
                error: false,
                verification: {
                    sid,
                    to,
                    status,
                },
                message: `An OTP has been sent to ${countryCode} ${phone}`,
            });
        }

        return next(
            new TooManyRequestsError(
                `Can't send new otp at this moment try again in ${moment
                    .utc(timeOut)
                    .format("mm:ss")}`
            )
        );
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

module.exports = {
    verifyPhoneController,
    resendOtpController,
    verifyOtpController,
};
