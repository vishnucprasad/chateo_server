"use strict";

const express = require("express");
const router = express.Router();
const verifyRouter = require("./verify.route");
const { isAuthenticated } = require("../../middlewares/auth.middleware");
const { authController } = require("../../controllers/auth.controller");

// Public routes
router.use("/verify", verifyRouter);

// Private routes
router.get("/", isAuthenticated, authController);

module.exports = router;
