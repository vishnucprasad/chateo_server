"use strict";

const statusCodes = require("../config/statuscodes.config");
const InternalServerError = require("../errors/internalserver.error");
const {
    createGroup,
    addMember,
    removeMember,
    makeAsAdmin,
    dismissAsAdmin,
    editGroup,
    updateGroupPermissions,
    updateSettings,
    deleteGroup,
} = require("../services/group.service");
const { emitNewChat } = require("../sockets/chat.socket");

const newGroupController = async (req, res, next) => {
    try {
        const { _id } = req.decoded;
        const chat = await createGroup(_id, req.body);

        req.body.members.forEach((member) => emitNewChat(member.userId, chat));
        res.status(statusCodes.OK).json({
            error: false,
            chat,
        });
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

const addMemberController = async (req, res, next) => {
    try {
        const chat = await addMember(req.body);

        res.status(statusCodes.OK).json({
            error: false,
            chat,
        });
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

const removeMemberController = async (req, res, next) => {
    try {
        await removeMember(req.body);

        res.status(statusCodes.OK).json({
            error: false,
            ...req.body,
        });
    } catch (e) {
        next(InternalServerError(e.message));
    }
};

const makeAsAdminController = async (req, res, next) => {
    try {
        const chat = await makeAsAdmin(req.body);

        res.status(statusCodes.OK).json({
            error: false,
            chat,
        });
    } catch (e) {
        next(InternalServerError(e.message));
    }
};

const dismissAsAdminController = async (req, res, next) => {
    try {
        const chat = await dismissAsAdmin(req.body);

        res.status(statusCodes.OK).json({
            error: false,
            chat,
        });
    } catch (e) {
        next(InternalServerError(e.message));
    }
};

const editGroupController = async (req, res, next) => {
    try {
        const chat = await editGroup(req.body);

        res.status(statusCodes.OK).json({
            error: false,
            chat,
        });
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

const updateGroupPermissionsController = async (req, res, next) => {
    try {
        const chat = await updateGroupPermissions(req.body);

        res.status(statusCodes.OK).json({
            error: false,
            chat,
        });
    } catch (e) {
        next(InternalServerError(e.message));
    }
};

const updateSettingsController = async (req, res, next) => {
    try {
        const chat = await updateSettings(req.body);

        res.status(statusCodes.OK).json({
            error: false,
            chat,
        });
    } catch (e) {
        next(InternalServerError(e.message));
    }
};

const deleteGroupController = async (req, res, next) => {
    try {
        const chat = await deleteGroup(req.body.chatId);

        res.status(statusCodes.OK).json({
            error: false,
            chat,
        });
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

module.exports = {
    newGroupController,
    addMemberController,
    removeMemberController,
    makeAsAdminController,
    dismissAsAdminController,
    editGroupController,
    updateGroupPermissionsController,
    updateSettingsController,
    deleteGroupController,
};
