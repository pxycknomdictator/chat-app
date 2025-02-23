import { Router } from "express";
import {
  authLogin,
  authRegister,
  authLogout,
  authRefreshToken,
  authUsers,
  authProfile,
} from "../controllers/user.controller.js";
import { authGuard } from "../middlewares/authentication.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.post("/refresh-token", authRefreshToken);
router.get("/logout", authGuard, authLogout);
router.get("/users", authGuard, authUsers);
router.post("/profile", authGuard, upload.single("profile"), authProfile);

export default router;
