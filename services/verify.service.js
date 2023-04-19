"use strict";

const User = require("../models/user.model");

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const serviceSid = process.env.TWILIO_SERVICE_SID;

// const client = require("twilio")(accountSid, authToken);

const isExistingUser = async (countryCode, phone) => {
    try {
        const user = await User.findOne({ countryCode, phone }).exec();

        return user !== null;
    } catch (e) {
        throw e;
    }
};

const sendOtp = async (countryCode, phone) => {
    try {
        // const verification = await client.verify.v2
        //     .services(serviceSid)
        //     .verifications.create({
        //         to: `${countryCode}${phone}`,
        //         channel: "sms",
        //     });

        // return verification;

        // for test purposes
        return {
            sid: "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            to: `${countryCode}${phone}`,
            status: "pending",
        };
    } catch (e) {
        throw e;
    }
};

const verifyOtp = async (countryCode, phone, otp) => {
    try {
        // const verificationChecks = await client.verify.v2
        //     .services(serviceSid)
        //     .verificationChecks.create({
        //         to: `${countryCode}${phone}`,
        //         code: otp,
        //     });

        // return verificationChecks.status === "approved";

        // for test purposes
        const zeroPad = (num, places) => String(num).padStart(places, "0");

        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;

        return `${zeroPad(date, 2)}${zeroPad(month, 2)}` === otp;
    } catch (e) {
        throw e;
    }
};

module.exports = { isExistingUser, sendOtp, verifyOtp };
