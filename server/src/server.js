import { createServer } from "node:http";

import { config } from "./lib/config.js";
import { app } from "./app.js";
import { database } from "./lib/db.js";

(async () => {
  await database();

  const PORT = config.PORT ?? 4000;
  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(`server is running at: http://localhost:${PORT}`);
  });
})();
