"use strict";

const express = require("express");
const {
    newChatConroller,
    getChatsController,
} = require("../../controllers/chat.controller");
const groupChatRouter = require("./group.route");
const router = express.Router();

router.get("/", getChatsController);
router.post("/new", newChatConroller);
router.use("/group", groupChatRouter);

module.exports = router;
