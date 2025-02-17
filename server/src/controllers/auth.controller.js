import validator from "validator";

import { User } from "../models/user.model.js";

import { ApiError } from "../error/ApiError.js";
import { ApiResponse } from "../lib/ApiResponse.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { hashPassword, decodeHash } from "../utils/password.js";
import {
  generateAccessAndRefreshToken,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from "../utils/token.js";

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

export const authLogin = asyncHandler(async (req, res, _next) => {
  const { email, password } = req.body;

  if (![email, password].every((user) => user?.trim())) {
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

  const isUserExists = await User.findOne({ email }).select("+password");

  if (!isUserExists) {
    return res.status(400).json(new ApiError(400, "Invalid User Credentials"));
  }

  const isPasswordCorrect = await decodeHash(password, isUserExists.password);

  if (!isPasswordCorrect) {
    return res.status(400).json(new ApiError(400, "Invalid User Credentials"));
  }

  const { access_token, refreshToken } = generateAccessAndRefreshToken({
    _id: isUserExists._id,
    email: isUserExists.email,
    username: isUserExists.username,
  });

  const user = await User.findByIdAndUpdate(
    isUserExists._id,
    {
      $set: { refreshToken },
    },
    { new: true },
  ).select("-password -refreshToken");

  return res
    .cookie("access_token", access_token, ACCESS_TOKEN)
    .cookie("refresh_token", refreshToken, REFRESH_TOKEN)
    .status(200)
    .json(new ApiResponse(200, "User Login", { user, access_token }));
});

export const authLogout = asyncHandler(async (req, res, _next) => {
  const { _id } = req.user;

  if (!_id) return res.status(404).json(new ApiError(404, "User not found"));

  const user = await User.findByIdAndUpdate(
    _id,
    { $unset: { refreshToken: 1 } },
    { new: true },
  ).select("-password");

  return res
    .cookie("access_token", "", { expires: new Date(0) })
    .cookie("refresh_token", "", { expires: new Date(0) })
    .status(200)
    .json(new ApiResponse(200, "User Logout", user));
});
