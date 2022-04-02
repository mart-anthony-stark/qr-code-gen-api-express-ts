"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    subscription: { type: String, default: "free", enum: ["free", "premium"] },
}, { timestamps: true });
exports.default = mongoose.model("User", userSchema);
