import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/Request.types";

const QR = require("../models/QR.model");

export default {
  getAllQR: async (req: Request, res: Response) => {
    const qr = await QR.find({});
    res.send(qr);
  },

  getAllQRByUser: async (req: Request, res: Response) => {
    const qr = await QR.find({});
    res.send(qr);
  },

  getOneQR: async (req: IGetUserAuthInfoRequest, res: Response) => {
    const qr = await QR.findOne({ _id: req.params.id, user: req.user._id });
    res.send(qr);
  },

  createQR: async (req: IGetUserAuthInfoRequest, res: Response) => {
    const qr = new QR({ user: req.user._id, ...req.body });
    await qr.save();
    res.send(qr);
  },

  updateQR: async (req: Request, res: Response) => {
    const qr = await QR.findByIdAndUpdate(
      req.params.id,
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
