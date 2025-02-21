import { Request, Response, NextFunction } from "express";

import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const message = error.message || "Interval Server Error";
  res.status(500).json(new ApiError(500, message));
};
