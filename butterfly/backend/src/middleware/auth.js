"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var authenticateToken = function (req, res, next) {
    var _a;
    var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).send('Access Denied');
    jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err)
            return res.status(403).send('Invalid Token');
        next();
    });
};
exports["default"] = authenticateToken;
