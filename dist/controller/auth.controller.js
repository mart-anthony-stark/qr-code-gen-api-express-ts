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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../models/User.model"));
const token_1 = require("../utils/token");
const bcrypt = require("bcryptjs");
exports.default = {
    checkAuth: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_model_1.default.findOne({ _id: req.user._id });
        const token = (0, token_1.createToken)(user);
        user._doc.password = undefined;
        res.send({ user: user._doc, token });
    }),
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exist = yield User_model_1.default.findOne({ email: req.body.email });
            if (exist)
                return res
                    .status(401)
                    .send({ msg: "Email is already registered to an account" });
            const user = new User_model_1.default(req.body);
            const salt = yield bcrypt.genSalt(10);
            user.password = yield bcrypt.hash(req.body.password, salt);
            yield user.save();
            const token = (0, token_1.createToken)(user);
            user._doc.password = undefined;
            res.status(200).send({ success: true, user: user._doc, token });
        }
        catch (error) {
            res.status(500).send(error);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield User_model_1.default.findOne({
                $or: [{ username: email }, { email }],
            });
            if (!user)
                return res
                    .status(404)
                    .send({ success: false, msg: "Account not found" });
            const validPassword = yield bcrypt.compare(password, user.password);
            if (!validPassword)
                return res
                    .status(401)
                    .send({ success: false, msg: "Incorrect password" });
            const token = (0, token_1.createToken)(user);
            user._doc.password = undefined;
            res.status(200).send({ success: true, user: user._doc, token });
        }
        catch (error) {
            res.status(500).send(error);
        }
    }),
};
