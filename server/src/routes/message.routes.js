import { Router } from "express";
import { createMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/authentication.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/", protectRoute, upload.single("file"), createMessage);

export default router;
