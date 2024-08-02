"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_js_1 = require("./src/app.js");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var PORT = process.env.PORT || 3000;
app_js_1.default.listen(PORT, function () {
    console.log("Servidor executando na porta: ".concat(PORT));
});
