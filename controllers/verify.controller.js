"use strict";

const statusCodes = require("../config/statuscodes.config");
const InternalServerError = require("../errors/internalserver.error");
const { createNewUser } = require("../services/auth.service");
const { isExistingUser, sendOtp } = require("../services/verify.service");

const verifyPhone = async (req, res, next) => {
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

module.exports = { verifyPhone };
