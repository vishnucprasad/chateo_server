"use strict";

const ConflictError = require("../errors/conflict.error");
const ForbiddenError = require("../errors/forbidden.error");
const InternalServerError = require("../errors/internalserver.error");
const NotFoundError = require("../errors/notfound.error");
const Group = require("../models/group.model");

const isGroupAdmin = async (req, res, next) => {
    try {
        const { _id } = req.decoded;

        const doc = await Group.findOne({
            _id: req.body.chatId,
        }).select({
            members: {
                $elemMatch: {
                    userId: _id,
                },
            },
        });

        const member = doc.members[0];

        if (!member || !member.isAdmin) {
            return next(new ForbiddenError("Access denied"));
        }

        return next();
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

const isNotAMember = async (req, res, next) => {
    try {
        const doc = await Group.findOne({
            _id: req.body.chatId,
        }).select({
            members: {
                $elemMatch: {
                    userId: req.body.userId,
                },
            },
        });

        const member = doc.members[0];

        if (member) {
            return next(
                new ConflictError("This member already exists in this group")
            );
        }

        return next();
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

const isAMember = async (req, res, next) => {
    try {
        const doc = await Group.findOne({
            _id: req.body.chatId,
        }).select({
            members: {
                $elemMatch: {
                    userId: req.body.userId,
                },
            },
        });

        const member = doc.members[0];

        if (!member) {
            return next(new NotFoundError("Member does not exist"));
        }

        return next();
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

const checkPermission = async (req, res, next) => {
    try {
        const { _id } = req.decoded;

        const doc = await Group.findOne({
            _id: req.body.chatId,
        }).select({
            members: {
                $elemMatch: {
                    userId: _id,
                },
            },
        });

        const permissions = doc.permissions;
        const member = doc.members[0];

        if (permissions.manageGroup === "everyone") {
            return next();
        }

        if (permissions.manageGroup === "adminonly" && member.isAdmin) {
            return next();
        }

        return next(ForbiddenError("Access denied"));
    } catch (e) {
        next(new InternalServerError(e.message));
    }
};

module.exports = { isGroupAdmin, isNotAMember, isAMember, checkPermission };
