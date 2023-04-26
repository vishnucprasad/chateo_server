"use strict";

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
                $addToSet: {
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

module.exports = { createGroup, addMember };
