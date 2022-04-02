import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/Request.types";
const User = require("../models/User.model");

module.exports = {
  upgradeSubscription: async (req: IGetUserAuthInfoRequest, res: Response) => {
    await User.findByIdAndUpdate(req.user.id, {
      $set: { subscription: req.body.subscription },
    });
    res.send({success:true})
  },
};
