import QRController from "../controller/qr.controller";
import { Router } from "express";
const router = Router();

router.get("/", QRController.getAllQR);
router.get("/:id", QRController.getOneQR);
router.post("/", QRController.createQR);
router.put("/:id", QRController.updateQR);
router.delete("/:id", QRController.deleteQR);

export default router;
