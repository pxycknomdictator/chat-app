import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
import { Response } from "express";

import { configurations } from "../config/config.js";

type TokenPayload = {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
};

export const generateAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, configurations.JWT_ACCESS_TOKEN_SECRET_KEY!, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (_id: Schema.Types.ObjectId) => {
  return jwt.sign({ _id }, configurations.JWT_REFRESH_TOKEN_SECRET_KEY!, {
    expiresIn: "7d",
  });
};

export const generateAccessAndRefreshToken = (
  res: Response,
  user: TokenPayload,
) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user._id);

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: configurations.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
      sameSite: "strict",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: configurations.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

  return { accessToken, refreshToken };
};
