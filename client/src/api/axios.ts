import axios from "axios";
import { configurations } from "../config/config";
import { Register } from "../pages/Register";

export const api = axios.create({
  baseURL: configurations.SERVER_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const httpRegister = async (form: Register) => {
  return await api.post("/auth/register", form);
};
