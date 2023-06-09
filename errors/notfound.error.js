"use strict";

const httpStatusCodes = require("../config/statuscodes.config");
const BaseError = require("./base.error");

class NotFoundError extends BaseError {
    constructor(
        description = "Not found",
        name = "Not found",
        statusCode = httpStatusCodes.NOT_FOUND,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational);
    }
}

module.exports = NotFoundError;
