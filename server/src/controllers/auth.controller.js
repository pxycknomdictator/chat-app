import validator from "validator";

import { User } from "../models/user.model.js";

import { ApiError } from "../error/ApiError.js";
import { ApiResponse } from "../lib/ApiResponse.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { hashPassword } from "../utils/password.js";

export const authRegister = asyncHandler(async (req, res, _next) => {
  const { username, email, password } = req.body;

  if (![username, email, password].every((user) => user?.trim())) {
    return res.status(400).json(new ApiError(400, "All Fields Required"));
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json(new ApiError(400, "Invalid Email Address"));
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json(new ApiError(400, "Password must be at least 8 characters"));
  }

  const isUserExists = await User.findOne({ $or: [{ username }, { email }] });

  if (isUserExists) {
    return res
      .status(400)
      .json(new ApiError(400, "username or email is already exists"));
  }

  const hash = await hashPassword(password);

  const newUser = await User.create({
    username,
    email,
    password: hash,
  });

  const user = await User.findById(newUser._id).select(
    "-password -refreshToken",
  );

  return res.status(201).json(new ApiResponse(201, "User Registered", user));
});
