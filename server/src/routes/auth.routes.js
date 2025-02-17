import { Router } from "express";
import { authRegister } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", authRegister);
router.post("/login", (req, res) => {});
router.get("/logout", (req, res) => {});
router.get("/profile", (req, res) => {});
router.post("/refresh-token", (req, res) => {});

export default router;
