"use strict";
const { Model } = require("sequelize");
const { ENUMS } = require("../utils/common");
const { ADMIN, CUSTOMER, FLIGHT_COMPANY } = ENUMS.USER_ROLES_ENUMS;
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.User, {
                through: UserRoles,
                uniqueKey: "userId",
            });
        }
    }
    Role.init(
        {
            name: {
                type: DataTypes.ENUM,
                allowNull: false,
                values: [ADMIN, CUSTOMER, FLIGHT_COMPANY],
                defaultValue: CUSTOMER,
            },
        },
        {
            sequelize,
            modelName: "Role",
        }
    );
    return Role;
};
