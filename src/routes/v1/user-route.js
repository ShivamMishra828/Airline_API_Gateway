const express = require("express");
const { UserController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");

const router = express.Router();

router.post(
    "/signup",
    AuthMiddleware.validateAuthRequest,
    UserController.signUp
);

module.exports = router;
