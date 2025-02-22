import { Router } from "express";
import { authRegister } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", authRegister);

export default router;
