"use strict";

class BaseError extends Error {
    constructor(description, name, statusCode, isOperational) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.description = description;
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}

module.exports = BaseError;
