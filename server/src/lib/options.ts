import { configurations } from "../config/config.js";

export const corsOption = {
  origin: configurations.ORIGIN,
  credentials: true,
};
