"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qr_controller_1 = __importDefault(require("../controller/qr.controller"));
const express_1 = require("express");
const token_1 = require("../utils/token");
const router = (0, express_1.Router)();
router.get("/all", token_1.verifyToken, token_1.verifyAdmin, qr_controller_1.default.getAllQR);
router.get("/all/:uid", token_1.verifyToken, token_1.verifyCurrentUser, qr_controller_1.default.getAllQRByUser);
router.get("/:id", token_1.verifyToken, qr_controller_1.default.getOneQR);
router.post("/", token_1.verifyToken, qr_controller_1.default.createQR);
router.put("/:id/user/:uid", token_1.verifyToken, token_1.verifyCurrentUser, qr_controller_1.default.updateQR);
router.delete("/:id/user/:uid", token_1.verifyToken, token_1.verifyCurrentUser, qr_controller_1.default.deleteQR);
module.exports = router;
exports.default = router;
