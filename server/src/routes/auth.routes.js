import { Router } from "express";
import {
  authRegister,
  authLogin,
  authLogout,
  authProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/authentication.js";

const router = Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.get("/logout", protectRoute, authLogout);
router.get("/profile", protectRoute, authProfile);
router.post("/refresh-token", (req, res) => {});

export default router;
