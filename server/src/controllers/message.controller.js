import { isValidObjectId } from "mongoose";
import { ApiError } from "../error/ApiError.js";
import { ApiResponse } from "../lib/ApiResponse.js";
import { asyncHandler } from "../lib/asyncHandler.js";

import { Message } from "../models/message.model.js";
import { uploadImageOnCloud } from "../utils/cloudinary.js";

export const createMessage = asyncHandler(async (req, res, next) => {
  const filePath = req.file?.path;
  const { sender, receiver, message } = req.body;

  if (!isValidObjectId(sender) || !isValidObjectId(receiver)) {
    return res
      .status(400)
      .json(new ApiError(400, "invalid sender or receiver id"));
  }

  if (!message?.trim()) {
    return res.status(400).json(new ApiError(400, "message is required"));
  }

  let imageUrl = "";

  if (filePath) {
    const image = await uploadImageOnCloud(filePath);
    imageUrl = image?.secure_url ?? "";
  }

  const newMessage = await Message.create({
    sender,
    receiver,
    message,
    image: imageUrl,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "New Message Created", { message: newMessage }));
});
