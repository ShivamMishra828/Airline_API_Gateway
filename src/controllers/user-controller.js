const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { UserService } = require("../services");
const { StatusCodes } = require("http-status-codes");

async function signUp(req, res) {
    try {
        const user = await UserService.signUp({
            email: req.body.email,
            password: req.body.password,
        });
        return res
            .status(StatusCodes.CREATED)
            .json(new SuccessResponse(user, "Successfully created new user."));
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, "Something went wrong"));
    }
}

async function signIn(req, res) {
    try {
        const response = await UserService.signIn({
            email: req.body.email,
            password: req.body.password,
        });
        return res
            .status(StatusCodes.OK)
            .json(new SuccessResponse(response, "Logged in successfully"));
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, "Something went wrong"));
    }
}

module.exports = {
    signUp,
    signIn,
};
