"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var userRoutes_1 = require("./routes/userRoutes");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var port = process.env.PORT || 5000;
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
// Routes
app.use('/api/users', userRoutes_1["default"]);
app.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
