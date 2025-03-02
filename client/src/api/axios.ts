import axios from "axios";

import { configurations } from "../config/config";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";

export const api = axios.create({
  baseURL: configurations.SERVER_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const httpRegister = async (form: Register) => {
  return await api.post("/auth/register", form);
};

export const httpLogin = async (form: Login) => {
  return await api.post("/auth/login", form);
};

export const httpUsers = async () => {
  return await api.get("/auth/users");
};

export const httpRefreshToken = async () => {
  return await api.post("/auth/refresh-token");
};

export const httpProfile = async () => {
  return await api.get("/auth/profile");
};

export const httpUploadProfile = async (file: FormData) => {
  return await api.put("/auth/update-profile", file, {
    headers: { "Content-Type": "multipart/formdata" },
  });
};

export const httpMessages = async (_id: string) => {
  return await api.get(`/messages/${_id}`);
};

export const httpUser = async (_id: string) => {
  return await api.get(`/auth/${_id}`);
};
