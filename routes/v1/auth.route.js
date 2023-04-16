"use strict";

const express = require("express");
const router = express.Router();
const verifyRouter = require("./verify.route");
const { isAuthenticated } = require("../../middlewares/auth.middleware");
const {
    authController,
    updateProfileController,
    refreshTokenController,
} = require("../../controllers/auth.controller");

// Public routes
router.use("/verify", verifyRouter);
router.post("/refresh", refreshTokenController);

// Private routes
router.get("/", isAuthenticated, authController);
router.patch("/", isAuthenticated, updateProfileController);

module.exports = router;
