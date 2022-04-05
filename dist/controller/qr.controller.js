"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const QR = require("../models/QR.model");
const User = require("../models/User.model");
// QR Code number limit for free accounts
const qrLimit = 5;
exports.default = {
    getAllQR: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const qr = yield QR.find({});
        res.send(qr);
    }),
    getAllQRByUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const qr = yield QR.find({ user: req.params.uid });
        res.send(qr);
    }),
    getOneQR: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const qr = yield QR.findOne({ _id: req.params.id, user: req.user._id });
        res.send(qr);
    }),
    createQR: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Guard for free account subscription limit
        if (req.user.subscription === "free") {
            const codes = yield QR.find({ user: req.user._id });
            if (codes.length === qrLimit)
                return res
                    .status(403)
                    .send({
                    success: false,
                    msg: "You've reached the limit for free account",
                });
        }
        const qr = new QR(Object.assign({ user: req.user._id }, req.body));
        yield qr.save();
        res.send({ success: true, qr });
    }),
    updateQR: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const qr = yield QR.findOneAndUpdate({ _id: req.params.id, user: req.params.uid }, { $set: req.body }, { new: true });
        res.send(qr);
    }),
    deleteQR: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const qr = yield QR.findByIdAndRemove(req.params.id);
        res.send(qr);
    }),
};
