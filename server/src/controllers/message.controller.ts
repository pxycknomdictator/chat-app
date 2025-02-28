import { NextFunction, Request, Response } from "express";
import { Message } from "../models/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createMessage = async (
  sender: string,
  receiver: string,
  message: string,
) => {
  const newMessage = await Message.create({ sender, message, receiver });
  return newMessage;
};

export const getMessages = async (senderId: string, receiverId: string) => {
  const conversations = await Message.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  });
  return conversations;
};

export const conversations = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const senderId = req.user?._id;
    const { receiverId } = req.params;

    const conversations = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "conversations", conversations));
  },
);
