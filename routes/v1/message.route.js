"use strict";

const express = require("express");
const {
    newMessageController,
} = require("../../controllers/message.controller");
const router = express.Router();

router.post("/new", newMessageController);

module.exports = router;
