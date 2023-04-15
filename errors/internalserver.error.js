"use strict";

const httpStatusCodes = require("../config/statuscodes.config");
const BaseError = require("./base.error");

class InternalServerError extends BaseError {
    constructor(
        description = "Internal Server Error",
        name = "Internal Server Error",
        statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational);
    }
}

module.exports = InternalServerError;
