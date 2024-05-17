const { StatusCodes } = require("http-status-codes");
const { UserRepository, RoleRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");
const { Auth, ENUMS } = require("../utils/common");

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

async function signUp(data) {
    try {
        const user = await userRepository.create(data);
        const role = await roleRepository.getRoleByName(
            ENUMS.USER_ROLES_ENUMS.CUSTOMER
        );
        user.addRole(role);
        return user;
    } catch (error) {
        console.log(error);
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

async function signIn(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email);
        if (!user) {
            throw new AppError(
                "User not exists corresponding to the email.",
                StatusCodes.BAD_REQUEST
            );
        }

        const isPasswordValid = await Auth.checkPassword(
            data.password,
            user.password
        );
        if (!isPasswordValid) {
            throw new AppError("Invalid Credentials", StatusCodes.BAD_REQUEST);
        }

        const token = Auth.createJWTToken({
            id: user.id,
            email: user.email,
        });

        return token;
    } catch (error) {
        if (error.statusCode == StatusCodes.BAD_REQUEST) {
            throw new AppError(error.explanation, error.statusCode);
        }
        throw new AppError(
            "Something went wrong while fetching user info.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function isAuthenticated(token) {
    try {
        if (!token) {
            throw new AppError("Missing JWT Token", StatusCodes.BAD_REQUEST);
        }

        const response = await Auth.verifyToken(token);
        if (!response) {
            throw new AppError("Invalid JWT Token", StatusCodes.BAD_REQUEST);
        }

        const user = await userRepository.get(response.id);
        if (!user) {
            throw new AppError(
                "User corresponding to JWT Token doesn't exists",
                StatusCodes.NOT_FOUND
            );
        }

        return user.id;
    } catch (error) {
        console.log(error);
        if (error.statusCode == StatusCodes.BAD_REQUEST) {
            throw new AppError(error.explanation, error.statusCode);
        }
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(error.explanation, error.statusCode);
        }
        throw new AppError(
            "Something went wrong while validating jwt token.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function addRoleToUser(data) {
    try {
        const user = await userRepository.get(data.id);
        const role = await roleRepository.getRoleByName(data.role);
        user.addRole(role);
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

async function isAdmin(id) {
    try {
        const user = await userRepository.get(id);
        const adminRole = await roleRepository.getRoleByName(
            ENUMS.USER_ROLES_ENUMS.ADMIN
        );
        return user.hasRole(adminRole);
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
    signIn,
    isAuthenticated,
    addRoleToUser,
    isAdmin,
};
