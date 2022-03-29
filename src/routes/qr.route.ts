import QRController from "../controller/qr.controller";
import { Router } from "express";
import { verifyCurrentUser, verifyToken } from "../utils/token";
const router = Router();

router.get("/all/:uid", verifyToken, verifyCurrentUser, QRController.getAllQR);
router.get(
  "/:id/user/:uid",
  verifyToken,
  verifyCurrentUser,
  QRController.getOneQR
);
router.post("/", verifyToken, QRController.createQR);
router.put("/:id", QRController.updateQR);
router.delete("/:id", QRController.deleteQR);

export default router;
