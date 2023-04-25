"use strict";

const express = require("express");
const { newGroupConroller } = require("../../controllers/group.controller");
const router = express.Router();

router.post("/new", newGroupConroller);

module.exports = router;
