import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const message = error.message || "Interval Server Error";
  res.status(500).json({ message, success: false });
};
