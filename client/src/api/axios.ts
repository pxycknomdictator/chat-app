import axios from "axios";
import { configurations } from "../config/config";

export const api = axios.create({
  baseURL: configurations.SERVER_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
