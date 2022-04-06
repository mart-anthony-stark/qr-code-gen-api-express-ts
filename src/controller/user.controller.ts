import { Request, Response } from "express";
import UserModel from "../models/User.model";
import { IGetUserAuthInfoRequest } from "../types/Request.types";
// const User = require("../models/User.model");

module.exports = {
  upgradeSubscription: async (req: any, res: Response) => {
    try {
      const user = await UserModel.findOneAndUpdate(
        { _id: req.user.id },
        {
          $set: { subscription: req.body.subscription },
        },
        { new: true }
      );
      // delete user.password;
      res.send({ success: true, user });
    } catch (e) {
      console.log(e);
      res.status(401).send({ success: false, msg: e });
    }
  },
};
