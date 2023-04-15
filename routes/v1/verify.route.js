"use strict";

const express = require("express");
const { verifyPhone } = require("../../controllers/verify.controller");
const router = express.Router();

router.post("/phone", verifyPhone);

module.exports = router;
