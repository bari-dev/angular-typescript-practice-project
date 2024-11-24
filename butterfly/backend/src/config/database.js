"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var sequelizeConnection = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});
exports["default"] = sequelizeConnection;
