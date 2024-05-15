const express = require("express");
const { UserController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");

const router = express.Router();

router.post(
    "/signup",
    AuthMiddleware.validateAuthRequest,
    UserController.signUp
);
router.post(
    "/signin",
    AuthMiddleware.validateAuthRequest,
    UserController.signIn
);

module.exports = router;
