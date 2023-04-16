"use strict";

const express = require("express");
const {
    verifyPhoneController,
    verifyOtpController,
} = require("../../controllers/verify.controller");
const router = express.Router();

router.post("/phone", verifyPhoneController);
router.post("/otp", verifyOtpController);

module.exports = router;
