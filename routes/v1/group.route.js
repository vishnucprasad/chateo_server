"use strict";

const express = require("express");
const {
    newGroupController,
    addMemberController,
    removeMemberController,
    makeAsAdminController,
    dismissAsAdminController,
} = require("../../controllers/group.controller");
const {
    isGroupAdmin,
    isNotAMember,
    isAMember,
} = require("../../middlewares/group.middleware");
const router = express.Router();

router.post("/new", newGroupController);
router.post("/member", isGroupAdmin, isNotAMember, addMemberController);
router.delete("/member", isGroupAdmin, isAMember, removeMemberController);
router.post("/admin", isGroupAdmin, isAMember, makeAsAdminController);
router.delete("/admin", isGroupAdmin, isAMember, dismissAsAdminController);

module.exports = router;
