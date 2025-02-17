import jwt from "jsonwebtoken";

import { config } from "../lib/config.js";

const generateAccessToken = (user) => {
  return jwt.sign(user, config.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (_id) => {
  return jwt.sign({ _id }, config.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: config.REFRESH_TOKEN_EXPIRY,
  });
};

export const generateAccessAndRefreshToken = (user) => {
  const access_token = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user._id);

  return { access_token, refreshToken };
};

export const ACCESS_TOKEN = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 15 * 60 * 1000,
};

export const REFRESH_TOKEN = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
