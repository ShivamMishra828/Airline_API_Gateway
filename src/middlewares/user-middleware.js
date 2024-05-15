const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");
const { UserService } = require("../services");

async function validateAuthRequest(req, res, next) {
    if (!req.body.email) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError("Email is required.", StatusCodes.BAD_REQUEST),
                    "Email is required in incoming request."
                )
            );
    }
    if (!req.body.password) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        "Password is required.",
                        StatusCodes.BAD_REQUEST
                    ),
                    "Password is required in incoming request."
                )
            );
    }
    next();
}

async function checkAuth(req, res, next) {
    try {
        const token = req.headers["x-access-token"];
        const response = await UserService.isAuthenticated(token);

        if (!response) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error, "Response not available."));
        }

        req.user = response;
        next();
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(
                    error,
                    "Something went wrong while authenticating user."
                )
            );
    }
}

module.exports = {
    validateAuthRequest,
    checkAuth,
};
