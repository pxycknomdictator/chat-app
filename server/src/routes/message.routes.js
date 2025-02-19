import { Router } from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/authentication.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .post(protectRoute, upload.single("file"), createMessage)
  .get(protectRoute, getMessages);

export default router;
