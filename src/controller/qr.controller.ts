import { Request, Response } from "express";

const QR = require("../models/QR.model");

export default {
  getAllQR: async (req: Request, res: Response) => {
    const qr = await QR.find({});
    res.send(qr);
  },

  getOneQR: async (req: Request, res: Response) => {
    const qr = await QR.findOne(req.params);
    res.send(qr);
  },

  createQR: async (req: Request, res: Response) => {
    const qr = new QR(req.body);
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
