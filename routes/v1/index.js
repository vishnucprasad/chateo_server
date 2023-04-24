"use strict";

const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const chatRouter = require("./chat.route");
const { isAuthenticated } = require("../../middlewares/auth.middleware");

//Public routes
router.use("/auth", authRouter);

//Private routes
router.use("/chat", isAuthenticated, chatRouter);

module.exports = router;
