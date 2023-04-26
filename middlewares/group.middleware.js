"use strict";

const ConflictError = require("../errors/conflict.error");
const ForbiddenError = require("../errors/forbidden.error");
const InternalServerError = require("../errors/internalserver.error");
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

module.exports = { isGroupAdmin, isNotAMember };
