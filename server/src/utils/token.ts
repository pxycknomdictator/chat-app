import jwt from "jsonwebtoken";

import { configurations } from "../config/config.js";

type TokenPayload = {
  _id: string;
  username: string;
  email: string;
};

export const generateAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, configurations.JWT_ACCESS_TOKEN_SECRET_KEY!, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (_id: string) => {
  return jwt.sign({ _id }, configurations.JWT_REFRESH_TOKEN_SECRET_KEY!, {
    expiresIn: "7d",
  });
};

export const generateAccessAndRefreshToken = (user: TokenPayload) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user._id);

  return { accessToken, refreshToken };
};
