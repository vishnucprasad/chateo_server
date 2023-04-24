const express = require("express");
const { newChatConroller } = require("../../controllers/chat.controller");
const router = express.Router();

router.post("/new", newChatConroller);

module.exports = router;
