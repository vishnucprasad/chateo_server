"use strict";

const httpStatusCodes = require("../config/statuscodes.config");
const BaseError = require("./base.error");

class ConflictError extends BaseError {
    constructor(
        description = "Conflict error",
        name = "Conflict",
        statusCode = httpStatusCodes.CONFLICT,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational);
    }
}

module.exports = ConflictError;
