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

module.exports = { createGroup };
