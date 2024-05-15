const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

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

module.exports = {
    validateAuthRequest,
};
