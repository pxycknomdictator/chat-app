import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
