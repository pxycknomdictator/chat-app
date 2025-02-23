import fs from "node:fs/promises";
import { v2 as cloudinary } from "cloudinary";

import { configurations } from "../config/config.js";

cloudinary.config({
  cloud_name: configurations.CLOUDINARY_CLOUD_NAME,
  api_key: configurations.CLOUDINARY_API_KEY,
  api_secret: configurations.CLOUDINARY_API_SECRET,
});

export const uploadAvatarOnCloudinary = async (filePath: string) => {
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      folder: "chat-app-avatar",
      resource_type: "image",
    });

    await fs.unlink(filePath);
    return response.secure_url;
  } catch (error) {
    await fs.unlink(filePath);
    throw new Error("Failed to upload file");
  }
};
