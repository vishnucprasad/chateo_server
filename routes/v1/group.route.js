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
    updateSettingsController,
    deleteGroupController,
} = require("../../controllers/group.controller");
const {
    isGroupAdmin,
    isNotAMember,
    isAMember,
    checkPermission,
    isGroupOwner,
} = require("../../middlewares/group.middleware");
const router = express.Router();

router.patch("/", checkPermission, editGroupController);
router.delete("/", isGroupOwner, deleteGroupController);
router.post("/new", newGroupController);
router.post("/member", isGroupAdmin, isNotAMember, addMemberController);
router.delete("/member", isGroupAdmin, isAMember, removeMemberController);
router.post("/admin", isGroupAdmin, isAMember, makeAsAdminController);
router.delete("/admin", isGroupAdmin, isAMember, dismissAsAdminController);
router.patch("/permissions", isGroupAdmin, updateGroupPermissionsController);
router.patch("/settings", isGroupAdmin, updateSettingsController);

module.exports = router;
