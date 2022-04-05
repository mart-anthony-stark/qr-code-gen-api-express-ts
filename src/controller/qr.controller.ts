import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/Request.types";

const QR = require("../models/QR.model");
const User = require("../models/User.model");

// QR Code number limit for free accounts
const qrLimit = 5;

export default {
  getAllQR: async (req: Request, res: Response) => {
    const qr = await QR.find({});
    res.send(qr);
  },

  getAllQRByUser: async (req: Request, res: Response) => {
    const qr = await QR.find({ user: req.params.uid });
    res.send(qr);
  },

  getOneQR: async (req: IGetUserAuthInfoRequest, res: Response) => {
    const qr = await QR.findOne({ _id: req.params.id, user: req.user._id });
    res.send(qr);
  },

  createQR: async (req: IGetUserAuthInfoRequest, res: Response) => {
    // Guard for free account subscription limit
    if (req.user.subscription === "free") {
      const codes = await QR.find({ user: req.user._id });

      if (codes.length === qrLimit)
        return res.status(403).send({
          success: false,
          msg: "You've reached the limit for free account",
        });
    }

    const qr = new QR({ user: req.user._id, ...req.body });
    await qr.save();
    res.send({ success: true, qr });
  },

  updateQR: async (req: Request, res: Response) => {
    const qr = await QR.findOneAndUpdate(
      { _id: req.params.id, user: req.params.uid },
      { $set: req.body },
      { new: true }
    );
    res.send(qr);
  },
  deleteQR: async (req: Request, res: Response) => {
    const qr = await QR.findByIdAndRemove(req.params.id);
    res.send(qr);
  },
};
