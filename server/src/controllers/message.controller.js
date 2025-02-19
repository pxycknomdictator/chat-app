import { isValidObjectId } from "mongoose";
import { ApiError } from "../error/ApiError.js";
import { ApiResponse } from "../lib/ApiResponse.js";
import { asyncHandler } from "../lib/asyncHandler.js";

import { User } from "../models/user.model.js";
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

export const getMessages = asyncHandler(async (req, res, next) => {
  const { sender_id, receiver_id } = req.query;

  if (!isValidObjectId(sender_id) || !isValidObjectId(receiver_id)) {
    return res
      .status(400)
      .json(new ApiError(400, "invalid sender or receiver id"));
  }

  const users = await User.find({
    $and: [{ _id: sender_id }, { _id: receiver_id }],
  });

  if (!users) {
    return res.status(404).json(new ApiError(404, "id not found"));
  }

  const conversations = await Message.find({
    $or: [
      { sender: sender_id, receiver: receiver_id },
      { sender: receiver_id, receiver: sender_id },
    ],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Conversation", conversations));
});
