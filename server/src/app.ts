import path from "node:path";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { corsOption } from "./lib/options.js";
import { errorHandler } from "./lib/globalErrorHandler.js";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.resolve("public", "temp")));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

app.use(errorHandler);

export { app };
