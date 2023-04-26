"use strict";

const httpStatusCodes = require("../config/statuscodes.config");
const BaseError = require("./base.error");

class ForbiddenError extends BaseError {
    constructor(
        description = "Forbidden Request",
        name = "Forbidden",
        statusCode = httpStatusCodes.FORBIDDEN,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational);
    }
}

module.exports = ForbiddenError;
