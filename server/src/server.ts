import { createServer } from "node:http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import { app } from "./app.js";
import { configurations } from "./config/config.js";
import { database } from "./lib/db.js";
import { createMessage } from "./controllers/message.controller.js";
import { User } from "./models/user.model.js";

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: configurations.ORIGIN, credentials: true },
});

io.use((socket, next) => {
  const cookies = socket.handshake.headers.cookie || "";
  const cookieObj: Record<string, string> = {};

  cookies.split(";").forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    if (key && value) {
      cookieObj[key] = value;
    }
  });

  const accessToken = cookieObj["accessToken"];

  try {
    const decoded = jwt.verify(
      accessToken,
      configurations.JWT_ACCESS_TOKEN_SECRET_KEY!,
    );

    socket.data.user = decoded;
    next();
  } catch (error) {
    next(new Error("Authorization required"));
  }
});

const sockets = new Map();

io.on("connection", async (socket) => {
  const userId = socket.data.user._id;
  const socketId = socket.id;

  sockets.set(userId, socketId);

  await User.findByIdAndUpdate(
    userId,
    { $set: { status: "online" } },
    { new: true },
  );

  socket.on("sendMessage", async (message: string, receiver: string) => {
    await createMessage(userId, receiver, message);

    const receiverSockets = sockets.get(receiver);
    io.to(receiverSockets).emit("receiveMessage", "");
  });

  socket.on("disconnect", async () => {
    await User.findByIdAndUpdate(
      userId,
      { $set: { status: "offline" } },
      { new: true },
    );
    sockets.delete(userId);
  });
});

(async () => {
  await database();

  const PORT = configurations.PORT ?? 9000;

  server.listen(PORT, () =>
    console.log(`🚀 Server is listening at: http://localhost:${PORT}`),
  );
})();
