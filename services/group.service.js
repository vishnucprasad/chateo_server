"use strict";

const InternalServerError = require("../errors/internalserver.error");
const Group = require("../models/group.model");

const createGroup = async (ownerId, { groupDetails, members }) => {
    try {
        const groupChat = new Group({
            ...groupDetails,
            members: [
                {
                    userId: ownerId,
                    isAdmin: true,
                    isOwner: true,
                },
                ...members,
            ],
        });

        await groupChat.save();

        return groupChat;
    } catch (e) {
        throw e;
    }
};

const addMember = async ({ chatId, userId }) => {
    try {
        return await Group.findOneAndUpdate(
            { _id: chatId },
            {
                $push: {
                    members: { userId },
                },
            },
            {
                new: true,
            }
        );
    } catch (e) {
        throw e;
    }
};

const removeMember = async ({ chatId, userId }) => {
    try {
        return await Group.findOneAndUpdate(
            {
                _id: chatId,
                "members.userId": userId,
            },
            {
                $pull: {
                    members: { userId },
                },
            }
        );
    } catch (e) {
        throw e;
    }
};

const makeAsAdmin = async ({ chatId, userId }) => {
    try {
        return await Group.findOneAndUpdate(
            {
                _id: chatId,
                "members.userId": userId,
            },
            {
                $set: {
                    "members.$.isAdmin": true,
                },
            },
            {
                new: true,
            }
        );
    } catch (e) {
        throw e;
    }
};

const dismissAsAdmin = async ({ chatId, userId }) => {
    try {
        return await Group.findOneAndUpdate(
            {
                _id: chatId,
                "members.userId": userId,
            },
            {
                $set: {
                    "members.$.isAdmin": false,
                },
            },
            {
                new: true,
            }
        );
    } catch (e) {
        throw e;
    }
};

const editGroup = async ({ chatId, name, description, avatar }) => {
    try {
        return await Group.findOneAndUpdate(
            {
                _id: chatId,
            },
            {
                $set: {
                    name,
                    description,
                    avatar,
                },
            },
            {
                new: true,
            }
        );
    } catch (e) {
        next(InternalServerError(e.message));
    }
};

module.exports = {
    createGroup,
    addMember,
    removeMember,
    makeAsAdmin,
    dismissAsAdmin,
    editGroup,
};
