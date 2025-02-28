import { Router } from "express";

import { conversations } from "../controllers/message.controller.js";
import { authGuard } from "../middlewares/authentication.js";

const router = Router();

router.get("/:receiverId", authGuard, conversations);

export default router;
