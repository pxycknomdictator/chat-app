import jwt from "jsonwebtoken";
import { JwtPayload } from "../../types/express.js";

import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { configurations } from "../config/config.js";

export const authGuard = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token =
    req.cookies.accessToken ||
    req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json(new ApiError(401, "Unauthorized user"));
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      configurations.JWT_ACCESS_TOKEN_SECRET_KEY!,
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch (err) {
    res
      .status(401)
      .json(new ApiError(401, "Unauthorized: Token is expired or invalid"));
    return;
  }
};
