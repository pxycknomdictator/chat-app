import { Router } from "express";
import {
  authLogin,
  authRegister,
  authLogout,
  authRefreshToken,
  authUsers,
} from "../controllers/user.controller.js";
import { authGuard } from "../middlewares/authentication.js";

const router = Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.post("/refresh-token", authRefreshToken);
router.get("/logout", authGuard, authLogout);
router.get("/users", authGuard, authUsers);

export default router;
