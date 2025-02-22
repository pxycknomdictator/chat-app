import { Router } from "express";
import {
  authLogin,
  authRegister,
  authLogout,
} from "../controllers/user.controller.js";
import { authGuard } from "../middlewares/authentication.js";

const router = Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.get("/logout", authGuard, authLogout);

export default router;
