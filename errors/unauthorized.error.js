"use strict";

const httpStatusCodes = require("../config/statuscodes.config");
const BaseError = require("./base.error");

class UnauthorizedError extends BaseError {
    constructor(
        description = "Unauthorized",
        name = "Unauthorized",
        statusCode = httpStatusCodes.UNAUTHORIZED,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational);
    }
}

module.exports = UnauthorizedError;
