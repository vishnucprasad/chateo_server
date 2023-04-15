"use strict";

const express = require("express");
const router = express.Router();
const verifyRouter = require("./verify.route");

router.use("/verify", verifyRouter);

module.exports = router;
