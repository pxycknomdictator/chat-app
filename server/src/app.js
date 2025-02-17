import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { config } from "./lib/config.js";
import { errorHandler } from "./error/errorHandler.js";

const app = express();
const corsOptions = { origin: config.ORIGIN, credentials: true };

app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

import authRouter from "./routes/user.routes.js";

app.use("/api/auth", authRouter);

app.use(errorHandler);

export { app };
