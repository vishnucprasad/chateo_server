"use strict";

const express = require("express");
const {
    newGroupController,
    addMemberController,
    removeMemberController,
    makeAsAdminController,
    dismissAsAdminController,
    editGroupController,
    updateGroupPermissionsController,
} = require("../../controllers/group.controller");
const {
    isGroupAdmin,
    isNotAMember,
    isAMember,
    checkPermission,
} = require("../../middlewares/group.middleware");
const router = express.Router();

router.patch("/", checkPermission, editGroupController);
router.post("/new", newGroupController);
router.post("/member", isGroupAdmin, isNotAMember, addMemberController);
router.delete("/member", isGroupAdmin, isAMember, removeMemberController);
router.post("/admin", isGroupAdmin, isAMember, makeAsAdminController);
router.delete("/admin", isGroupAdmin, isAMember, dismissAsAdminController);
router.patch("/permissions", isGroupAdmin, updateGroupPermissionsController);

module.exports = router;
