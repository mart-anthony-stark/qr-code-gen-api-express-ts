import { Router } from "express";
import authController from "../controller/auth.controller";
import { verifyToken } from "../utils/token";
const router = Router();

router.get("/islogged", verifyToken, authController.checkAuth);
router.post("/register", authController.signup);
router.post("/login", authController.login);

export default router;
