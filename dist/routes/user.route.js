"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller = require("../controller/user.controller");
const express_1 = require("express");
const token_1 = require("../utils/token");
const router = (0, express_1.Router)();
router.put("/subscription", token_1.verifyToken, controller.upgradeSubscription);
module.exports = router;
exports.default = router;
