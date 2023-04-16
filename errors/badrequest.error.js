"use strict";

const httpStatusCodes = require("../config/statuscodes.config");
const BaseError = require("./base.error");

class BadrequestError extends BaseError {
    constructor(
        description = "Bad request",
        name = "Bad request",
        statusCode = httpStatusCodes.BAD_REQUEST,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational);
    }
}

module.exports = BadrequestError;
