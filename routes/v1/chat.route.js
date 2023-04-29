"use strict";

const express = require("express");
const {
    newChatConroller,
    getChatsController,
} = require("../../controllers/chat.controller");
const groupChatRouter = require("./group.route");
const messageRouter = require("./message.route");
const router = express.Router();

router.get("/", getChatsController);
router.post("/new", newChatConroller);
router.use("/group", groupChatRouter);
router.use("/message", messageRouter);

module.exports = router;
