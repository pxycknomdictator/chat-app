import { createServer } from "node:http";

import { app } from "./app.js";
import { configurations } from "./config/config.js";
import { database } from "./lib/db.js";

(async () => {
  await database();

  const PORT = configurations.PORT ?? 9000;
  const server = createServer(app);

  server.listen(PORT, () =>
    console.log(`server is listening at: http://localhost:${PORT} 🔥`)
  );
})();
