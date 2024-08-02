"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", function (_, res) {
    res.send("Bem vindo a api Fitapp!");
});
exports.default = app;
