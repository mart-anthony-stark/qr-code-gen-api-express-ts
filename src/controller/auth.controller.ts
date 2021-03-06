import { Request, Response } from "express";

import User from "../models/User.model";
import { IGetUserAuthInfoRequest } from "../types/Request.types";
import { createToken } from "../utils/token";
const bcrypt = require("bcryptjs");

export default {
  checkAuth: async (req: IGetUserAuthInfoRequest, res: Response) => {
    const user = await User.findOne({ _id: req.user._id });
    const token = createToken(user);
    user._doc.password = undefined;
    res.send({ user: user._doc, token });
  },

  signup: async (req: Request, res: Response) => {
    try {
      const exist = await User.findOne({ email: req.body.email });
      if (exist)
        return res
          .status(401)
          .send({ msg: "Email is already registered to an account" });

      const user = new User(req.body);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      await user.save();
      const token = createToken(user);
      user._doc.password = undefined;
      res.status(200).send({ success: true, user: user._doc, token });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        $or: [{ username: email }, { email }],
      });
      if (!user)
        return res
          .status(404)
          .send({ success: false, msg: "Account not found" });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res
          .status(401)
          .send({ success: false, msg: "Incorrect password" });

      const token = createToken(user);
      user._doc.password = undefined;
      res.status(200).send({ success: true, user: user._doc, token });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
