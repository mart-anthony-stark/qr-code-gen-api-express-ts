const controller = require("../controller/user.controller");
import { Router } from "express";
import { verifyToken } from "../utils/token";

const router = Router();

router.put("/subscription", verifyToken, controller.upgradeSubscription);

module.exports = router;
export default router;
