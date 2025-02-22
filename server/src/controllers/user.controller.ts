import validator from "validator";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { User } from "../models/user.model.js";
import { NextFunction, Request, Response } from "express";
import { hashPassword } from "../lib/password.js";

interface RequestBody {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const authRegister = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, confirmPassword }: RequestBody =
      req.body;

    const fields = [username, email, password, confirmPassword].every((user) =>
      user?.trim(),
    );

    if (!fields) {
      return res.status(400).json(new ApiError(400, "All Fields are Required"));
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json(new ApiError(400, "Invalid Email Address"));
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json(new ApiError(400, "Password doesn't Matched"));
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json(new ApiError(400, "Password must be at least 8 characters long"));
    }

    const isExists = await User.findOne({ $or: [{ username }, { email }] });

    if (isExists) {
      return res
        .status(400)
        .json(new ApiError(400, "username or email already exists"));
    }

    const hash = await hashPassword(password);
    const user = await User.create({ username, email, password: hash });

    return res.status(201).json(
      new ApiResponse(201, "User Registered", {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      }),
    );
  },
);
