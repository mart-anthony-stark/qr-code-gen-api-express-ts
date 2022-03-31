"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const token_1 = require("../utils/token");
const router = (0, express_1.Router)();
router.post("/islogged", token_1.verifyToken, auth_controller_1.default.checkAuth);
router.post("/register", auth_controller_1.default.signup);
router.post("/login", auth_controller_1.default.login);
exports.default = router;
