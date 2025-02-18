import fs from "node:fs/promises";

import { v2 as cloudinary } from "cloudinary";
import { config } from "../lib/config.js";
import { ApiError } from "../error/ApiError.js";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const uploadImageOnCloud = async (filePath) => {
  try {
    if (!filePath?.trim()) return ApiError(404, "File path not found");

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder: "chat-app-images",
    });

    await fs.unlink(filePath);

    return response;
  } catch (error) {
    await fs.unlink(filePath);
    return ApiError(400, "File not upload to cloud");
  }
};
