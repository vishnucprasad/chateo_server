"use strict";

const express = require("express");
const {
    verifyPhoneController,
    verifyOtpController,
    resendOtpController,
} = require("../../controllers/verify.controller");
const router = express.Router();

router.post("/phone", verifyPhoneController);
router.post("/otp", verifyOtpController);
router.post("/resendotp", resendOtpController);

module.exports = router;
