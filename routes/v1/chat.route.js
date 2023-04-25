"use strict";

const express = require("express");
const { newChatConroller } = require("../../controllers/chat.controller");
const groupChatRouter = require("./group.route");
const router = express.Router();

router.use("/group", groupChatRouter);
router.post("/new", newChatConroller);

module.exports = router;
