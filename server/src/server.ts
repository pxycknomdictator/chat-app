import { createServer } from "node:http";

import { app } from "./app.js";
import { configurations } from "./config/config.js";

(async () => {
  const PORT = configurations.PORT ?? 9000;
  const server = createServer(app);

  server.listen(PORT, () =>
    console.log(`server is listening: http://localhost:${PORT} 🔥`)
  );
})();
