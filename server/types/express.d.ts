import { Request } from "express";

export interface JwtPayload {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
}

export type Id = { _id: Schema.Types.ObjectId };

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
