import { Router } from "express";
import {
  authRegister,
  authLogin,
  authLogout,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/authentication.js";

const router = Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.get("/logout", protectRoute, authLogout);
router.get("/profile", (req, res) => {});
router.post("/refresh-token", (req, res) => {});

export default router;
