import { createServer } from "node:http";
import { Server } from "socket.io";

import { app } from "./app.js";
import { configurations } from "./config/config.js";
import { database } from "./lib/db.js";

const sockets = new Map();
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: configurations.ORIGIN, credentials: true },
});

io.on("connection", (socket) => {
  console.log(`New Socket connected`);
});

(async () => {
  await database();

  const PORT = configurations.PORT ?? 9000;

  server.listen(PORT, () =>
    console.log(`server is listening at: http://localhost:${PORT} 🔥`),
  );
})();
