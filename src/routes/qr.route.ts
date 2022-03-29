import QRController from "../controller/qr.controller";
import { Router } from "express";
import { verifyAdmin, verifyCurrentUser, verifyToken } from "../utils/token";
const router = Router();

router.get("/all/", verifyToken, verifyAdmin, QRController.getAllQR);

router.get(
  "/all/:uid",
  verifyToken,
  verifyCurrentUser,
  QRController.getAllQRByUser
);

router.get("/:id", verifyToken, QRController.getOneQR);

router.post("/", verifyToken, QRController.createQR);

router.put("/:id", QRController.updateQR);

router.delete("/:id", QRController.deleteQR);

export default router;
