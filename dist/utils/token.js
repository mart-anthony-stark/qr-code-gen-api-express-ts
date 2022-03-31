"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyCurrentUser = exports.verifyToken = exports.createToken = void 0;
const jwt = require("jsonwebtoken");
const createToken = (body) => {
    return jwt.sign({ body }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};
exports.createToken = createToken;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader)
        return res.status(403).send({ error: "Unauthenticated" });
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.status(403).send({ error: "Invalid Token" });
        user.body.password = null;
        req.user = user.body;
        next();
    });
};
exports.verifyToken = verifyToken;
// Verify if the user accessing the resource belongs to the current user
// Rule based access control
const verifyCurrentUser = (req, res, next) => {
    if (req.user._id === req.params.uid || req.user.role === "admin")
        next();
    else
        return res.status(403).send({ error: "You don't have permission" });
};
exports.verifyCurrentUser = verifyCurrentUser;
// Verify if the role of user accessing is and "ADMIN"
// Role Based Access Control
const verifyAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    }
    else {
        res.status(403).send({ error: "You don't have permission" });
    }
};
exports.verifyAdmin = verifyAdmin;
