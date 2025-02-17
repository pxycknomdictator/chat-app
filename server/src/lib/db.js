import mongoose from "mongoose";

import { config } from "../lib/config.js";

const MONGODB_URL = config.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Database url is required in .env file");
}

export const database = async () => {
  try {
    const { host, port } = (await mongoose.connect(MONGODB_URL)).connection;
    console.log(`DATABASE CONNECTED: mongodb://${host}:${port}`);
  } catch (error) {
    console.error(`Failed to connect Database: ${error?.message}`);
    process.exit(1);
  }
};
