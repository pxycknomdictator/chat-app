import { Schema, model, Document } from "mongoose";
import { configurations } from "../config/config.js";

enum Status {
  ONLINE = "online",
  OFFLINE = "offline",
}

interface UserModel extends Document {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  status: Status;
  avatar?: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
      default: `${configurations.URL}:${configurations.PORT}/avatar.svg`,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.OFFLINE,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
