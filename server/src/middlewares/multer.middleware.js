import path from "node:path";
import crypto from "node:crypto";

import multer from "multer";

const filePath = path.resolve("./public", "temp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const unique_name = `${file.fieldname}-${crypto.randomUUID()}${path.extname(file.originalname)}`;
    cb(null, unique_name);
  },
});

export const upload = multer({ storage });
