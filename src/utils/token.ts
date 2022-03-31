import { NextFunction, Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/Request.types";
const jwt = require("jsonwebtoken");

export const createToken = (body: any) => {
  return jwt.sign({ body }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.token as string;
  if (!authHeader) return res.status(403).send({ error: "Unauthenticated" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).send({ error: "Invalid Token" });

    user.body.password = null;
    req.user = user.body;
    next();
  });
};

// Verify if the user accessing the resource belongs to the current user
// Rule based access control
export const verifyCurrentUser = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user._id === req.params.uid || req.user.role === "admin") next();
  else return res.status(403).send({ error: "You don't have permission" });
};

// Verify if the role of user accessing is and "ADMIN"
// Role Based Access Control
export const verifyAdmin = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).send({ error: "You don't have permission" });
  }
};
