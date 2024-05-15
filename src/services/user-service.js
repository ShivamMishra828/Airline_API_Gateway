const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");

const userRepository = new UserRepository();

async function signUp(data) {
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError") {
            throw new AppError(
                "Given Email is already exists, try again with another one.",
                StatusCodes.BAD_REQUEST
            );
        }
        throw new AppError(
            "Something went wrong while creating new user object.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    signUp,
};
