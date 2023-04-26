"use strict";

const express = require("express");
const {
    newGroupController,
    addMemberController,
} = require("../../controllers/group.controller");
const {
    isGroupAdmin,
    isNotAMember,
} = require("../../middlewares/group.middleware");
const router = express.Router();

router.post("/new", newGroupController);
router.post("/member", isGroupAdmin, isNotAMember, addMemberController);

module.exports = router;
