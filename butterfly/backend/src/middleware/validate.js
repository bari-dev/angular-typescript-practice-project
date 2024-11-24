"use strict";
exports.__esModule = true;
var joi_1 = require("joi");
var validateUser = function (req, res, next) {
    var schema = joi_1["default"].object({
        username: joi_1["default"].string().min(3).required(),
        email: joi_1["default"].string().email().required(),
        password: joi_1["default"].string().min(6).required()
    });
    var error = schema.validate(req.body).error;
    if (error)
        return res.status(400).send(error.details[0].message);
    next();
};
exports["default"] = validateUser;
