"use strict";

const httpStatusCodes = require("../config/statuscodes.config");
const BaseError = require("./base.error");

class TooManyRequestsError extends BaseError {
    constructor(
        description = "Too many requests",
        name = "Too many requests",
        statusCode = httpStatusCodes.TOO_MANY_REQUESTS,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational);
    }
}

module.exports = TooManyRequestsError;
