const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../../config");

async function checkPassword(password, encryptedPassword) {
    try {
        return bcrypt.compareSync(password, encryptedPassword);
    } catch (error) {
        throw error;
    }
}

async function createJWTToken(payload) {
    try {
        return jwt.sign(payload, ServerConfig.JWT_SECRET, {
            expiresIn: ServerConfig.JWT_EXPIRY,
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    checkPassword,
    createJWTToken,
};
