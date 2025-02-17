import jwt from "jsonwebtoken";

import { ApiError } from "../error/ApiError.js";
import { config } from "../lib/config.js";

import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  const token =
    req.cookies.access_token ||
    req.headers.authorization?.replace("Bearer ", "");

  if (!token?.trim()) {
    return res.status(401).json(new ApiError(401, "Unauthorized person"));
  }

  try {
    const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET_KEY);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return res.status(404).json(new ApiError(404, "User already logged out"));
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(new ApiError(401, "Invalid or expired token"));
    next(error);
  }
};
