"use strict";

const jwtConfig = {
    secret: String(process.env.JWT_SECRET),
    rTSecret: String(process.env.JWT_REFRESH_TOKEN_SECRET),
    jwtExpiration: 600,
    jwtRefreshExpiration: 5184000,
};

module.exports = jwtConfig;
