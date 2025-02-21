import { connect } from "mongoose";

import { configurations } from "../config/config.js";

const MONGODB = configurations.MONGODB;
if (!MONGODB) throw new Error("Database url is required in .env file 💔");

export const database = async () => {
  try {
    const mongodb = await connect(MONGODB);
    console.log(
      `Database Connected! 💚 mongodb://${mongodb.connection.host}:${mongodb.connection.port}`
    );
  } catch (error) {
    console.error(`Failed to connect database ⛓️  ${error}`);
    process.exit(1);
  }
};
