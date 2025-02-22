import validator from "validator";
import jwt from "jsonwebtoken";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { User } from "../models/user.model.js";
import { NextFunction, Request, Response } from "express";
import { decodePassword, hashPassword } from "../lib/password.js";
import { generateAccessAndRefreshToken } from "../utils/token.js";
import { configurations } from "../config/config.js";
import { Id } from "../../types/express.js";

interface RequestBody {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Body {
  email: string;
  password: string;
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

export const authLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: Body = req.body;

    const fields = [email, password].every((user) => user?.trim());

    if (!fields) {
      return res.status(400).json(new ApiError(400, "All Fields are Required"));
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json(new ApiError(400, "Invalid Email Address"));
    }

    const isExists = await User.findOne({ email }).select("+password");

    if (!isExists) {
      return res.status(400).json(new ApiError(400, "Invalid Credentials"));
    }

    const isPasswordCorrect = await decodePassword(password, isExists.password);

    if (!isPasswordCorrect) {
      return res.status(400).json(new ApiError(400, "Invalid Credentials"));
    }

    const user = {
      _id: isExists._id,
      username: isExists.username,
      email: isExists.email,
    };

    const { accessToken, refreshToken } = generateAccessAndRefreshToken(
      res,
      user,
    );

    await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });

    return res.status(200).json(
      new ApiResponse(200, "User Logged In", {
        accessToken,
        refreshToken,
        user,
      }),
    );
  },
);

export const authLogout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.user?._id;

    if (!_id) {
      return res.status(400).json(new ApiResponse(400, "User not found"));
    }

    const user = await User.findByIdAndUpdate(
      _id,
      { $unset: { refreshToken: "" } },
      { new: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json(new ApiResponse(404, "User not found"));
    }

    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: configurations.NODE_ENV === "production",
        sameSite: "strict",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: configurations.NODE_ENV === "production",
        sameSite: "strict",
      });

    return res.status(200).json(new ApiResponse(200, "User Logout", user));
  },
);

export const authRefreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies.refreshToken || req.body.refreshToken;

    let rawToken: Id;

    try {
      rawToken = jwt.verify(
        cookie,
        configurations.JWT_REFRESH_TOKEN_SECRET_KEY!,
      ) as Id;
    } catch (error) {
      return res
        .status(404)
        .json(new ApiError(404, "Refresh Token Expired Please Login"));
    }

    const user = await User.findById(rawToken._id).select("-password");

    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    const { accessToken, refreshToken } = generateAccessAndRefreshToken(res, {
      _id: user._id,
      username: user?.username,
      email: user?.email,
    });

    await User.findByIdAndUpdate(
      user._id,
      { refreshToken },
      { new: true },
    ).select("-password");

    return res.status(200).json(
      new ApiResponse(200, "Token is refreshed", {
        accessToken,
        refreshToken,
      }),
    );
  },
);
