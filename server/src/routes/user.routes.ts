import { Router } from "express";
import {
  authLogin,
  authRegister,
  authLogout,
  authRefreshToken,
} from "../controllers/user.controller.js";
import { authGuard } from "../middlewares/authentication.js";

const router = Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.get("/logout", authGuard, authLogout);
router.post("/refresh-token", authRefreshToken);

export default router;
